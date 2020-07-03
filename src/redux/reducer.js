import { firebase } from "../firebase/config";

export const ADD_ITEM = "ADD_ITEM";
export const SHOW_ITEM = "SHOW_ITEM";
export const REMOVE_ITEM = "REMOVE_ITEM";
export const LOGOUT = "LOGOUT";

export const addItem = (data) => ({
  type: ADD_ITEM,
  payload: data,
});

export const removeItem = (id) => ({
  type: REMOVE_ITEM,
  payload: id,
});

export const showItem = (data) => ({
  type: SHOW_ITEM,
  payload: data,
});

export const logout = () => ({
  type: LOGOUT,
});

const initialState = {
  itemList: [],
};
const entityRef = firebase.firestore().collection("credentials");

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      const data = {
        id: Math.random().toString(36).substring(10),
        name: action.payload.item,
        password: action.payload.password,
        show: false,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      };

      entityRef
        .add(data)
        .then((res) => {
          data.id = res.id;
        })
        .catch((error) => {
          console.log(error);
        });

      return {
        ...state,
        itemList: state.itemList.concat(data),
      };

    case REMOVE_ITEM:
      let removedList = state.itemList.filter(
        (item) => item.id !== action.payload
      );

      entityRef.doc(action.payload).delete();

      return {
        ...state,
        itemList: removedList,
      };
    case SHOW_ITEM:
      entityRef
        .doc(action.payload.id)
        .update({ show: action.payload.show === false ? true : false })
        .then((_doc) => {
          console.log(_doc);
        })
        .catch((error) => {
          console.log(error);
        });

      let listItem = state.itemList.map((item, i) =>
        item.id === action.payload.id
          ? { ...item, show: action.payload.show === false ? true : false }
          : item
      );

      return {
        ...state,
        itemList: listItem,
      };
    case LOGOUT:
      return initialState;
    default:
      entityRef.orderBy("createdAt", "desc").onSnapshot(
        (querySnapshot) => {
          const newEntities = [];
          querySnapshot.forEach((doc) => {
            const entity = doc.data();
            entity.id = doc.id;
            newEntities.push(entity);
          });
          state.itemList = newEntities;
        },
        (error) => {
          console.log(error);
        }
      );
      return state;
  }
};

export default rootReducer;

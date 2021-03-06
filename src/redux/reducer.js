import { AsyncStorage } from "react-native";

export const ADD_ITEM = "ADD_ITEM";
export const SHOW_ITEM = "SHOW_ITEM";
export const REMOVE_ITEM = "REMOVE_ITEM";
export const LOGOUT = "LOGOUT";
export const SET_PASSWORD = "SET_PASSWORD";
export const VERIFY_PASSWORD = "VERIFY_PASSWORD";

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

export const setPassword = (value) => ({
  type: SET_PASSWORD,
  payload: value,
});

export const verifyPassword = () => ({
  type: VERIFY_PASSWORD,
});

const initialState = {
  isFirstTime: true,
  loginPwd: "",
  itemList: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PASSWORD:
      state.loginPwd = action.payload;

      state.isFirstTime = false;

      AsyncStorage.setItem("isFirstTime", false);
      
      return {
        ...state,
      };
    case VERIFY_PASSWORD:
      return {
        ...state,
      };
    case ADD_ITEM:
      let itemList = state.itemList.concat({
        id: Math.random(),
        name: action.payload.item,
        password: action.payload.password,
        show: false,
      });

      AsyncStorage.setItem("itemList", JSON.stringify(itemList));

      return {
        ...state,
        itemList: itemList,
      };
    case REMOVE_ITEM:
      let removedList = state.itemList.filter(
        (item) => item.id !== action.payload
      );

      AsyncStorage.setItem("itemList", JSON.stringify(removedList));

      return {
        ...state,
        itemList: removedList,
      };
    case SHOW_ITEM:
      let listItem = state.itemList.map((item, i) =>
        item.id === action.payload.id
          ? { ...item, show: action.payload.show === false ? true : false }
          : item
      );

      AsyncStorage.setItem("itemList", JSON.stringify(listItem));

      return {
        ...state,
        itemList: listItem,
      };
    case LOGOUT:
      return {
        ...initialState,
        isFirstTime: false, //Since we loggedin as a user, we are not first time anymore
      };
    default:
      AsyncStorage.getItem("isFirstTime").then((res) => {
        if (res) {
          state.isFirstTime = res;
        }
      });
      AsyncStorage.getItem("itemList").then((res) => {
        if (res) {
          state.itemList = JSON.parse(res);
        }
      });
      return state;
  }
};

export default rootReducer;

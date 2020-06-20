export const ADD_ITEM = "ADD_ITEM";
export const SHOW_ITEM = "SHOW_ITEM";
export const REMOVE_ITEM = "REMOVE_ITEM";

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

const initialState = {
  itemList: [
    {
      id: 231,
      name: "test",
      password: "test",
      show: false,
    },
    {
      id: 232,
      name: "test",
      password: "test",
      show: false,
    },
    {
      id: 233,
      name: "test",
      password: "test",
      show: false,
    },
  ],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        itemList: state.itemList.concat({
          id: Math.random(),
          name: action.payload.item,
          password: action.payload.password,
          show: false,
        }),
      };
    case REMOVE_ITEM:
      return {
        ...state,
        itemList: state.itemList.filter((item) => item.id !== action.payload),
      };
    case SHOW_ITEM:
      return {
        ...state,
        itemList: state.itemList.map((item, i) =>
          item.id === action.payload.id ? { ...item, show: action.payload.show === false ? true : false } : item
        ),
      };
    default:
      return state;
  }
};

export default rootReducer;

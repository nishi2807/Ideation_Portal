import { createStore } from "redux";

const initialState = {
  CurrentUser_name: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER_NAME":
      return {
        ...state,
        CurrentUser_name: action.payload,
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
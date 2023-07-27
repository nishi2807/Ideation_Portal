import { createStore } from "redux";

const initialState = {
  CurrentUser_name: "",
  CurrentUser_role: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER_NAME":
      return {
        ...state,
        CurrentUser_name: action.payload
      };
      case "SET_CURRENT_USER_ROLE": // Add a new action to set the CurrentUser_role
      return {
        ...state,
        CurrentUser_role: action.payload,
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
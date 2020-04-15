import initialState from "../store/initialState";

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PREREQ":
      return {
        ...state,
        preReq: action.payload
      };
    case "SET_CHECKLIST":
      return {
        ...state,
        checkList: action.payload
      };
    case "SET_SETUP":
      return {
        ...state,
        setUp: action.payload
      };
    default:
      return {
        ...state
      };
  }
};
export default rootReducer;
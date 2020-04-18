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
    case "SET_SAVEDTRADES":
      return {
        ...state,
        savedTrades: action.payload
      };
    case "SET_MESSAGE":
      return {
        ...state,
        message: action.payload
      };
    case "SET_COUNT":
      return {
        ...state,
        count: action.payload
      };
    default:
      return {
        ...state
      };
  }
};
export default rootReducer;
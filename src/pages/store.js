import { createStore } from "redux";

const initialState = {
  points: 5, // set initial points value
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_POINTS":
      return { ...state, points: action.payload };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;

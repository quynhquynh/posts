import { SIGNUP } from "../actions/index";

const initialState = [{ username: "qq", password: "qq" }];

export default function(state = initialState, action) {
  switch (action.type) {
    case SIGNUP:
      return [...state, action.payload];
    default:
      return state;
  }
}

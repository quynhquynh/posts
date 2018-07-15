import { LOGIN, LOGOUT } from "../actions/index";

const initState = { username: "qq", password: "qq" };

export default function(state = initState, action) {
  switch (action.type) {
    case LOGIN:
      return { ...state, ...action.payload };
    case LOGOUT:
      let copy = {};
      return copy;
    default:
      return state;
  }
}

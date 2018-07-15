import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import PostsReducer from "./reducer_posts";
import SignUp from "./reducer_signup";
import LogIn from "./reducer_login";

const rootReducer = combineReducers({
  posts: PostsReducer,
  signup: SignUp,
  login: LogIn,
  form: formReducer
});

export default rootReducer;

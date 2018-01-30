import { combineReducers } from "redux";
import control from "./control";
import data from "./data";

export default combineReducers({
  control,
  data
});

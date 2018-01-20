//import { createStore, applyMiddleware, compose } from "redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducers";
// For Firefox debug only, doesnt work on chrome
// const store = createStore(reducer,
// 		compose(applyMiddleware(thunk),
// 				window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

const store = createStore(reducer, applyMiddleware(thunk));
export default store;

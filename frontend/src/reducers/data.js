// Posts
//
// Posts are the building blocks of your application. Posts include:
// Attribute 	Type 	Description
// id 			String 	Unique identifier
// timestamp 	Integer 	Time created - default data tracks this in Unix time. You can use Date.now() to get this number
// title 		String 	Post title
// body 		String 	Post body
// author 		String 	Post author
// category 	String 	Should be one of the categories provided by the server
// voteScore 	Integer 	Net votes the post has received (default: 1)
// deleted 		Boolean 	Flag if post has been 'deleted' (inaccessible by the front end), (default: false)

// Comments
//
// Comments are attached to parent posts. They include:
// Attribute 		Type 	Description
// id 				String 	Unique identifier
// parentId 		String 	id of the parent post
// timestamp 		Integer 	Time created - default data tracks this in Unix time. You can use Date.now() to get this number
// body 			String 	Comment body
// author 			String 	Comment author
// voteScore 		Integer 	Net votes the comment has received (default: 1)
// deleted 			Boolean 	Flag if comment has been 'deleted' (inaccessible by the front end), (default: false)
// parentDeleted 	Boolean 	Flag for when the the parent post was deleted, but the comment itself was not.function myReducer (state = initialState, action) {
import {
  SELECT_CATEGORY,
  SELECT_POST,
  SELECT_COMMENT,
  DESELECT_POST,
  DESELECT_COMMENT,
  RECEIVE_POSTS,
  RECEIVE_COMMENTS,
  RECEIVE_CATEGORIES
} from "../actions/types";

const initialState = {
  activeCategory: undefined,
  activePost: undefined,
  activeComment: undefined,
  posts: [],
  comments: []
};
function data(state = initialState, action) {
  switch (action.type) {
    case SELECT_CATEGORY:
      const { category } = action;
      return {
        ...state,
        activeCategory: category
      };
    case SELECT_POST:
      const { post } = action;
      return {
        ...state,
        activePost: post
      };
    case DESELECT_POST:
      return {
        ...state,
        activePost: null
      };
    case SELECT_COMMENT:
      const { comment } = action;
      return {
        ...state,
        activeComment: comment
      };
    case DESELECT_COMMENT:
      return {
        ...state,
        activeComment: null
      };
    case RECEIVE_POSTS:
      const { posts } = action;
      return {
        ...state,
        posts: posts
      };
    case RECEIVE_COMMENTS:
      const { comments } = action;
      return {
        ...state,
        comments: comments
      };
    case RECEIVE_CATEGORIES:
      const { categories } = action;
      return {
        ...state,
        categories: categories
      };
    default:
      return state;
  }
}

export default data;

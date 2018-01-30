import * as BackendAPI from "../utils/api";
import {
  SELECT_SORT_CRITERIA,
  SELECT_CATEGORY,
  SELECT_POST,
  SELECT_COMMENT,
  DESELECT_POST,
  DESELECT_COMMENT,
  RECEIVE_POSTS,
  RECEIVE_COMMENTS,
  RECEIVE_CATEGORIES,
  POST_MODAL_OPEN,
  POST_MODAL_CLOSE,
  COMMENT_MODAL_OPEN,
  COMMENT_MODAL_CLOSE
} from "./types";

export const postModalOpen = () => ({
  type: POST_MODAL_OPEN
});

export const postModalClose = () => ({
  type: POST_MODAL_CLOSE
});

export const commentModalOpen = () => ({
  type: COMMENT_MODAL_OPEN
});

export const commentModalClose = () => ({
  type: COMMENT_MODAL_CLOSE
});

export const deselectPost = () => ({
  type: DESELECT_POST
});

export const deselectComment = () => ({
  type: DESELECT_COMMENT
});

export const selectSortCriteria = criteria => ({
  type: SELECT_SORT_CRITERIA,
  criteria: criteria
});

export const selectCategory = category => ({
  type: SELECT_CATEGORY,
  category
});

export const selectPost = post => ({
  type: SELECT_POST,
  post
});

export const fetchPost = id => dispatch =>
  BackendAPI.getPost(id).then(post => {
    dispatch(selectPost(post));
    dispatch(fetchComments(post.id));
  });

export const selectComment = comment => ({
  type: SELECT_COMMENT,
  comment
});

export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts
});

export const fetchPosts = category => dispatch => {
  BackendAPI.getAllPosts(category).then(posts => {
    dispatch(receivePosts(posts));
    dispatch(selectCategory(category));
  });
};

export const receiveComments = comments => ({
  type: RECEIVE_COMMENTS,
  comments
});

export const fetchComments = parentId => dispatch =>
  BackendAPI.getAllComments(parentId).then(comments =>
    dispatch(receiveComments(comments))
  );

export const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  categories
});

export const fetchCategories = () => dispatch =>
  BackendAPI.getCategories().then(({ categories }) =>
    dispatch(receiveCategories(categories))
  );

export const doVoteOnPost = (id, option, activeCategory) => dispatch =>
  BackendAPI.voteOnPost(id, option).then(
    BackendAPI.getAllPosts(activeCategory).then(posts => {
      dispatch(fetchPost(id));
      dispatch(receivePosts(posts));
    })
  );

export const doVoteOnComment = (id, option, parentId) => dispatch =>
  BackendAPI.voteOnComment(id, option).then(
    BackendAPI.getAllComments(parentId).then(comments =>
      dispatch(receiveComments(comments))
    )
  );

export const doAddNewPost = (
  title,
  body,
  author,
  category,
  activeCategory
) => dispatch =>
  BackendAPI.addNewPost(title, body, author, category).then(
    BackendAPI.getAllPosts(activeCategory).then(posts =>
      dispatch(receivePosts(posts))
    )
  );

export const doEditPost = (id, title, body, activeCategory) => dispatch =>
  BackendAPI.editPost(id, title, body).then(
    BackendAPI.getAllPosts(activeCategory).then(posts => {
      dispatch(fetchPost(id));
      dispatch(receivePosts(posts));
    })
  );

export const doDeletePost = (id, activeCategory) => dispatch =>
  BackendAPI.deletePost(id).then(
    BackendAPI.getAllPosts(activeCategory).then(posts =>
      dispatch(receivePosts(posts))
    )
  );

export const doAddNewComment = (body, author, parentId) => dispatch =>
  BackendAPI.addNewComment(body, author, parentId).then(
    BackendAPI.getAllComments(parentId).then(comments =>
      dispatch(receiveComments(comments))
    )
  );

export const doEditComment = (id, body, parentId) => dispatch =>
  BackendAPI.editComment(id, body).then(
    BackendAPI.getAllComments(parentId).then(comments =>
      dispatch(receiveComments(comments))
    )
  );

export const doDeleteComment = (id, parentId) => dispatch =>
  BackendAPI.deleteComment(id).then(
    BackendAPI.getAllComments(parentId).then(comments =>
      dispatch(receiveComments(comments))
    )
  );

export const openEditPostModal = post => dispatch => {
  dispatch(selectPost(post));
  dispatch(postModalOpen());
};

export const openNewPostModal = () => dispatch => {
  dispatch(deselectPost());
  dispatch(postModalOpen());
};

export const openEditCommentModal = comment => dispatch => {
  dispatch(selectComment(comment));
  dispatch(commentModalOpen());
};

export const openNewCommentModal = () => dispatch => {
  dispatch(deselectComment());
  dispatch(commentModalOpen());
};

import {
  uuidv4,
  doHttpGet,
  doHttpPost,
  doHttpPut,
  doHttpDelete
} from "../utils/helpers";

export function getCategories() {
  return doHttpGet(`categories`);
}

export function getAllPosts(category = "NO_FILTER") {
  if (category !== "NO_FILTER") {
    return doHttpGet(`${category}/posts`);
  }
  return doHttpGet(`posts`);
}

export function addNewPost(title, body, author, category) {
  var data = {
    id: uuidv4(),
    timestamp: Date.now(),
    title: title,
    body: body,
    author: author,
    category: category
  };
  return doHttpPost(`posts`, data);
}

export function getPost(id) {
  return doHttpGet(`posts/${id}`);
}

export function voteOnPost(id, option) {
  // option: - String: Either "upVote" or "downVote"
  var data = { option: option };
  return doHttpPost(`posts/${id}`, data);
}

export function editPost(id, title, body) {
  var data = {
    title: title,
    body: body
  };
  return doHttpPut(`posts/${id}`, data);
}

export function deletePost(id) {
  return doHttpDelete(`posts/${id}`);
}

export function getAllComments(id) {
  return doHttpGet(`posts/${id}/comments`);
}

export function addNewComment(body, author, parentId) {
  var data = {
    id: uuidv4(),
    timestamp: Date.now(),
    body: body,
    author: author,
    parentId: parentId
  };
  return doHttpPost(`comments`, data);
}

export function getComment(id) {
  return doHttpGet(`comments/${id}`);
}

export function voteOnComment(id, option) {
  // option: - String: Either "upVote" or "downVote"
  var data = { option: option };
  return doHttpPost(`comments/${id}`, data);
}

export function editComment(id, body) {
  var data = {
    timestamp: Date.now(),
    body: body
  };
  return doHttpPut(`comments/${id}`, data);
}

export function deleteComment(id) {
  return doHttpDelete(`comments/${id}`);
}

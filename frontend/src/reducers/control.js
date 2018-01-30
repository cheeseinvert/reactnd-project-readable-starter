import {
  SELECT_SORT_CRITERIA,
  POST_MODAL_OPEN,
  POST_MODAL_CLOSE,
  COMMENT_MODAL_OPEN,
  COMMENT_MODAL_CLOSE
} from "../actions/types";

const initialState = {
  activeSortCriteria: "timestamp",
  isCommentModalOpen: false,
  isPostModalOpen: false
};
function control(state = initialState, action) {
  switch (action.type) {
    case SELECT_SORT_CRITERIA:
      const { criteria } = action;
      return {
        ...state,
        activeSortCriteria: criteria
      };
    case POST_MODAL_OPEN:
      return {
        ...state,
        isPostModalOpen: true
      };
    case POST_MODAL_CLOSE:
      return {
        ...state,
        isPostModalOpen: false
      };
    case COMMENT_MODAL_OPEN:
      return {
        ...state,
        isCommentModalOpen: true
      };
    case COMMENT_MODAL_CLOSE:
      return {
        ...state,
        isCommentModalOpen: false
      };
    default:
      return state;
  }
}

export default control;

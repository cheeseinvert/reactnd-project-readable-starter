import React, { Component } from "react";
import sortBy from "sort-by";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Modal from "react-modal";
import ThumbsUpIcon from "react-icons/lib/md/thumb-up";
import ThumbsDownIcon from "react-icons/lib/md/thumb-down";
import MdDelete from "react-icons/lib/md/delete";
import MdEdit from "react-icons/lib/md/edit";
import MdAdd from "react-icons/lib/md/add";
import MdClose from "react-icons/lib/md/close";

import { timeConverter } from "../utils/helpers";
import CommentForm from "./CommentForm";
import * as actions from "../actions";

class CommentTable extends Component {
  static defaultProps = {
    comments: []
  };
  state = {
    loading: true
  };
  componentDidMount() {
    const { fetchComments, activePost } = this.props;
    Modal.setAppElement(document.body);
    fetchComments(activePost.id);
    this.setState({ loading: false });
  }

  render() {
    const {
      comments,
      doVoteOnComment,
      activeSortCriteria,
      isCommentModalOpen,
      commentModalClose,
      doDeleteComment,
      activePost,
      openEditCommentModal,
      openNewCommentModal
    } = this.props;
    comments.length > 1 && comments.sort(sortBy(activeSortCriteria));

    return (
      <div className="table-list">
        <h2 className="table-list-title">
          Comments ({comments.length})&nbsp;
          <button
            className="new-item-btn"
            onClick={() => openNewCommentModal()}
          >
            <MdAdd size={20} />
          </button>
        </h2>
        {comments.length < 1 || this.state.loading ? (
          <p>No comments show...</p>
        ) : (
          <table className="data-table">
            <tbody>
              {comments.map(comment => (
                <tr key={comment.id} className="table-list-item">
                  <td className="item-metadata">
                    <div className="item-timestamp">
                      <label>updated at</label>{" "}
                      {timeConverter(comment.timestamp)}
                    </div>
                    <div className="item-author">
                      <label>by</label> {comment.author}
                    </div>
                  </td>
                  <td className="item-content">
                    <div className="item-body">{comment.body}</div>
                  </td>
                  <td className="item-voting">
                    (score: {comment.voteScore})
                    <div className="item-voteScore">
                      <button
                        className="thumb-up-btn"
                        onClick={() =>
                          doVoteOnComment(comment.id, "upVote", activePost.id)
                        }
                      >
                        <ThumbsUpIcon size={20} />
                      </button>
                      <button
                        className="thumb-down-btn"
                        onClick={() =>
                          doVoteOnComment(comment.id, "downVote", activePost.id)
                        }
                      >
                        <ThumbsDownIcon size={20} />
                      </button>

                      <button
                        className="item-edit-btn"
                        onClick={() => {
                          openEditCommentModal(comment);
                        }}
                      >
                        <MdEdit size={20} />
                      </button>
                      <button
                        className="post-delete-btn"
                        onClick={() =>
                          doDeleteComment(comment.id, activePost.id)
                        }
                      >
                        <MdDelete size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <Modal
          className="modal"
          overlayClassName="overlay"
          isOpen={isCommentModalOpen}
          onRequestClose={commentModalClose}
          contentLabel="Modal"
        >
          <button onClick={() => commentModalClose()}>
            <MdClose size={20} />
          </button>
          <CommentForm />
        </Modal>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state) {
  return {
    comments: state.comments,
    activeSortCriteria: state.activeSortCriteria,
    activeCategory: state.activeCategory,
    activePost: state.activePost,
    isCommentModalOpen: state.isCommentModalOpen
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentTable);

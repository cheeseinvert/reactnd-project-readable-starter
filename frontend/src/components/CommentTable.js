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

import { Table, TableBody, TableRow, TableRowColumn } from "material-ui/Table";

import IconButton from "material-ui/IconButton";
import Badge from "material-ui/Badge";
import Subheader from "material-ui/Subheader";

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
        <Subheader className="table-list-title">
          Comments ({comments.length})&nbsp;
          <IconButton
            tooltip="New Comment"
            className="new-item-btn"
            onClick={() => openNewCommentModal()}
          >
            <MdAdd size={20} />
          </IconButton>
        </Subheader>
        {comments.length < 1 || this.state.loading ? (
          <p>No comments show...</p>
        ) : (
          <Table className="data-table">
            <TableBody displayRowCheckbox={false}>
              {comments.map(comment => (
                <TableRow key={comment.id} className="table-list-item">
                  <TableRowColumn className="item-metadata">
                    <div className="item-timestamp">
                      <label>updated at</label>{" "}
                      {timeConverter(comment.timestamp)}
                    </div>
                    <div className="item-author">
                      <label>by</label> {comment.author}
                    </div>
                  </TableRowColumn>
                  <TableRowColumn className="item-content">
                    <Badge badgeContent={comment.voteScore} primary={true}>
                      <div className="item-body">{comment.body}</div>
                    </Badge>
                  </TableRowColumn>
                  <TableRowColumn className="item-voting">
                    <div className="item-voteScore">
                      <IconButton
                        className="thumb-up-btn"
                        onClick={() =>
                          doVoteOnComment(comment.id, "upVote", activePost.id)
                        }
                      >
                        <ThumbsUpIcon size={20} />
                      </IconButton>
                      <IconButton
                        className="thumb-down-btn"
                        onClick={() =>
                          doVoteOnComment(comment.id, "downVote", activePost.id)
                        }
                      >
                        <ThumbsDownIcon size={20} />
                      </IconButton>
                      <IconButton
                        className="item-edit-btn"
                        onClick={() => {
                          openEditCommentModal(comment);
                        }}
                      >
                        <MdEdit size={20} />
                      </IconButton>

                      <IconButton
                        className="post-delete-btn"
                        onClick={() =>
                          doDeleteComment(comment.id, activePost.id)
                        }
                      >
                        <MdDelete size={20} />
                      </IconButton>
                    </div>
                  </TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        <Modal
          className="modal"
          overlayClassName="overlay"
          isOpen={isCommentModalOpen}
          onRequestClose={commentModalClose}
          contentLabel="Modal"
        >
          <CommentForm />
        </Modal>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

function mapStateToProps({ data, control }) {
  return {
    comments: data.comments,
    activeSortCriteria: control.activeSortCriteria,
    activeCategory: data.activeCategory,
    activePost: data.activePost,
    isCommentModalOpen: control.isCommentModalOpen
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentTable);

import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import ThumbsUpIcon from "react-icons/lib/md/thumb-up";
import ThumbsDownIcon from "react-icons/lib/md/thumb-down";
import MdDelete from "react-icons/lib/md/delete";
import MdEdit from "react-icons/lib/md/edit";
import MdClose from "react-icons/lib/md/close";
import Modal from "react-modal";

import IconButton from "material-ui/IconButton";

import { timeConverter } from "../utils/helpers";

import PostForm from "./PostForm";
import CommentTable from "./CommentTable";
import * as actions from "../actions";
import { bindActionCreators } from "redux";

import TextField from "material-ui/TextField";
import Subheader from "material-ui/Subheader";

class PostView extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired
  };
  state = {
    comments: []
  };

  componentDidMount() {
    this.props.fetchPost(this.props.id);
  }
  render() {
    const {
      activePost,
      doDeletePost,
      doVoteOnPost,
      isPostModalOpen,
      postModalClose,
      openEditPostModal
    } = this.props;
    if (!activePost) {
      return <p>loading</p>;
    } else if (Object.keys(activePost).length === 0) {
      this.props.history.push(`/NotFound`);
      return null;
    } else {
      const {
        id,
        timestamp,
        author,
        category,
        title,
        body,
        voteScore
      } = activePost;
      return (
        <div className="outer-view">
          {activePost && (
            <div className="details-view">
              <Subheader>Viewing Post {activePost.id}</Subheader>
              <div className="details-metadata">
                <div className="item-timestamp">
                  <TextField
                    floatingLabelText="created at"
                    value={timeConverter(timestamp)}
                    disabled={true}
                  />
                </div>
                <div className="item-author">
                  <TextField
                    floatingLabelText="by"
                    value={author}
                    disabled={true}
                  />
                </div>
                <div className="item-category">
                  <TextField
                    floatingLabelText="category"
                    value={category}
                    disabled={true}
                  />
                </div>
              </div>
              <br />
              <div className="details-content">
                <div className="item-title">
                  <TextField
                    fullWidth={true}
                    floatingLabelText="title"
                    value={title}
                    disabled={true}
                  />
                </div>
                <br />
                <div className="item-body">
                  <TextField
                    fullWidth={true}
                    multiLine={true}
                    floatingLabelText="body"
                    value={body}
                    disabled={true}
                  />
                </div>
                <br />
              </div>
              <div className="details-voting">
                <div className="item-voteScore">(score: {voteScore})</div>
                <IconButton
                  tooltip="vote up"
                  className="thumb-up-btn"
                  onClick={() => doVoteOnPost(id, "upVote")}
                >
                  <ThumbsUpIcon size={20} />
                </IconButton>
                <IconButton
                  tooltip="vote down"
                  className="thumb-down-btn"
                  onClick={() => doVoteOnPost(id, "downVote")}
                >
                  <ThumbsDownIcon size={20} />
                </IconButton>
                <IconButton
                  tooltip="edit"
                  className="item-edit-btn"
                  onClick={() => {
                    console.log("click");
                    openEditPostModal(activePost);
                  }}
                >
                  <MdEdit size={20} />
                </IconButton>
                <Link to={`/`} onClick={() => doDeletePost(id)}>
                  <MdDelete size={20} />
                </Link>
              </div>

              <CommentTable />
              <Modal
                className="modal"
                overlayClassName="overlay"
                isOpen={isPostModalOpen}
                onRequestClose={postModalClose}
                contentLabel="Modal"
              >
                <button onClick={() => postModalClose()}>
                  <MdClose size={20} />
                </button>
                <PostForm />
              </Modal>
            </div>
          )}
        </div>
      );
    }
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

function mapStateToProps({ data, control }) {
  return {
    activePost: data.activePost,
    isPostModalOpen: control.isPostModalOpen
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PostView)
);

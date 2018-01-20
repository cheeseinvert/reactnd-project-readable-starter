import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import ThumbsUpIcon from "react-icons/lib/md/thumb-up";
import ThumbsDownIcon from "react-icons/lib/md/thumb-down";
import MdDelete from "react-icons/lib/md/delete";
import MdEdit from "react-icons/lib/md/edit";
import MdClose from "react-icons/lib/md/close";
import Modal from "react-modal";

import { timeConverter } from "../utils/helpers";

import PostForm from "./PostForm";
import CommentTable from "./CommentTable";
import * as actions from "../actions";
import { bindActionCreators } from "redux";

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
              <h2>Viewing Post {activePost.id}</h2>
              <div className="details-metadata">
                <div className="item-timestamp">
                  <label>created at</label> {timeConverter(timestamp)}
                </div>
                <div className="item-author">
                  <label>by</label> {author}
                </div>
                <div className="item-category">
                  <label>category:</label> {category}
                </div>
              </div>
              <br />
              <div className="details-content">
                <div className="item-title">{title}</div>
                <br />
                <div className="item-body">{body}</div>
                <br />
              </div>
              <div className="details-voting">
                <div className="item-voteScore">(score: {voteScore})</div>
                <button
                  className="thumb-up-btn"
                  onClick={() => doVoteOnPost(id, "upVote")}
                >
                  <ThumbsUpIcon size={20} />
                </button>
                <button
                  className="thumb-down-btn"
                  onClick={() => doVoteOnPost(id, "downVote")}
                >
                  <ThumbsDownIcon size={20} />
                </button>
                <button
                  className="item-edit-btn"
                  onClick={() => {
                    console.log("click");
                    openEditPostModal(activePost);
                  }}
                >
                  <MdEdit size={20} />
                </button>
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

function mapStateToProps(state) {
  return {
    activePost: state.activePost,
    isPostModalOpen: state.isPostModalOpen
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostView);

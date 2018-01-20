import React, { Component } from "react";
import sortBy from "sort-by";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Modal from "react-modal";

import ThumbsUpIcon from "react-icons/lib/md/thumb-up";
import ThumbsDownIcon from "react-icons/lib/md/thumb-down";
import MdDelete from "react-icons/lib/md/delete";
import MdEdit from "react-icons/lib/md/edit";
import MdInfo from "react-icons/lib/md/info";
import MdAdd from "react-icons/lib/md/add";
import MdClose from "react-icons/lib/md/close";

import { timeConverter, capitalize } from "../utils/helpers";

import PostForm from "./PostForm";
import * as actions from "../actions";
import { bindActionCreators } from "redux";

const NO_FILTER = "NO_FILTER";

class PostTable extends Component {
  static defaultProps = {
    posts: []
  };
  state = {
    loading: true
  };
  componentDidMount() {
    Modal.setAppElement(document.body);
    this.props.fetchPosts(this.props.activeCategory);
    this.setState({ loading: false });
  }

  render() {
    const {
      posts,
      activeCategory,
      doVoteOnPost,
      activeSortCriteria,
      isPostModalOpen,
      postModalClose,
      doDeletePost,
      openEditPostModal
    } = this.props;
    posts.length > 1 && posts.sort(sortBy(activeSortCriteria));

    return (
      <div className="table-list">
        <h2 className="table-list-title">
          {activeCategory !== NO_FILTER && capitalize(activeCategory)}&nbsp;
          Posts ({posts.length})&nbsp;
          <button
            className="new-item-btn"
            onClick={() => {
              this.props.openNewPostModal();
            }}
          >
            <MdAdd size={20} />
          </button>
        </h2>
        {posts.length < 1 || this.state.loading ? (
          <p>No posts to show...</p>
        ) : (
          <table className="data-table">
            <tbody>
              {posts.map(post => (
                <tr key={post.id} className="table-list-item">
                  <td className="item-metadata">
                    <div className="item-timestamp">
                      <label>created at</label> {timeConverter(post.timestamp)}
                    </div>
                    <div className="item-author">
                      <label>by</label> {post.author}
                    </div>
                    <div className="item-category">
                      <label>category:</label> {post.category}
                    </div>
                  </td>
                  <td className="item-content">
                    <div className="item-title">{post.title}</div>
                    <div className="item-body">{post.body}</div>
                  </td>
                  <td className="item-voting">
                    (score: {post.voteScore})
                    <div className="item-voteScore">
                      <Link to={`/${post.category}/${post.id}`}>
                        <MdInfo size={20} />
                      </Link>
                      <button
                        className="thumb-up-btn"
                        onClick={() => doVoteOnPost(post.id, "upVote")}
                      >
                        <ThumbsUpIcon size={20} />
                      </button>
                      <button
                        className="thumb-down-btn"
                        onClick={() => doVoteOnPost(post.id, "downVote")}
                      >
                        <ThumbsDownIcon size={20} />
                      </button>

                      <button
                        className="item-edit-btn"
                        onClick={() => {
                          openEditPostModal(post);
                        }}
                      >
                        <MdEdit size={20} />
                      </button>
                      <button
                        className="post-delete-btn"
                        onClick={() => doDeletePost(post.id)}
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
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state, ownProps) {
  return {
    posts: state.posts,
    activeSortCriteria: state.activeSortCriteria,
    activeCategory: ownProps.activeCategory,
    isPostModalOpen: state.isPostModalOpen
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostTable);

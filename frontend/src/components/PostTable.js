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

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";

import IconButton from "material-ui/IconButton";
import Badge from "material-ui/Badge";
import ActionInfo from "material-ui/svg-icons/action/info";
import Subheader from "material-ui/Subheader";

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
        <Subheader className="table-list-title">
          {activeCategory !== NO_FILTER && capitalize(activeCategory)}&nbsp;
          Posts ({posts.length})&nbsp;
          <IconButton
            className="new-item-btn"
            onClick={() => {
              this.props.openNewPostModal();
            }}
          >
            <MdAdd size={20} />
          </IconButton>
        </Subheader>
        {posts.length < 1 || this.state.loading ? (
          <p>No posts to show...</p>
        ) : (
          <Table className="data-table">
            <TableBody displayRowCheckbox={false}>
              {posts.map(post => (
                <TableRow key={post.id} className="table-list-item">
                  <TableRowColumn className="item-metadata">
                    <div className="item-timestamp">
                      <label>created at</label> {timeConverter(post.timestamp)}
                    </div>
                    <div className="item-author">
                      <label>by</label> {post.author}
                    </div>
                    <div className="item-category">
                      <label>category:</label> {post.category}
                    </div>
                    <div className="item-comments">
                      <label>comments:</label> {post.commentCount}
                    </div>
                  </TableRowColumn>
                  <TableRowColumn className="item-content">
                    <div className="item-title">{post.title}</div>
                    <div className="item-body">{post.body}</div>
                  </TableRowColumn>
                  <TableRowColumn className="item-voting">
                    <div className="item-voteScore">
                      <Badge badgeContent={post.voteScore} primary={true}>
                        <Link to={`/${post.category}/${post.id}`}>
                          <MdInfo size={20} />
                        </Link>
                      </Badge>
                      <IconButton
                        className="thumb-up-btn"
                        onClick={() => doVoteOnPost(post.id, "upVote")}
                      >
                        <ThumbsUpIcon size={20} />
                      </IconButton>
                      <IconButton
                        className="thumb-down-btn"
                        onClick={() => doVoteOnPost(post.id, "downVote")}
                      >
                        <ThumbsDownIcon size={20} />
                      </IconButton>

                      <IconButton
                        className="item-edit-btn"
                        onClick={() => {
                          openEditPostModal(post);
                        }}
                      >
                        <MdEdit size={20} />
                      </IconButton>
                      <IconButton
                        className="post-delete-btn"
                        onClick={() => doDeletePost(post.id)}
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
          isOpen={isPostModalOpen}
          onRequestClose={postModalClose}
          contentLabel="Modal"
        >
          <PostForm />
        </Modal>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

function mapStateToProps({ data, control }, ownProps) {
  return {
    posts: data.posts,
    activeSortCriteria: control.activeSortCriteria,
    activeCategory: ownProps.activeCategory,
    isPostModalOpen: control.isPostModalOpen
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostTable);

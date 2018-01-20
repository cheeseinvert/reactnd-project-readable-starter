import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import MdAdd from "react-icons/lib/md/add";
import * as actions from "../actions";

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  state = {
    id: undefined,
    parentId: undefined,
    timestamp: undefined,
    body: undefined,
    author: undefined,
    voteScore: undefined,
    deleted: undefined,
    parentDeleted: undefined
  };
  componentDidMount() {
    if (this.props.activeComment) {
      this.setState({ ...this.props.activeComment });
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    const {
      activePost,
      activeComment,
      doEditComment,
      doAddNewComment,
      commentModalClose
    } = this.props;
    const { id, body, author } = this.state;
    if (activeComment) {
      doEditComment(id, body, activePost.id);
    } else {
      doAddNewComment(body, author, activePost.id);
    }
    commentModalClose();
    event.preventDefault();
  }

  render() {
    const { activeComment } = this.props;
    const {
      id,
      parentId,
      timestamp,
      body,
      author,
      voteScore,
      deleted,
      parentDeleted
    } = this.state;
    return (
      <div className="outer-form">
        <h3>{activeComment ? "Edit" : "New"} Comment</h3>
        <form onSubmit={this.handleSubmit}>
          {id && (
            <div className="form-id">
              <label>id:</label>&nbsp;{id}
              <br />
            </div>
          )}
          {parentId && (
            <div className="form-parentId">
              <label>parentId:</label>&nbsp;{parentId}
              <br />
            </div>
          )}
          {timestamp && (
            <div className="form-imestamp">
              <label>timestamp:</label>&nbsp;{timestamp}
              <br />
            </div>
          )}
          <label>Name:</label>&nbsp;
          <input
            name="author"
            type="text"
            value={author}
            onChange={this.handleInputChange}
          />
          <br />
          <label>Body:</label>&nbsp;
          <textarea
            name="body"
            type="textarea"
            value={body}
            onChange={this.handleInputChange}
          />
          <br />
          {voteScore && (
            <div className="form-voteScore">
              <label>voteScore:</label>&nbsp;{voteScore}
              <br />
            </div>
          )}
          {deleted && (
            <div className="form-deleted">
              <label>deleted:</label>&nbsp;{deleted}
              <br />
            </div>
          )}
          {parentDeleted && (
            <div className="form-parentId">
              <label>parentDeleted:</label>&nbsp;{parentDeleted}
              <br />
            </div>
          )}
          <button>
            <MdAdd size={20} />
          </button>
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
    activeSortCriteria: state.activeSortCriteria,
    activeComment: state.activeComment,
    activePost: state.activePost,
    isCommentModalOpen: state.isCommentModalOpen
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);

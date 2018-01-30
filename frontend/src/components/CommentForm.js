import React, { Component } from "react";
import { connect } from "react-redux";
import MdAdd from "react-icons/lib/md/add";
import { doEditComment, doAddNewComment, commentModalClose } from "../actions";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import Badge from "material-ui/Badge";
import Subheader from "material-ui/Subheader";

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
    const { activeComment, commentModalClose } = this.props;
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
        <Subheader>{activeComment ? "Edit" : "New"} Comment</Subheader>
        <form onSubmit={this.handleSubmit}>
          {id && (
            <div className="form-id">
              <TextField floatingLabelText="id:" value={id} disabled={true} />
            </div>
          )}
          {parentId && (
            <div className="form-parentId">
              <TextField
                floatingLabelText="parentId:"
                value={parentId}
                disabled={true}
              />
            </div>
          )}
          {timestamp && (
            <div className="form-imestamp">
              <TextField
                floatingLabelText="timestamp:"
                value={timestamp}
                disabled={true}
              />
            </div>
          )}
          <TextField
            floatingLabelText="Name:"
            name="author"
            type="text"
            value={author}
            onChange={this.handleInputChange}
          />
          <TextField
            floatingLabelText="Body:"
            multiLine="true"
            name="body"
            type="textarea"
            value={body}
            onChange={this.handleInputChange}
          />
          {voteScore && (
            <div className="form-voteScore">
              <TextField
                floatingLabelText="voteScore:"
                value={voteScore}
                disabled={true}
              />
            </div>
          )}
          {deleted && (
            <div className="form-deleted">
              <TextField
                floatingLabelText="deleted:"
                value={deleted}
                disabled={true}
              />
            </div>
          )}
          {parentDeleted && (
            <div className="form-parentId">
              <TextField
                floatingLabelText="parentDeleted"
                value={parentDeleted}
                diabled={true}
              />
            </div>
          )}
          <br />
          <FlatButton label="Cancel" onClick={commentModalClose} />
          <FlatButton type="submit" label="Submit" keyboardFocused={true} />
        </form>
      </div>
    );
  }
}

function mapStateToProps({ data, control }) {
  return {
    posts: data.posts,
    activeSortCriteria: control.activeSortCriteria,
    activeComment: data.activeComment,
    activePost: data.activePost,
    isCommentModalOpen: control.isCommentModalOpen
  };
}

export default connect(mapStateToProps, {
  doEditComment,
  doAddNewComment,
  commentModalClose
})(CommentForm);

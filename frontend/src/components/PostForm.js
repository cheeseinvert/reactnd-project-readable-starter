import React, { Component } from "react";
import { connect } from "react-redux";
import { capitalize } from "../utils/helpers";
import { doEditPost, doAddNewPost, postModalClose } from "../actions";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import Subheader from "material-ui/Subheader";

import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";

class PostForm extends Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  state = {
    id: undefined,
    timestamp: undefined,
    title: undefined,
    body: undefined,
    author: undefined,
    category: undefined,
    voteScore: undefined,
    deleted: undefined
  };
  componentDidMount() {
    if (this.props.activePost) {
      this.setState({ ...this.props.activePost });
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
      doEditPost,
      doAddNewPost,
      postModalClose,
      activeCategory
    } = this.props;
    const { id, title, body, author, category } = this.state;

    if (activePost) {
      doEditPost(id, title, body, activeCategory);
    } else {
      doAddNewPost(title, body, author, category, activeCategory);
    }
    postModalClose();
    event.preventDefault();
  }

  render() {
    const { categories, activePost, postModalClose } = this.props;

    const {
      id,
      timestamp,
      title,
      body,
      author,
      category,
      voteScore,
      deleted
    } = this.state;
    const operation = activePost ? "edit" : "new";
    return (
      <div className="outer-form">
        <Subheader>{capitalize(operation)} Post</Subheader>
        <form onSubmit={this.handleSubmit}>
          {id && (
            <div className="form-id">
              <TextField floatingLabelText="id:" value={id} disabled={true} />
            </div>
          )}
          {timestamp && (
            <div className="form-timestamp">
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
            disabled={operation === "edit"}
          />
          <br />
          <SelectField
            name="category"
            value={category}
            onChange={(event, index, value) => {
              this.setState({ category: value });
            }}
            disabled={operation === "edit"}
            floatingLabelText="choose category"
          >
            {categories.map((category, index) => (
              <MenuItem primaryText={category.name} value={category.path} />
            ))}
          </SelectField>
          <br />
          <TextField
            name="title"
            type="text"
            value={title}
            onChange={this.handleInputChange}
            floatingLabelText="Title:"
          />
          <br />
          <TextField
            multiLine="true"
            name="body"
            type="textarea"
            value={body}
            onChange={this.handleInputChange}
            floatingLabelText="Body:"
          />
          <br />
          {voteScore && (
            <div className="form-voteScore">
              <TextField
                floatingLabelText="voteScore:"
                value={voteScore}
                disabled={true}
              />
              <br />
            </div>
          )}
          {deleted && (
            <div className="form-deleted">
              <TextField
                floatingLabelText="deleted:"
                value={deleted}
                disabled={true}
              />
              <br />
            </div>
          )}
          <br />
          <FlatButton label="Cancel" onClick={postModalClose} />
          <FlatButton type="submit" label="Submit" />
        </form>
      </div>
    );
  }
}

function mapStateToProps({ data, control }) {
  return {
    posts: data.posts,
    activeSortCriteria: control.activeSortCriterea,
    activePost: data.activePost,
    isPostModalOpen: control.isPostModalOpen,
    categories: data.categories,
    activeCategory: data.activeCategory
  };
}

export default connect(mapStateToProps, {
  doEditPost,
  doAddNewPost,
  postModalClose
})(PostForm);

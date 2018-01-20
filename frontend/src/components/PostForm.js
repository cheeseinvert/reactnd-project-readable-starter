import React, { Component } from "react";
import { connect } from "react-redux";
import MdAdd from "react-icons/lib/md/add";
import { capitalize } from "../utils/helpers";
import * as actions from "../actions";
import { bindActionCreators } from "redux";

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
    const { activePost, doEditPost, doAddNewPost, postModalClose } = this.props;
    const { id, title, body, author, category } = this.state;

    if (activePost) {
      doEditPost(id, title, body);
    } else {
      doAddNewPost(title, body, author, category);
    }
    postModalClose();
    event.preventDefault();
  }

  render() {
    const { categories, activePost } = this.props;

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
        <h3>{capitalize(operation)} Post</h3>
        <form onSubmit={this.handleSubmit}>
          {id && (
            <div className="form-id">
              <label>id:</label>&nbsp;{id}
              <br />
            </div>
          )}
          {timestamp && (
            <div className="form-timestamp">
              <label>timestamp:</label>&nbsp;{timestamp}
              <br />
            </div>
          )}
          <label>Name:</label>&nbsp;
          {operation === "edit" ? (
            author
          ) : (
            <input
              name="author"
              type="text"
              value={author}
              onChange={this.handleInputChange}
            />
          )}
          <br />
          <label>Category:</label>&nbsp;
          {operation === "edit" ? (
            category
          ) : (
            <select
              name="category"
              value={category}
              onChange={this.handleInputChange}
            >
              <option selected hidden>
                Choose here
              </option>
              {categories.map((category, index) => (
                <option key={index} value={category.path}>
                  {category.name}
                </option>
              ))}
            </select>
          )}
          <br />
          <label>Title:</label>
          <input
            name="title"
            type="text"
            value={title}
            onChange={this.handleInputChange}
          />
          <br />
          <label>Body:</label>
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
    activePost: state.activePost,
    isPostModalOpen: state.isPostModalOpen,
    categories: state.categories
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);

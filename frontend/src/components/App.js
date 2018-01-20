import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import logo from "../logo.svg";
import "../App.css";

import PostView from "./PostView";
import PostTable from "./PostTable";
import * as actions from "../actions";

class App extends Component {
  state = {
    possibleSortCriteria: ["timestamp", "voteScore"]
  };
  static defaultProps = {
    categories: []
  };

  componentDidMount() {
    this.props.fetchCategories();
  }

  render() {
    const { fetchPosts, selectSortCriteria, categories } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">
            Welcome to Adam Grant''s Readable Project
          </h1>
        </header>
        <p className="App-intro">Click on a category to filter the posts:</p>
        <ul>
          <li key={0}>
            <Link to={`/`} onClick={() => fetchPosts()}>
              no category filter
            </Link>
          </li>
          {categories.length > 1 &&
            categories.map((category, index) => (
              <li key={index + 1}>
                <Link
                  to={`/${category.path}`}
                  onClick={() => fetchPosts(category.name)}
                >
                  {category.name}
                </Link>
              </li>
            ))}
        </ul>
        <div className="sort-selecter">
          sort criteria:&nbsp;
          <select onChange={e => selectSortCriteria(e.target.value)}>
            <option selected hidden>
              Choose here
            </option>
            {this.state.possibleSortCriteria.map((criteria, index) => (
              <option key={index} value={criteria}>
                {criteria}
              </option>
            ))}
          </select>
        </div>
        <Route
          exact
          path="/"
          render={props => <PostTable activeCategory="NO_FILTER" />}
        />
        <Route
          exact
          path="/:category"
          render={props => (
            <PostTable activeCategory={props.match.params.category} />
          )}
        />
        <Route
          path="/:category/:id"
          render={props => <PostView id={props.match.params.id} />}
        />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state) {
  return {
    categories: state.categories
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

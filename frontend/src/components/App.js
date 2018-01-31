import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import logo from "../banner.jpg";
import "../App.css";

import PostView from "./PostView";
import PostTable from "./PostTable";
import { fetchPosts, selectSortCriteria, fetchCategories } from "../actions";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";

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
          <link
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
            rel="stylesheet"
          />
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Adam Grants Readable Project</h1>
        </header>
        <div>
          <label>category filter:</label>
          <SelectField
            value={this.state.selectCategory}
            onChange={(event, index, value) => {
              fetchPosts(value);
              this.setState({ selectCategory: value });
              this.props.history.push(`/${value}`);
            }}
          >
            <MenuItem primaryText="no category filter" value="" />
            {categories.length > 1 &&
              categories.map((category, index) => (
                <MenuItem
                  key={index}
                  primaryText={category.name}
                  value={category.path}
                />
              ))}
          </SelectField>

          <label>sort priority:</label>
          <SelectField
            value={this.state.selectValue}
            onChange={(event, index, value) => {
              this.setState({ selectValue: value });
              selectSortCriteria(value);
            }}
          >
            {this.state.possibleSortCriteria.map((criteria, index) => (
              <MenuItem key={index} primaryText={criteria} value={criteria} />
            ))}
          </SelectField>
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

function mapStateToProps({ data }) {
  return { categories: data.categories };
}

export default connect(mapStateToProps, {
  fetchPosts,
  fetchCategories,
  selectSortCriteria
})(App);

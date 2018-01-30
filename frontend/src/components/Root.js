import React from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "./App";
import NotFound from "./NotFound";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

const Root = ({ store }) => (
  <MuiThemeProvider>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/NotFound" component={NotFound} />
          <Route path="/:filter?" component={App} />
        </Switch>
      </Router>
    </Provider>
  </MuiThemeProvider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;

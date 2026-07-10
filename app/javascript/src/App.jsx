import React from "react";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { ShowPosts, CreatePost } from "./components/Posts";
import routes from "./routes";

const App = () => (
  <Router>
    <ToastContainer />
    <Switch>
      <Route exact component={ShowPosts} path={routes.root} />
      <Route exact component={CreatePost} path={routes.posts.create} />
    </Switch>
  </Router>
);

export default App;

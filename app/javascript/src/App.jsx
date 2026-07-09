import React from "react";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import { ShowPosts, CreatePost } from "./components/Posts";

const App = () => (
  <Router>
    <Switch>
      <Route exact component={ShowPosts} path="/" />
      <Route exact component={CreatePost} path="/posts/create" />
      <Route exact path="/about" render={() => <div>About</div>} />
    </Switch>
  </Router>
);

export default App;

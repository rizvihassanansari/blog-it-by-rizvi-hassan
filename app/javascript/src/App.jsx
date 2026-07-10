import React from "react";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import { ShowPosts, CreatePost } from "./components/Posts";
import routes from "./routes";

const App = () => (
  <Router>
    <Switch>
      <Route exact component={ShowPosts} path={routes.root} />
      <Route exact component={CreatePost} path={routes.posts.create} />
      <Route exact path="/about" render={() => <div>About</div>} />
    </Switch>
  </Router>
);

export default App;

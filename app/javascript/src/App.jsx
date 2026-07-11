import React from "react";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { Container } from "./components/commons";
import { PostList, CreatePost, ShowPost } from "./components/Posts";
import routes from "./routes";

const App = () => (
  <Router>
    <ToastContainer />
    <Container>
      <Switch>
        <Route exact component={PostList} path={routes.root} />
        <Route exact component={ShowPost} path={routes.posts.show} />
        <Route exact component={CreatePost} path={routes.posts.create} />
      </Switch>
    </Container>
  </Router>
);

export default App;

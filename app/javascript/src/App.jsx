import React from "react";

import { QueryClientProvider } from "react-query";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { Container } from "./components/commons";
import { PostList, CreatePost, ShowPost } from "./components/Posts";
import routes from "./routes";
import queryClient from "./utils/queryClient";

const App = () => (
  <QueryClientProvider client={queryClient}>
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
  </QueryClientProvider>
);

export default App;

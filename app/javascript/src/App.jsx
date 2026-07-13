import React from "react";

import { either, isEmpty, isNil } from "ramda";
import { QueryClientProvider } from "react-query";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { Signup, Login } from "./components/Authentication";
import { Container, PrivateRoute } from "./components/commons";
import { PostList, CreatePost, ShowPost } from "./components/Posts";
import routes from "./routes";
import queryClient from "./utils/queryClient";
import { getFromLocalStorage } from "./utils/storage";

const App = () => {
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ToastContainer />
        <Container>
          <Switch>
            <Route exact component={ShowPost} path={routes.posts.show} />
            <Route exact component={CreatePost} path={routes.posts.create} />
            <Route exact component={Signup} path={routes.auth.signup} />
            <Route exact component={Login} path={routes.auth.login} />
            <PrivateRoute
              component={PostList}
              condition={isLoggedIn}
              path={routes.root}
              redirectRoute={routes.auth.login}
            />
          </Switch>
        </Container>
      </Router>
    </QueryClientProvider>
  );
};

export default App;

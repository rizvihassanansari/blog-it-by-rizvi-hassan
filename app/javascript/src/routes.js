const routes = {
  root: "/",
  posts: {
    create: "/posts/create",
    show: "/posts/:slug/show",
    edit: "/posts/:slug/edit",
    preview: "/posts/preview",
    myPosts: "/posts/my",
  },
  auth: {
    signup: "/signup",
    login: "/login",
  },
};

export default routes;

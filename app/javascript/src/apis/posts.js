import axios from "axios";

const fetch = params => axios.get("/posts", { params });

const create = ({ payload, quiet = false }) => {
  const url = quiet ? `/posts?quiet` : `/posts`;

  return axios.post(url, { post: payload });
};

const show = slug => axios.get(`/posts/${slug}`);

const update = ({ slug, payload, quiet = false }) => {
  const url = quiet ? `/posts/${slug}?quiet` : `/posts/${slug}`;

  return axios.put(url, { post: payload });
};

const destroy = ({ slug, quiet = false }) => {
  const url = quiet ? `/posts/${slug}?quiet` : `/posts/${slug}`;

  return axios.delete(url);
};

const myPosts = () => axios.get(`/posts/my_posts`);

const postsApi = { fetch, create, show, update, destroy, myPosts };

export default postsApi;

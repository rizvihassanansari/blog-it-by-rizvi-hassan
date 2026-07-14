import axios from "axios";

const fetch = params => axios.get("/posts", { params });

const create = payload => axios.post("/posts", { post: payload });

const show = slug => axios.get(`/posts/${slug}`);

const update = ({ slug, payload, quiet = false }) => {
  const url = quiet ? `/posts/${slug}?quiet` : `/posts/${slug}`;

  return axios.put(url, { post: payload });
};

const destroy = slug => axios.delete(`/posts/${slug}`);

const postsApi = { fetch, create, show, update, destroy };

export default postsApi;

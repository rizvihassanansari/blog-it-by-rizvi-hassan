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

const myPosts = filters => axios.get(`/posts/my_posts`, { params: filters });

const bulkUpdate = payload => axios.patch(`/posts/bulk_update`, { ...payload });

const bulkDelete = slugs =>
  axios.delete(`/posts/bulk_delete`, { data: { slugs } });

const generatePdf = slug => axios.post(`/posts/${slug}/pdf`, {});
const downloadPdf = slug =>
  axios.get(`/posts/${slug}/pdf/download`, { responseType: "blob" });

const postsApi = {
  fetch,
  create,
  show,
  update,
  destroy,
  myPosts,
  bulkUpdate,
  bulkDelete,
  generatePdf,
  downloadPdf,
};

export default postsApi;

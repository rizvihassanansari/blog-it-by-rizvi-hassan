import axios from "axios";

const create = payload => axios.post("/votes", { ...payload });

const destroy = id => axios.delete(`/votes/${id}`);

const votesApi = { create, destroy };

export default votesApi;

import { keysToCamelCase, keysToSnakeCase } from "@bigbinary/neeto-cist";
import { Toastr } from "@bigbinary/neetoui";
import axios from "axios";
import { t } from "i18next";

import { getFromLocalStorage } from "../utils/storage";

axios.defaults.baseURL = "/";

const setAuthHeaders = () => {
  axios.defaults.headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-CSRF-TOKEN": document
      .querySelector('[name="csrf-token"]')
      .getAttribute("content"),
  };
  const token = getFromLocalStorage("authToken");
  const email = getFromLocalStorage("authEmail");
  if (token && email) {
    axios.defaults.headers["X-Auth-Email"] = email;
    axios.defaults.headers["X-Auth-Token"] = token;
  }
};

const handleSuccessResponse = response => {
  if (response) {
    response.success = response.status === 200;
    if (response.data.notice) {
      Toastr.success(response.data.notice);
    }

    if (response.data) {
      response = keysToCamelCase(response.data);
    }
  }

  return response;
};

const handleErrorResponse = axiosErrorObject => {
  Toastr.error(
    axiosErrorObject.response?.data?.error || t("messages.errors.default")
  );
  if (axiosErrorObject.response?.status === 423) {
    window.location.href = "/";
  }

  return Promise.reject(axiosErrorObject);
};

const handleRequestInterceptor = request => {
  if (request.method?.toLowerCase() === "post" && request.data) {
    request.data = keysToSnakeCase(request.data);
  }

  return request;
};

const registerIntercepts = () => {
  axios.interceptors.response.use(handleSuccessResponse, error =>
    handleErrorResponse(error)
  );

  axios.interceptors.request.use(handleRequestInterceptor);
};

export { setAuthHeaders, registerIntercepts };

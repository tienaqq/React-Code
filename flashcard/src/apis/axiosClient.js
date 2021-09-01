import axios from "axios";
import queryString from "querystring";

const axiosClient = axios.create({
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.token;
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (res) => {
    return res.data;
  },
  async (err) => {
    throw err;
  }
);

export default axiosClient;

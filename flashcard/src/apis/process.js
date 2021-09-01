import axiosClient from "./axiosClient";

const baseUrl = process.env.REACT_APP_PROCESS_LEARNING_API;

const processAPI = {
  saveProcess: (params) => {
    const url = baseUrl + "/save";
    return axiosClient.post(url, { params });
  },
};

export default processAPI;

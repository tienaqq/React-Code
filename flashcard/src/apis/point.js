import axiosClient from "./axiosClient";

const baseUrl = process.env.REACT_APP_AUTH_API;
const basePoint = process.env.REACT_APP_POINT_API;

const pointAPI = {
  addPoint: (params) => {
    const url = baseUrl + "/add-point";
    return axiosClient.post(url, { params });
  },

  minusPoint: (params) => {
    const url = baseUrl + "/minus-point";
    return axiosClient.post(url, { params });
  },

  getPointHistory: (params) => {
    const url = basePoint + "/me";
    return axiosClient.get(url);
  },
};

export default pointAPI;

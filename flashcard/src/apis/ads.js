import axiosClient from "./axiosClient";

const baseUrl = process.env.REACT_APP_ADS_API;

const adsAPI = {
  getAds: () => {
    const url = baseUrl + "/all-me";
    return axiosClient.get(url);
  },
  removeAds: (params) => {
    const url = baseUrl + "/delete";
    return axiosClient.post(url, { params });
  },
  addAds: (params) => {
    const url = baseUrl + "/create";
    return axiosClient.post(url, { params });
  },
  updateAds: (params) => {
    const url = baseUrl + "/update";
    return axiosClient.post(url, { params });
  },
  getAdsByAdmin: () => {
    const url = baseUrl + "/all-admin";
    return axiosClient.get(url);
  },
  runAdsByAdmin: (params) => {
    const url = baseUrl + "/run-ads";
    return axiosClient.post(url, { params });
  },
  getCurrentAdsByAdmin: (params) => {
    const url = baseUrl + "/get-current-ads";
    return axiosClient.get(url, { params });
  },
  removeAdsByAdmin: (params) => {
    const url = baseUrl + "/admin-remove";
    return axiosClient.post(url, { params });
  },
  refundPointByAdmin: (params) => {
    const url = baseUrl + "/admin-refund";
    return axiosClient.post(url, { params });
  },
  stopAdsByAdmin: (params) => {
    const url = baseUrl + "/admin-stop";
    return axiosClient.post(url, { params });
  },
};

export default adsAPI;

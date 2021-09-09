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
};

export default adsAPI;

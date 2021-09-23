import axiosClient from "./axiosClient";

const baseS = process.env.REACT_APP_PRIVATE_SUBJECT_API;
const baseL = process.env.REACT_APP_PRIVATE_LESSON_API;

const privateAPI = {
  sentRequestSubject: (params) => {
    const url = baseS + "/send";
    return axiosClient.post(url, { params });
  },
  requestToMe: (params) => {
    const url = baseS + "/to-me";
    return axiosClient.get(url, { params });
  },
  approveRequest: (params) => {
    const url = baseS + "/author-approve";
    return axiosClient.post(url, { params });
  },
  denyRequest: (params) => {
    const url = baseS + "/author-denine";
    return axiosClient.post(url, { params });
  },
  sentRequestLesson: (params) => {
    const url = baseL + "/send";
    return axiosClient.post(url, { params });
  },
  requestToMe: (params) => {
    const url = baseL + "/to-me";
    return axiosClient.get(url, { params });
  },
  approveRequest: (params) => {
    const url = baseL + "/author-approve";
    return axiosClient.post(url, { params });
  },
  denyRequest: (params) => {
    const url = baseL + "/author-denine";
    return axiosClient.post(url, { params });
  },
};

export default privateAPI;

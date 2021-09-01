import axiosClient from "./axiosClient";

const baseS = "http://localhost:9191/request-subject";
const baseL = "http://localhost:9191/request-lession";

const requestAPI = {
  requestSubject: (params) => {
    const url = baseS + "/send";
    return axiosClient.post(url, { params });
  },

  requestSubjectToMe: (params) => {
    const url = baseS + "/to-me";
    return axiosClient.get(url, { params });
  },

  approveSubjectRequest: (params) => {
    const url = baseS + "/author-approve";
    return axiosClient.post(url, { params });
  },

  denySubjectRequest: (params) => {
    const url = baseS + "/author-denine";
    return axiosClient.post(url, { params });
  },

  requestSent: (params) => {
    const url = baseS + "/from-me";
    return axiosClient.get(url, { params });
  },

  // lesson

  requestLesson: (params) => {
    const url = baseL + "/send";
    return axiosClient.post(url, { params });
  },

  requestLessonToMe: (params) => {
    const url = baseL + "/to-me";
    return axiosClient.get(url, { params });
  },

  approveLessonRequest: (params) => {
    const url = baseL + "/author-approve";
    return axiosClient.post(url, { params });
  },

  denyLessonRequest: (params) => {
    const url = baseL + "/author-denine";
    return axiosClient.post(url, { params });
  },
};

export default requestAPI;

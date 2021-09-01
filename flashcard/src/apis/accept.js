import axiosClient from "./axiosClient";

const baseSubject = process.env.REACT_APP_ACCEPT_LESSON_API;
const baseLesson = process.env.REACT_APP_ACCEPT_SUBJECT_API;

const acceptAPI = {
  checkAcceptLesson: (params) => {
    const url = baseLesson + "/check-permission";
    return axiosClient.post(url, { params });
  },

  checkAcceptSubject: (params) => {
    const url = baseSubject + "/check-permission";
    return axiosClient.post(url, { params });
  },
};

export default acceptAPI;

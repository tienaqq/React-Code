import axiosClient from "./axiosClient";

const baseUrl = process.env.REACT_APP_LESSON_API;

const lessonAPI = {
  getLessonBySubId: (params) => {
    const url = baseUrl + "/get-lession-by-subjectId";
    return axiosClient.post(url, { params });
  },

  getPublicLessonBySubId: (params) => {
    const url = baseUrl + "/public-lession-by-subjectid";
    return axiosClient.post(url, { params });
  },

  getLessonByMe: () => {
    const url = baseUrl + "/get-lession-by-me";
    return axiosClient.get(url, {});
  },

  createLessonBySubId: (params) => {
    const url = baseUrl + "/create-lession-by-subjectid";
    return axiosClient.post(url, { params });
  },

  updateLessonById: (params) => {
    const url = baseUrl + "/update-lession-by-id";
    return axiosClient.put(url, { params });
  },

  getLessonByAccountId: (params) => {
    const url = baseUrl + "/get-lession-by-accountid";
    return axiosClient.post(url, { params });
  },

  getLessonByLessonId: (params) => {
    const url = baseUrl + "/get-lession-by-lessionid";
    return axiosClient.post(url, { params });
  },

  getAllLesson: (params) => {
    const url = baseUrl + "/get-all-lession";
    return axiosClient.post(url, { params });
  },

  removeLesson: (params) => {
    const url = baseUrl + "/delete";
    return axiosClient.post(url, { params });
  },
  increaseView: (params) => {
    const url = baseUrl + "/increase-view";
    return axiosClient.put(url, { params });
  },
};

export default lessonAPI;

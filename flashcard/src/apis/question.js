import axiosClient from "./axiosClient";

const baseUrl = process.env.REACT_APP_QUESTION_API;

const questionAPI = {
  addQuestionOption: (params) => {
    const url = baseUrl + "/add-question-opt";
    return axiosClient.post(url, { params });
  },

  getQuestionByFlashId: (params) => {
    const url = baseUrl + "/get-questions-by-flashcard";
    return axiosClient.post(url, { params });
  },

  removeQuestionById: (params) => {
    const url = baseUrl + "/delete";
    return axiosClient.post(url, { params });
  },

  getQuestionByListLessonId: (params) => {
    const url = baseUrl + "/arr-lessionid";
    return axiosClient.post(url, { params });
  },

  updateQuestion: (params) => {
    const url = baseUrl + "/update-question-otp";
    return axiosClient.put(url, { params });
  },
};

export default questionAPI;

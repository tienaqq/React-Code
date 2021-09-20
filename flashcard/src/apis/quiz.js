import axiosClient from "./axiosClient";

const baseUrl = process.env.REACT_APP_QUIZ_API;
const baseTest = process.env.REACT_APP_TEST_API;

const quizAPI = {
  addQuiz: (params) => {
    const url = baseUrl + "/create";
    return axiosClient.post(url, { params });
  },
  getQuizBySubId: (params) => {
    const url = baseUrl + "/get-by-subjectId";
    return axiosClient.post(url, { params });
  },
  getQuizDetail: (params) => {
    const url = baseUrl + "/questions-by-quiztestid";
    return axiosClient.post(url, { params });
  },
  getQuizToTake: (params) => {
    const url = baseUrl + "/take-quiz-questions";
    return axiosClient.post(url, { params });
  },
  checkQuizAccess: (params) => {
    const url = baseUrl + "/check-takequiz";
    return axiosClient.post(url, { params });
  },
  submitQuiz: (params) => {
    const url = baseTest + "/submit";
    return axiosClient.post(url, { params });
  },
  reviewDetail: (params) => {
    const url = baseTest + "/get-by-id";
    return axiosClient.post(url, { params });
  },
  getHistory: () => {
    const url = baseTest + "/get-by-me";
    return axiosClient.get(url);
  },
  removeQuiz: (params) => {
    const url = baseUrl + "/delete";
    return axiosClient.post(url, { params });
  },
};

export default quizAPI;

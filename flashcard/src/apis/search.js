import axiosClient from "./axiosClient";

const baseUrl = process.env.REACT_APP_SEARCH_API;

const searchAPI = {
  searchSubject: (params) => {
    const url = baseUrl + "/subject/find-name-des";
    return axiosClient.post(url, { params });
  },
  searchSubjectByLesson: (params) => {
    const url = baseUrl + "/subject/find-name-des-lession";
    return axiosClient.post(url, { params });
  },
  searchFlashcardReturnLesson: (params) => {
    const url = baseUrl + "/lession/find-by-ft-flashacrd";
    return axiosClient.post(url, { params });
  },
  searchQuestionReturnFlashcard: (params) => {
    const url = baseUrl + "/flashcard/find-by-ft-question";
    return axiosClient.post(url, { params });
  },
};

export default searchAPI;

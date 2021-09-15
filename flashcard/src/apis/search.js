import axiosClient from "./axiosClient";

const baseUrl = process.env.REACT_APP_SUBJECT_API;

const searchAPI = {
  searchSubject: (params) => {
    const url = baseUrl + "/find-name-des";
    return axiosClient.post(url, { params });
  },
  searchSubjectByFlashcard: (params) => {
    const url = baseUrl + "/find-name-flashcard";
    return axiosClient.post(url, { params });
  },
};

export default searchAPI;

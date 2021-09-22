import axiosClient from "./axiosClient";

const baseUrl = process.env.REACT_APP_GIFT_FEEDBACK_API;

const feedbackAPI = {
  sendFeedback: (params) => {
    const url = baseUrl + "/save";
    return axiosClient.post(url, { params });
  },
  getFeedbackAdmin: () => {
    const url = baseUrl + "/admin-view";
    return axiosClient.get(url);
  },
  getFeedbackDonor: () => {
    const url = baseUrl + "/donor-view";
    return axiosClient.get(url);
  },
};

export default feedbackAPI;

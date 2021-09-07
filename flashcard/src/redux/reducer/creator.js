import flashcardAPI from "apis/flashcard";
import lessonAPI from "apis/lesson";
import subjectAPI from "apis/subject";
import topicAPI from "apis/topic";

const initialState = {
  topics: [],
  subjects: [],
  lessons: [],
  flashcards: [],
  modalInfo: {
    title: "Add",
    isVisible: false,
  },
  isAddQuiz: false,
};

const SET_TOPICS = "SET_TOPICS";
const SET_SUBJECTS = "SET_SUBJECTS";
const SET_LESSONS = "SET_LESSONS";
const SET_FLASHCARDS = "SET_FLASHCARDS";

const SET_MODAL_INFO = "SET_MODAL_INFO";
const SET_MODAL_QUIZ = "SET_MODAL_QUIZ";

export const setTopics = (payload) => ({
  type: SET_TOPICS,
  payload: payload,
});
export const setSubjects = (payload) => ({
  type: SET_SUBJECTS,
  payload: payload,
});
export const setLessons = (payload) => ({
  type: SET_LESSONS,
  payload: payload,
});
export const setFlashcards = (payload) => ({
  type: SET_FLASHCARDS,
  payload: payload,
});

export const setModalInfo = (payload) => ({
  type: SET_MODAL_INFO,
  payload: payload,
});
export const setModalQuiz = (payload) => ({
  type: SET_MODAL_QUIZ,
  payload: payload,
});

export const fetchTopics = () => async (dispatch) => {
  const res = await topicAPI.getTopicByMe();
  dispatch(setTopics(res.topics));
};
export const fetchSubjects = () => async (dispatch) => {
  const res = await subjectAPI.getSubjectByMe();
  dispatch(setSubjects(res.listSubject));
};
export const fetchLessons = () => async (dispatch) => {
  const res = await lessonAPI.getLessonByMe();
  dispatch(setLessons(res.listLession));
};
export const fetchFlashcards = () => async (dispatch) => {
  const res = await flashcardAPI.getFlashcardByMe();
  dispatch(setFlashcards(res.listFlashcard));
};

const creatorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOPICS:
      return {
        ...state,
        topics: action.payload,
      };
    case SET_SUBJECTS:
      return {
        ...state,
        subjects: action.payload,
      };
    case SET_LESSONS:
      return {
        ...state,
        lessons: action.payload,
      };
    case SET_FLASHCARDS:
      return {
        ...state,
        flashcards: action.payload,
      };

    case SET_MODAL_INFO:
      return {
        ...state,
        modalInfo: action.payload,
      };
    case SET_MODAL_QUIZ:
      return {
        ...state,
        isAddQuiz: action.payload,
      };
    default:
      return state;
  }
};
export default creatorReducer;

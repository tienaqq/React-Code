import subjectAPI from "apis/subject";
import lessonAPI from "apis/lesson";
import flashcardAPI from "apis/flashcard";

const initialState = {
  subject: {},
  lessons: [],
  flashcards: [],
  flashcard: {},
  type: "subject",
  isShowModal: false,
};

const SET_SUBJECT = "SET_SUBJECT";
const SET_LESSONS = "SET_LESSONS";
const ADD_FLASHCARDS = "ADD_FLASHCARDS";
const SET_FLASHCARD_DETAIL = "SET_FLASHCARD_DETAIL";
const SET_TYPE_VIEW = "SET_TYPE_VIEW";
const SET_SHOW_MODAL = "SET_SHOW_MODAL";

export const setSubject = (items) => ({
  type: SET_SUBJECT,
  payload: items,
});
export const setLessons = (items) => ({
  type: SET_LESSONS,
  payload: items,
});
export const setFlashcards = (items) => ({
  type: ADD_FLASHCARDS,
  payload: items,
});
export const setFlashcardDetail = (payload) => ({
  type: SET_FLASHCARD_DETAIL,
  payload: payload,
});
export const setTypeView = (payload) => ({
  type: SET_TYPE_VIEW,
  payload: payload,
});
export const setShowModal = (payload) => ({
  type: SET_SHOW_MODAL,
  payload: payload,
});

export const fetchSubject = (id) => async (dispatch) => {
  const res = await subjectAPI.getSubjectById({ subjectId: id });
  dispatch(setSubject(res.subjectFound));
};
export const fetchLessons = (id) => async (dispatch) => {
  const res = await lessonAPI.getLessonBySubId({ subjectId: id });
  dispatch(setLessons(res.lession));
};
export const fetchFlashcards = (id) => async (dispatch) => {
  const res = await flashcardAPI.getFlashcardByLessonId({ lessionId: id });
  dispatch(setFlashcards(res.flashcard));
};

const latestReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SUBJECT:
      return {
        ...state,
        subject: action.payload,
      };

    case SET_LESSONS:
      return {
        ...state,
        lessons: action.payload,
      };

    case ADD_FLASHCARDS:
      return {
        ...state,
        flashcards: [...state.flashcards, action.payload],
      };

    case SET_FLASHCARD_DETAIL:
      return {
        ...state,
        flashcard: action.payload,
      };
    case SET_TYPE_VIEW:
      return {
        ...state,
        type: action.payload,
      };

    case SET_SHOW_MODAL:
      return {
        ...state,
        isShowModal: action.payload,
      };

    default:
      return state;
  }
};

export default latestReducer;

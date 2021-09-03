import subjectAPI from "apis/subject";
import lessonAPI from "apis/lesson";
import flashcardAPI from "apis/flashcard";

const initialState = {
  subject: {},
  lessons: [],
  flashcards: [],
  flashcard: {},
  isRequestLesson: false,
  lessonRequest: {},
  isRequestSubject: false,
  subjectRequest: {},
  listHistory: [],
};

const SET_SUBJECT = "SET_SUBJECT";
const SET_LESSONS = "SET_LESSONS";
const ADD_FLASHCARDS = "ADD_FLASHCARDS";
const SET_FLASHCARD_DETAIL = "SET_FLASHCARD_DETAIL";

const SET_SHOW_MODAL_REQUEST_LESSON = "SET_SHOW_MODAL_REQUEST_LESSON";
const SET_LESSON_REQUEST = "SET_LESSON_REQUEST";

const SET_SHOW_MODAL_REQUEST_SUBJECT = "SET_SHOW_MODAL_REQUEST_SUBJECT";
const SET_SUBJECT_REQUEST = "SET_SUBJECT_REQUEST";

const SET_LIST_HISTORY = "SET_LIST_HISTORY";

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
export const setShowModalLesson = (payload) => ({
  type: SET_SHOW_MODAL_REQUEST_LESSON,
  payload: payload,
});
export const setLessonRequest = (payload) => ({
  type: SET_LESSON_REQUEST,
  payload: payload,
});

export const setListHistory = (payload) => ({
  type: SET_LIST_HISTORY,
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

function filterDuplicate(arr) {
  const filtered = arr?.reduce((acc, current) => {
    const x = acc.find((item) => item.flashcardId === current.flashcardId);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);
  return filtered;
}

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
        flashcards: filterDuplicate(
          [...state.flashcards].concat(action.payload)
        ),
      };

    case SET_FLASHCARD_DETAIL:
      return {
        ...state,
        flashcard: action.payload,
      };

    case SET_SHOW_MODAL_REQUEST_LESSON:
      return {
        ...state,
        isRequestLesson: action.payload,
      };
    case SET_LESSON_REQUEST:
      return {
        ...state,
        lessonRequest: action.payload,
      };

    case SET_SHOW_MODAL_REQUEST_SUBJECT:
      return {
        ...state,
        isRequestSubject: action.payload,
      };
    case SET_SUBJECT_REQUEST:
      return {
        ...state,
        subjectRequest: action.payload,
      };

    case SET_LIST_HISTORY:
      return {
        ...state,
        listHistory: action.payload,
      };

    default:
      return state;
  }
};

export default latestReducer;

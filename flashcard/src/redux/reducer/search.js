import searchAPI from "apis/search";

const initialState = {
  subjects: [],
  lessons: [],
};

const SET_SEARCH_SUBJECTS = "SET_SEARCH_SUBJECTS";
const SET_SEARCH_LESSONS = "SET_SEARCH_LESSONS";

export const setSearchSubjects = (payload) => ({
  type: SET_SEARCH_SUBJECTS,
  payload: payload,
});
export const setSearchLessons = (payload) => ({
  type: SET_SEARCH_LESSONS,
  payload: payload,
});

export const fetchSearchSubjects = (string) => async (dispatch) => {
  const res = await searchAPI.searchSubject({
    searchValue: string,
  });
  dispatch(setSearchSubjects(res.searchResult));
};
export const fetchSearchLessons = (string) => async (dispatch) => {
  const res = await searchAPI.searchSubjectByLesson({
    searchValue: string,
  });
  dispatch(setSearchLessons(res.data));
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_SUBJECTS:
      return {
        ...state,
        subjects: action.payload,
      };

    case SET_SEARCH_LESSONS:
      return {
        ...state,
        lessons: action.payload,
      };
    default:
      return state;
  }
};

export default searchReducer;

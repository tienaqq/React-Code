import searchAPI from "apis/search";

const initialState = {
  subjects: [],
  subjectsBy: [],
};

const SET_SEARCH_SUBJECTS = "SET_SEARCH_SUBJECTS";
const SET_SEARCH_SUBJECTS_BY = "SET_SEARCH_SUBJECTS_BY";

export const setSearchSubjects = (payload) => ({
  type: SET_SEARCH_SUBJECTS,
  payload: payload,
});
export const setSearchSubjectsBy = (payload) => ({
  type: SET_SEARCH_SUBJECTS_BY,
  payload: payload,
});

export const fetchSearchSubjects = (string) => async (dispatch) => {
  const res = await searchAPI.searchSubject({
    searchValue: string,
  });
  dispatch(setSearchSubjects(res.searchResult));
};
export const fetchSearchSubjectsBy = (string) => async (dispatch) => {
  const res = await searchAPI.searchSubjectByFlashcard({
    searchValue: string,
  });
  dispatch(setSearchSubjectsBy(res.searchResult));
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_SUBJECTS:
      return {
        ...state,
        subjects: action.payload,
      };

    case SET_SEARCH_SUBJECTS_BY:
      return {
        ...state,
        subjectsBy: action.payload,
      };
    default:
      return state;
  }
};

export default searchReducer;

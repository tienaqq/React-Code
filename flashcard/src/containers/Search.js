import SearchPage from "layouts/Search";
import { connect } from "react-redux";
import {
  fetchSearchLessons,
  fetchSearchSubjects,
} from "../redux/reducer/search";

const mapStateToProps = (state) => {
  return {
    subjects: state.search.subjects,
    lessons: state.search.lessons,
  };
};

const mapActionToProps = (dispatch) => ({
  fetchSearchLessons: (string) => dispatch(fetchSearchLessons(string)),
  fetchSearchSubjects: (string) => dispatch(fetchSearchSubjects(string)),
});

export default connect(mapStateToProps, mapActionToProps)(SearchPage);

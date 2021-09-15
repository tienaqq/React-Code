import SearchPage from "layouts/Search";
import { connect } from "react-redux";
import {
  fetchSearchSubjects,
  fetchSearchSubjectsBy,
} from "../redux/reducer/search";

const mapStateToProps = (state) => {
  return {
    subjects: state.search.subjects,
    subjectsBy: state.search.subjectsBy,
  };
};

const mapActionToProps = (dispatch) => ({
  fetchSearchSubjects: (string) => dispatch(fetchSearchSubjects(string)),
  fetchSearchSubjectsBy: (string) => dispatch(fetchSearchSubjectsBy(string)),
});

export default connect(mapStateToProps, mapActionToProps)(SearchPage);

import Latest from "layouts/Latest";
import { connect } from "react-redux";
import {
  fetchFlashcards,
  fetchLessons,
  fetchSubject,
} from "../redux/reducer/latest";

const mapStateToProps = (state) => {
  return {
    subject: state.latest.subject,
    lessons: state.latest.lessons,
    flashcards: state.latest.flashcards,
  };
};

const mapActionToProps = (dispatch) => ({
  fetchSubject: (post) => dispatch(fetchSubject(post)),
  fetchLessons: (post) => dispatch(fetchLessons(post)),
  fetchFlashcards: (post) => dispatch(fetchFlashcards(post)),
});

export default connect(mapStateToProps, mapActionToProps)(Latest);

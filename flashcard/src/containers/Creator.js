import { connect } from "react-redux";
import Creator from "layouts/Creator";
import {
  fetchTopics,
  fetchSubjects,
  fetchLessons,
  fetchFlashcards,
} from "redux/reducer/creator";

const mapStateToProps = (state) => {
  return {
    topics: state.creator.topics,
    subjects: state.creator.subjects,
    lessons: state.creator.lessons,
    flashcards: state.creator.flashcards,
  };
};

const mapActionToProps = (dispatch) => ({
  fetchTopics: () => dispatch(fetchTopics()),
  fetchSubjects: () => dispatch(fetchSubjects()),
  fetchLessons: () => dispatch(fetchLessons()),
  fetchFlashcards: () => dispatch(fetchFlashcards()),
});

export default connect(mapStateToProps, mapActionToProps)(Creator);

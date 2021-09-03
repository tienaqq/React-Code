import { useEffect } from "react";
import LayoutWithoutFooter from "./LayoutWithoutFooter";

function Creator({
  fetchTopics,
  fetchSubjects,
  fetchLessons,
  fetchFlashcards,
  topics,
  subjects,
  lessons,
  flashcards,
}) {
  useEffect(() => {
    fetchTopics();
    fetchSubjects();
    fetchLessons();
    fetchFlashcards();
  }, []);

  const [tree, setTree] = useState([]);

  useEffect(() => {
    let node = topics?.map((topic) => ({
      title: topic.topicName,
      key: topic.topicId,
      child: subjects
        ?.map((subject) => {
          if (topic.topicId === subject.topicId) {
            return {
              title: subject.subjectName,
              key: subject.subjectId,
              child: lessons
                ?.map((lesson) => {
                  if (subject.subjectId === lesson.subjectId) {
                    return {
                      title: lesson.lessionName,
                      key: lesson.lessionId,
                      child: flashcards
                        ?.map((flashcard) => {
                          if (lesson.lessionId === flashcard.lessionId) {
                            return {
                              title: flashcard.flashcardName,
                              key: flashcard.flashcardId,
                              isLeaf: true,
                            };
                          }
                        })
                        .filter((flashcard) => flashcard !== undefined),
                    };
                  }
                })
                .filter((lesson) => lesson !== undefined),
            };
          }
        })
        .filter((subject) => subject !== undefined),
    }));
    setTree(node);
  }, [topics, subjects, lessons, flashcards]);

  return (
    <LayoutWithoutFooter>
      <div className="app__container">
        <div className="app__wrapper">
          <div className="app__menu"></div>
          <div className="app__content"></div>
        </div>
      </div>
    </LayoutWithoutFooter>
  );
}
export default Creator;

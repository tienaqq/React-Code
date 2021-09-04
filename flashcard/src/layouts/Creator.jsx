import { BranchesOutlined } from "@ant-design/icons";
import { Button, Divider, Tree } from "antd";
import FlashcardList from "components/Creator/Flashcards/Content";
import LessonList from "components/Creator/Lessons/Content";
import QuestionList from "components/Creator/Questions/Content";
import SubjectList from "components/Creator/Subjects/Content";
import TopicList from "components/Creator/Topics/Content";
import { useEffect, useState } from "react";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import LayoutWithoutFooter from "./LayoutWithoutFooter";
const { DirectoryTree } = Tree;

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

  const history = useHistory();
  let { path } = useRouteMatch();
  const [tree, setTree] = useState([]);

  useEffect(() => {
    let node = topics?.map((topic) => ({
      title: topic.topicName,
      key: "topic/" + topic.topicId,
      children: subjects
        ?.map((subject) => {
          if (topic.topicId === subject.topicId) {
            return {
              title: subject.subjectName,
              key: "subject/" + subject.subjectId,
              children: lessons
                ?.map((lesson) => {
                  if (subject.subjectId === lesson.subjectId) {
                    return {
                      title: lesson.lessionName,
                      key: "lesson/" + lesson.lessionId,
                      children: flashcards
                        ?.map((flashcard) => {
                          if (lesson.lessionId === flashcard.lessionId) {
                            return {
                              title: flashcard.flashcardName,
                              key: "flashcard/" + flashcard.flashcardId,
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

  const onSelect = (keys) => {
    history.push(`/creator/${keys[0]}`);
  };

  return (
    <LayoutWithoutFooter>
      <div className="app__container">
        <div className="app__wrapper">
          <div className="app__menu">
            <Divider orientation="left" plain>
              <Button
                icon={<BranchesOutlined />}
                type="text"
                style={{ padding: 0 }}
              >
                Navigation
              </Button>
            </Divider>
            <DirectoryTree
              defaultExpandAll
              onSelect={onSelect}
              treeData={tree}
              style={{ background: "#f0f0f0" }}
            />
          </div>
          <div className="app__content">
            <Switch>
              <Route exact path={path}>
                <TopicList />
              </Route>
              <Route path={`${path}/topic/:post`}>
                <SubjectList />
              </Route>
              <Route path={`${path}/subject/:post`}>
                <LessonList />
              </Route>
              <Route path={`${path}/lesson/:post`}>
                <FlashcardList />
              </Route>
              <Route path={`${path}/flashcard/:post`}>
                <QuestionList />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </LayoutWithoutFooter>
  );
}
export default Creator;

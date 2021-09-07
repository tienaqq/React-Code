import { Button, Divider, Empty } from "antd";
import processAPI from "apis/process";
import Notification from "components/Notification";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import renderHTML from "react-render-html";
import { useHistory, useParams } from "react-router";
import { fetchFlashcards } from "redux/reducer/latest";
import "./index.css";

function CourseFlashcard() {
  const { flashcard } = useSelector((state) => state.latest);
  const dispatch = useDispatch();

  const saveProcess = async () => {
    const code = flashcard.flashcardId;
    const response = await processAPI.saveProcess({ flashcardId: code });
    if (response.status === "Success") {
      Notification(
        "success",
        "Congratulations. You can start the next lesson."
      );
      dispatch(fetchFlashcards());
    }
  };

  return (
    <div className="detail__container">
      <Divider orientation="left" plain>
        Flashcard
      </Divider>
      <div className="detail__content">
        <div>{flashcard?.flashcardName}</div>
        <div>{renderHTML(flashcard ? flashcard?.flashcardContent : " ")}</div>
      </div>
      <Button
        type="primary"
        className="detail__button"
        onClick={() => saveProcess()}
      >
        Mark as completion
      </Button>
    </div>
  );
}
export default CourseFlashcard;

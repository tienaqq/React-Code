import { Button, Divider } from "antd";
import processAPI from "apis/process";
import Notification from "components/Notification";
import { useSelector } from "react-redux";
import renderHTML from "react-render-html";
import "./index.css";

function CourseFlashcard() {
  const { flashcard } = useSelector((state) => state.latest);

  const saveProcess = async () => {
    const code = flashcard.flashcardId;
    const response = await processAPI.saveProcess({ flashcardId: code });
    if (response.status === "Success") {
      Notification(
        "success",
        "Congratulations. You can start the next lesson."
      );
    }
  };

  return (
    <div className="detail__container">
      <Divider orientation="left" plain>
        Flashcard
      </Divider>
      <div className="detail__content">
        <div>{flashcard?.flashcardName}</div>
        <div>{renderHTML(flashcard ? flashcard.flashcardContent : "")}</div>
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

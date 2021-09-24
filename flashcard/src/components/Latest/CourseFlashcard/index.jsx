import { Button, Typography } from "antd";
import processAPI from "apis/process";
import Notification from "components/Notification";
import { useSelector } from "react-redux";
import renderHTML from "react-render-html";
import { returnDone } from "../latestFunction";
import "./index.css";

const { Text } = Typography;

function CourseFlashcard(props) {
  const { flashcard } = useSelector((state) => state.latest);

  const saveProcess = async () => {
    const code = flashcard.flashcardId;
    const response = await processAPI.saveProcess({ flashcardId: code });
    if (response.status === "Success") {
      Notification(
        "success",
        "Congratulations. You can start the next lesson."
      );
      props.refresh();
    }
  };

  return (
    <div className="detail__container">
      <div className="detail__content">
        <Text strong>
          {flashcard?.flashcardName}
          {returnDone(flashcard?.isComplete)}
        </Text>
        <br />
        <br />
        <div>{renderHTML(flashcard ? flashcard?.flashcardContent : " ")}</div>
      </div>
      {flashcard?.isComplete === false && (
        <Button
          type="primary"
          className="detail__button"
          onClick={() => saveProcess()}
        >
          Mark as completion
        </Button>
      )}
    </div>
  );
}
export default CourseFlashcard;

import { Button, Form, Input } from "antd";
import flashcardAPI from "apis/flashcard";
import TextEditor from "components/Creator/TextEditor";
import Notification from "components/Notification";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFlashcards, setModalInfo } from "redux/reducer/creator";

function FlashcardForm(props) {
  const { modalInfo } = useSelector((state) => state.creator);
  const [form] = Form.useForm();
  const { update, post } = props;
  const [content, setContent] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    form.resetFields();
    setContent(update?.flashcardContent);
  }, [update]);

  const onFinish = async (values) => {
    const params = {
      flashcardId: update?.flashcardId,
      flashcardName: values.flashcardName,
      flashcardContent: content,
      lessionId: post,
    };
    if (update) {
      const res = await flashcardAPI.updateFlashcardByFlashcardId(params);
      if (res.status === "Success") {
        Notification("success", res.message);
        dispatch(fetchFlashcards());
        dispatch(setModalInfo({ title: "Add", isVisible: false }));
      } else {
        Notification("error", res.message);
      }
    } else {
      const res = await flashcardAPI.addFlashcardByLessonId(params);
      if (res.status === "Success") {
        Notification("success", res.message);
        dispatch(fetchFlashcards());
        dispatch(setModalInfo({ title: "Add", isVisible: false }));
      } else {
        Notification("error", res.message);
      }
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      name="update"
      initialValues={update ? update : null}
      onFinish={onFinish}
    >
      <Form.Item
        name="flashcardName"
        label="Flashcard name:"
        rules={[
          {
            required: true,
            message: "Flashcard name is required",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Flashcard content:"
        rules={[
          {
            required: true,
            message: "Flashcard content is required",
          },
        ]}
      >
        <TextEditor content={content} setContent={setContent} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {modalInfo?.title}
        </Button>
        <Button
          style={{ margin: "0 8px" }}
          onClick={() => {
            form.resetFields();
          }}
        >
          Reset
        </Button>
      </Form.Item>
    </Form>
  );
}
export default FlashcardForm;

import { Button, Form, Input, Radio } from "antd";
import lessonAPI from "apis/lesson";
import Notification from "components/Notification";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setModalInfo, fetchLessons } from "redux/reducer/creator";

const { TextArea } = Input;

function LessonForm(props) {
  const { update, post } = props;
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
  }, [update]);

  const onSubmit = async (values) => {
    if (update) {
      Object.assign(values, { lessionId: update.lessionId });
      const res = await lessonAPI.updateLessonById(values);
      if (res.status === "Success") {
        Notification("success", res.message);
        dispatch(fetchLessons());
        dispatch(setModalInfo({ title: "Add", isVisibleModal: false }));
      } else {
        Notification("error", res.message);
      }
    } else {
      let params = Object.assign({ subjectId: post }, values);
      const res = await lessonAPI.createLessonBySubId(params);
      if (res.status === "Success") {
        Notification("success", res.message);
        dispatch(fetchLessons());
        dispatch(setModalInfo({ title: "Add", isVisibleModal: false }));
      } else {
        Notification("error", res.message);
      }
    }
  };
  return (
    <Form
      layout="vertical"
      form={form}
      name="topic"
      onFinish={onSubmit}
      autoComplete="off"
      initialValues={update}
    >
      <Form.Item
        name="lessionName"
        label="Lesson name:"
        rules={[
          {
            required: true,
            message: "Topic name is required",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="lessionDescription"
        label="Lesson description:"
        rules={[
          {
            required: true,
            message: "Description is required",
          },
        ]}
      >
        <TextArea showCount maxLength={500} />
      </Form.Item>
      <Form.Item name="statusId" label="Status:" initialValue={1}>
        <Radio.Group>
          <Radio value={1}>Public</Radio>
          <Radio value={2}>Private</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {update ? "Update Lesson" : "Add Lesson"}
        </Button>
        <Button
          style={{ margin: "0 8px" }}
          onClick={() => {
            form.resetFields();
          }}
        >
          Clear
        </Button>
      </Form.Item>
    </Form>
  );
}
export default LessonForm;
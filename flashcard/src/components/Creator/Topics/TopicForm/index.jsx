import { Button, Form, Input } from "antd";
import topicAPI from "apis/topic";
import Notification from "components/Notification";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopics, setModalInfo } from "redux/reducer/creator";

const { TextArea } = Input;

function TopicForm(props) {
  const { modalInfo } = useSelector((state) => state.creator);
  const dispatch = useDispatch();
  const { update } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
  }, [update]);

  const onSubmit = async (values) => {
    if (update) {
      const res = await topicAPI.updateTopicById(
        Object.assign(values, { topicId: update?.topicId })
      );
      if ((res.status = "Success")) {
        Notification("success", res.message);
        dispatch(fetchTopics());
        dispatch(setModalInfo({ title: "Add", isVisible: false }));
        return;
      }
      Notification("error", res.message);
    } else {
      const res = await topicAPI.addNewTopic(values);
      if ((res.status = "Success")) {
        Notification("success", res.message);
        form.resetFields();
        dispatch(fetchTopics());
        dispatch(setModalInfo({ title: "Add", isVisible: false }));
        return;
      }
      Notification("error", res.message);
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
        name="topicName"
        label="Topic name:"
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
        name="topicDescription"
        label="Topic description:"
        rules={[
          {
            required: true,
            message: "Description is required",
          },
        ]}
      >
        <TextArea showCount maxLength={500} />
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
          Clear
        </Button>
      </Form.Item>
    </Form>
  );
}

export default TopicForm;

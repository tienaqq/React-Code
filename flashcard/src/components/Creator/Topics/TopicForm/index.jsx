import { Button, Form, Input, Radio } from "antd";
import topicAPI from "apis/topic";
import Notification from "components/Notification";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopics, setModalInfo } from "redux/reducer/creator";
import PropTypes from "prop-types";

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
      const response = await topicAPI.updateTopicById(values);
      if ((response.status = "Success")) {
        Notification("success", response.message);
        dispatch(fetchTopics());
        dispatch(setModalInfo({ title: "Add", isVisible: false }));
      } else {
        Notification("error", response.message);
      }
    } else {
      const response = await topicAPI.addNewTopic(values);
      if ((response.status = "Success")) {
        Notification("success", response.message);
        dispatch(fetchTopics());
        dispatch(setModalInfo({ title: "Add", isVisible: false }));
      } else {
        Notification("error", response.message);
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
      <Form.Item hidden name="statusId" label="Status">
        <Radio.Group defaultValue={1}>
          <Radio value={1}>Public</Radio>
          <Radio value={2}>Private</Radio>
        </Radio.Group>
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

TopicForm.protoTypes = {
  update: Object,
};

export default TopicForm;

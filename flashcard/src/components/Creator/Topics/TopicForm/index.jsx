import { Button, Form, Input, Radio } from "antd";
import topicAPI from "apis/topic";
import Notification from "components/Notification";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function TopicForm(props) {
  const { update } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields;
  }, []);

  const onSubmit = async (values) => {
    if (update) {
      const response = await topicAPI.updateTopicById(values);
      if ((response.status = "Success")) {
        Notification("success", response.message);
      } else {
        Notification("error", response.message);
      }
    } else {
      const response = await topicAPI.addNewTopic(values);
      if ((response.status = "Success")) {
        Notification("success", response.message);
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
      <Form.Item hidden name="statusId" label="Status:" initialValue={1}>
        <Radio.Group>
          <Radio value={1}>Public</Radio>
          <Radio value={2}>Private</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {update ? "Update Topic" : "Add Topic"}
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

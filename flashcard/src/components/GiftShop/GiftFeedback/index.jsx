import { Button, Form, Input, Modal, Rate } from "antd";
import feedbackAPI from "apis/feedback";
import Notification from "components/Notification";

const { TextArea } = Input;

function GiftFeedback(props) {
  const [form] = Form.useForm();
  const { isModalVisible, setIsModalVisible, id, getHistory } = props;

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFill = () => {
    form.setFieldsValue({
      point: 1,
      content:
        "Gifts cannot be used.\n" +
        "Gifts not as described.\n" +
        "The payment unit does not accept the gift code.\n",
    });
  };

  const onFinish = async (values) => {
    const params = Object.assign(values, { donorServiceRelationAccountId: id });
    const res = await feedbackAPI.sendFeedback(params);
    if (res.status === "Success") {
      Notification("success", res.message);
      form.resetFields();
      handleCancel();
      getHistory();
    } else {
      Notification("error", res.message);
    }
  };

  return (
    <Modal
      title="Feedback Gift"
      visible={isModalVisible}
      onCancel={handleCancel}
      width={700}
      footer={false}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        name="validate_other"
      >
        <Form.Item
          name="point"
          label="Point"
          rules={[{ required: true, message: "Point is require!" }]}
        >
          <Rate />
        </Form.Item>
        <Form.Item
          label="Opinion"
          name="content"
          rules={[{ required: true, message: "Opinion is require!" }]}
        >
          <TextArea rows={3} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button
            type="primary"
            style={{ marginLeft: "8px" }}
            onClick={() => onFill()}
          >
            Fill Report
          </Button>
          <Button
            htmlType="button"
            onClick={() => form.resetFields()}
            style={{ marginLeft: "8px" }}
          >
            Reset
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
export default GiftFeedback;

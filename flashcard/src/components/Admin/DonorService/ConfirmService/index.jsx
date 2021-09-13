import { Modal, Form, Input, Button } from "antd";
import donorAPI from "apis/donor";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowModal } from "redux/reducer/admin";
import Notification from "components/Notification";

function ConfirmService(props) {
  const { isShowModal } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { element } = props;

  useEffect(() => {
    form.setFieldsValue({
      serviceId: element.id,
      serviceName: element.serviceName,
      quantity: element.quantity,
    });
  }, [element]);

  const handleCancel = () => {
    dispatch(setShowModal(false));
  };

  const confirm = async (values) => {
    const res = await donorAPI.confirmDonorService(values);
    if (res.status === "Success") {
      Notification("success", res.message);
      handleCancel();
    } else {
      Notification("error", res.message);
    }
  };

  return (
    <Modal
      title="Confirm Service"
      visible={isShowModal}
      onCancel={handleCancel}
      width={600}
      footer={false}
    >
      <Form name="basic" form={form} autoComplete="off" layout="vertical">
        <Form.Item label="Service Name" name="serviceName">
          <Input disabled />
        </Form.Item>
        <Form.Item hidden name="serviceId">
          <Input />
        </Form.Item>
        <Form.Item
          label="Quantity"
          name="quantity"
          tooltip="Update exact quantity."
          rules={[{ required: true, message: "Quantity is required" }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
export default ConfirmService;

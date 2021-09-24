import { Button, Form, Input, Modal } from "antd";
import adminAPI from "apis/admin";
import Notification from "components/Notification";
import Moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, setShowModal } from "redux/reducer/admin";

const { TextArea } = Input;

function BanModalFeedback(props) {
  const [form] = Form.useForm();
  const { isShowModal } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const { banItem } = props;

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue({
      email: banItem?.donorId,
    });
  }, [banItem]);

  const handleCancel = () => {
    dispatch(setShowModal(false));
  };

  const lock = async (values) => {
    const params = {
      email: values.email,
      adminDescription: `${Moment().toDate()} - ${values.description}`,
    };
    const res = await adminAPI.banAccount(params);
    if (res.status === "Success") {
      Notification("success", res.message);
      dispatch(fetchUser());
      handleCancel();
    } else {
      Notification("error", res.message);
    }
  };

  return (
    <Modal
      title="Ban Account"
      visible={isShowModal}
      onCancel={handleCancel}
      footer={false}
      width={600}
    >
      <Form
        onFinish={lock}
        initialValues={banItem}
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 18,
        }}
        name="basic"
        form={form}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Email is required!",
            },
          ]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Description is required!",
            },
          ]}
        >
          <TextArea rows={2} />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 6,
            span: 18,
          }}
        >
          <Button type="primary" htmlType="submit" style={{ marginRight: 15 }}>
            Submit
          </Button>
          <Button onClick={() => form.resetFields()}>Clear</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
export default BanModalFeedback;

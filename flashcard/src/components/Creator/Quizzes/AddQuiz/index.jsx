import React, { useState } from "react";
import { Modal, Button, Steps, Space, Form, Input, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setModalQuiz } from "redux/reducer/creator";
import "./index.css";

const { Step } = Steps;

function AddQuiz() {
  const [form] = Form.useForm();
  const { isAddQuiz } = useSelector((state) => state.creator);
  const dispatch = useDispatch();
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handleCancel = () => {
    dispatch(setModalQuiz(false));
  };
  return (
    <Modal
      title="Add Quiz"
      visible={isAddQuiz}
      onCancel={handleCancel}
      width={1000}
      footer={false}
    >
      <Steps size="small" current={current}>
        <Step title="Step 1" description="Set name and choose lessons." />
        <Step title="Step 2" description="Choose questions." />
        <Step title="Step 3" description="Review and submit." />
      </Steps>
      <div className="step__container">
        {current === 0 && (
          <div className="step__wrapper">
            <Form layout="vertical" name="normal_quiz" form={form}>
              <Form.Item
                name="testName"
                label="Quiz name:"
                rules={[{ required: true, message: "Name is required!" }]}
              >
                <Input size="large" />
              </Form.Item>
              <Form.Item
                name="lessionArr"
                label="Lesson"
                rules={[
                  {
                    required: true,
                    message: "Lesson is required!",
                  },
                ]}
              >
                <Select size="large" mode="multiple"></Select>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  style={{ marginRight: 15 }}
                  htmlType="submit"
                >
                  Next step
                </Button>
                <Button htmlType="button" onClick={() => form.resetFields()}>
                  Reset
                </Button>
              </Form.Item>
            </Form>
          </div>
        )}
        {current === 1 && <div className="step__wrapper"></div>}
        {current === 2 && <div className="step__wrapper"></div>}
      </div>
    </Modal>
  );
}
export default AddQuiz;

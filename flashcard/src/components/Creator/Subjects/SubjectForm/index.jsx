import { Button, Form, Input, Radio } from "antd";
import subjectAPI from "apis/subject";
import Notification from "components/Notification";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModalInfo, fetchSubjects } from "redux/reducer/creator";

const { TextArea } = Input;

function SubjectForm(props) {
  const { modalInfo } = useSelector((state) => state.creator);
  const { update, post } = props;
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
  }, [update]);

  const onSubmit = async (values) => {
    if (update) {
      Object.assign(values, { subjectId: update.subjectId });
      const res = await subjectAPI.updateSubjectById(values);
      if (res.status === "Success") {
        Notification("success", res.message);
        dispatch(fetchSubjects());
        dispatch(setModalInfo({ title: "Add", isVisibleModal: false }));
      } else {
        Notification("error", res.message);
      }
    } else {
      let params = Object.assign({ topicId: post }, values);
      const res = await subjectAPI.addSubjectByTopicId(params);
      if (res.status === "Success") {
        Notification("success", res.message);
        dispatch(fetchSubjects());
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
        name="subjectName"
        label="Subject name:"
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
        name="subjectDescription"
        label="Subject description:"
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
export default SubjectForm;
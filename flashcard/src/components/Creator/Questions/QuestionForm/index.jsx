import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Form, Input, Row } from "antd";
import questionAPI from "apis/question";
import TextEditor from "components/Creator/TextEditor";
import Notification from "components/Notification";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModalInfo } from "redux/reducer/creator";

const { TextArea } = Input;

function QuestionForm(props) {
  const { modalInfo } = useSelector((state) => state.creator);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { update, post } = props;
  const [content, setContent] = useState("");

  useEffect(() => {
    form.resetFields();
    if (update) {
      setContent(update?.question.questionContent);
      const options = [];
      update?.option.map((opt) => {
        if (opt.isCorrect.data[0] === 1) {
          const newOption = {
            optionId: opt.optionId,
            optionContent: opt.optionContent,
            isCorrect: true,
          };
          options.push(newOption);
        } else {
          const newOption = {
            optionId: opt.optionId,
            optionContent: opt.optionContent,
            isCorrect: false,
          };
          options.push(newOption);
        }
      });

      form.setFieldsValue({
        options: options,
      });
    } else {
      setContent("");
    }
  }, [modalInfo]);

  const getOptions = (values) => {
    const optionsUpdated = values.options;
    optionsUpdated.map((item) => {
      if (item.isCorrect === true) {
        item.isCorrect = 1;
      } else {
        item.isCorrect = 0;
      }
      values.options = optionsUpdated;
    });
    return values.options;
  };

  const updateQuestion = async (values) => {
    const options = getOptions(values);
    let newOption = [];
    let optionList = [];
    options.map((item) => {
      if (item.optionId === undefined) {
        newOption.push(item);
      } else {
        optionList.push(item);
      }
    });
    const params = {
      question: {
        questionId: update.question.questionId,
        questionContent: content ? content : update.question.questionContent,
      },
      options: optionList,
      newOption: newOption,
    };
    const response = await questionAPI.updateQuestion(params);
    if (response.status === "Success") {
      Notification("success", response.message);
      dispatch(setModalInfo({ title: "Add", isVisible: false }));
      props.getData();
    } else {
      Notification("error", response.message);
    }
  };

  const add = async (values) => {
    const options = getOptions(values);
    const params = {
      question: {
        questionContent: content ? content : update.question.questionContent,
        flashcardId: parseInt(post),
      },
      options: options,
    };
    const response = await questionAPI.addQuestionOption(params);
    if (response.status === "Success") {
      Notification("success", response.message);
      form.resetFields();
      dispatch(setModalInfo({ title: "Add", isVisible: false }));
      props.getData();
    } else {
      Notification("error", response.message);
    }
  };

  const onFinish = (values) => {
    if (update) {
      updateQuestion(values);
    } else {
      add(values);
    }
  };

  return (
    <Form name="question" onFinish={onFinish} form={form} layout="vertical">
      <Form.Item
        label="Question:"
        rules={[
          {
            required: true,
            message: "Question is required",
          },
        ]}
      >
        <TextEditor content={content} setContent={setContent} />
      </Form.Item>

      <Form.List
        name="options"
        rules={[
          {
            validator: async (_, names) => {
              if (!names || names.length < 2) {
                return Promise.reject(new Error("At least 2 options"));
              }
            },
          },
        ]}
      >
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item
                label={index === 0 ? "Options" : ""}
                tooltip="Enter the answer and select the correct answer."
                required={false}
                key={field.key}
              >
                <Row gutter={8}>
                  <Col span={22}>
                    <Form.Item
                      {...field}
                      name={[field.name, "optionContent"]}
                      validateTrigger={["onChange", "onBlur"]}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: "Please input option or delete this field.",
                        },
                      ]}
                      noStyle
                    >
                      <TextArea placeholder="Input option" />
                    </Form.Item>
                  </Col>

                  <Col span={1}>
                    <Form.Item
                      {...field}
                      name={[field.name, "isCorrect"]}
                      valuePropName="checked"
                      noStyle
                    >
                      <Checkbox className="dynamic-checkbox" />
                    </Form.Item>
                  </Col>

                  <Col span={1}>
                    <Form.Item noStyle>
                      {fields.length > 1 ? (
                        <DeleteOutlined
                          className="dynamic-delete-button"
                          onClick={() => remove(field.name)}
                        />
                      ) : null}
                    </Form.Item>
                  </Col>
                </Row>
              </Form.Item>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                icon={<PlusOutlined />}
              >
                Add option
              </Button>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>
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
export default QuestionForm;

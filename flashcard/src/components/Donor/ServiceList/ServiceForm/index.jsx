import {
  MinusCircleOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Modal, Select, Space } from "antd";
import donorAPI from "apis/donor";
import Notification from "components/Notification";
import Moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices, setShowModal } from "redux/reducer/donor";

const { Option } = Select;
const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 16, offset: 6 },
  },
};

function ServiceForm(props) {
  const dispatch = useDispatch();
  const { isShow } = useSelector((state) => state.donor);

  const [form] = Form.useForm();
  const [types, setTypes] = useState([]);
  const [hidden, setHidden] = useState(false);
  const [start, setStart] = useState(null);

  useEffect(() => {
    const getServiceType = async () => {
      const res = await donorAPI.getServiceType();
      setTypes(res.types);
    };
    getServiceType();
  }, []);

  function onChange(value) {
    if (value === 1 || value === 2) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  }

  const format = (values) => {
    if (!values) return [];
    const array = [];
    values.map((item) => {
      array.push({
        serviceContent: item.serviceContent,
        startDate: Moment(item.startDate).format("YYYY-MM-DD"),
        endDate: Moment(item.endDate).format("YYYY-MM-DD"),
      });
    });
    return array;
  };

  const onReset = () => {
    form.resetFields();
  };

  function disabledDate(current) {
    return Moment().add(-1, "days") >= current;
  }

  function disabledDate2(current) {
    return current <= Moment(start).add(1, "days");
  }

  const onFinish = async (values) => {
    const params = {
      serviceTypeId: values.serviceTypeId,
      serviceName: values.serviceName,
      serviceInformation: values.serviceInformation,
      quantity: parseInt(hidden ? values.detail?.length : values.quantity),
      detail: format(values?.detail),
    };
    const res = await donorAPI.addService(params);
    if (res.status === "Success") {
      Notification("success", res.message);
      dispatch(fetchServices());
      onReset();
      handleCancel();
    } else {
      Notification("error", res.message);
    }
  };

  const handleOk = () => {
    dispatch(setShowModal(false));
  };

  const handleCancel = () => {
    dispatch(setShowModal(false));
  };

  return (
    <Modal
      title="Add Service"
      visible={isShow}
      onOk={handleOk}
      onCancel={handleCancel}
      width={800}
    >
      <Form
        {...layout}
        name="control-hooks"
        onFinish={onFinish}
        autoComplete="off"
        form={form}
      >
        <Form.Item
          name="serviceName"
          label="Name"
          rules={[
            {
              required: true,
              message: "Name is required",
            },
          ]}
        >
          <Input placeholder="Name of service." />
        </Form.Item>
        <Form.Item
          name="serviceInformation"
          label="Information"
          rules={[
            {
              required: true,
              message: "Information is required",
            },
          ]}
        >
          <Input placeholder="Information of service." />
        </Form.Item>
        <Form.Item
          name="serviceTypeId"
          label="Type"
          rules={[
            {
              required: true,
              message: "Service Type is required",
            },
          ]}
        >
          <Select placeholder="Type of service." allowClear onChange={onChange}>
            {types?.map((item) => {
              return (
                <Option key={item.id} value={item.id}>
                  {item.typeName}
                </Option>
              );
            })}
          </Select>
        </Form.Item>

        {!hidden && (
          <Form.Item
            name="quantity"
            label="Quantity"
            hidden={hidden}
            rules={[
              {
                required: true,
                message: "Quantity is required",
              },
            ]}
          >
            <Input type="number" min={0} placeholder="Quantity of gift." />
          </Form.Item>
        )}
        {hidden && (
          <Form.List
            name="detail"
            rules={[
              {
                validator: async (_, detail) => {
                  if (!detail || detail.length < 1) {
                    return Promise.reject(new Error("At least 1 gift."));
                  }
                },
              },
            ]}
          >
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map(({ key, name, fieldKey }, index) => (
                  <Form.Item
                    {...(index === 0 ? layout : tailLayout)}
                    required={false}
                    key={key}
                    label={index === 0 ? "Gift" : ""}
                  >
                    <Space
                      style={{ display: "flex", marginBottom: 8 }}
                      align="baseline"
                    >
                      <Form.Item
                        noStyle
                        name={[name, "serviceContent"]}
                        fieldKey={[fieldKey, "Content"]}
                        rules={[
                          { required: true, message: "Content is required" },
                        ]}
                      >
                        <Input placeholder="Content" />
                      </Form.Item>
                      <Form.Item
                        noStyle
                        name={[name, "startDate"]}
                        fieldKey={[fieldKey, "Start"]}
                        rules={[
                          { required: true, message: "Missing date of start" },
                        ]}
                      >
                        <DatePicker
                          format="YYYY-MM-DD"
                          placeholder="Time start"
                          disabledDate={disabledDate}
                          onChange={(dateString) => setStart(dateString)}
                        />
                      </Form.Item>
                      <Form.Item
                        noStyle
                        name={[name, "endDate"]}
                        fieldKey={[fieldKey, "End"]}
                        rules={[
                          { required: true, message: "Missing date of end" },
                        ]}
                      >
                        <DatePicker
                          format="YYYY-MM-DD"
                          placeholder="Time end"
                          disabled={start ? false : true}
                          disabledDate={disabledDate2}
                        />
                      </Form.Item>
                      <MinusCircleOutlined
                        className="dynamic-delete-button"
                        onClick={() => remove(name)}
                      />
                    </Space>
                  </Form.Item>
                ))}
                <Form.Item {...tailLayout}>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add gift
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>
        )}

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button icon={<QuestionCircleOutlined />} type="text"></Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
export default ServiceForm;

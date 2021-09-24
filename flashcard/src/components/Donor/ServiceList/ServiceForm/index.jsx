import {
  FileImageOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Select,
  Space,
  Upload,
} from "antd";
import donorAPI from "apis/donor";
import Notification from "components/Notification";
import Compressor from "compressorjs";
import { getChangeInfo } from "helpers/me";
import Moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices, setShowModal } from "redux/reducer/donor";
import firebase from "services/firebase";
import { v4 as uuidv4 } from "uuid";

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

  const { update } = props;
  const [url, setUrl] = useState(null);

  useEffect(() => {
    form.resetFields();
    if (update) {
      form.setFieldsValue({
        serviceName: update?.name,
        serviceInformation: update?.desc,
        serviceTypeId: update?.type.id,
        quantity: update?.quantity,
      });
    }
  }, [update]);

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
    if (update) {
      updateS(values);
    } else {
      addS(values);
    }
  };

  const addS = async (values) => {
    const params = {
      serviceTypeId: values.serviceTypeId,
      serviceName: values.serviceName,
      serviceInformation: values.serviceInformation,
      quantity: parseInt(hidden ? values.detail?.length : values.quantity),
      detail: format(values?.detail),
      image_link: url,
    };
    const res = await donorAPI.addService(params);
    if (res.status === "Success") {
      Notification("success", res.message);
      dispatch(fetchServices());
      onReset();
      handleCancel();
      getChangeInfo();
    } else {
      Notification("error", res.message);
    }
  };

  const updateS = async (values) => {
    const params = {
      serviceId: update.key,
      serviceName: values.serviceInformation,
      serviceInformation: values.serviceInformation,
      image_link: url ? url : update?.image_link,
    };
    const res = await donorAPI.updateService(params);
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

  const fileCompress = (file) => {
    return new Promise((resolve, reject) => {
      new Compressor(file, {
        file: "File",
        quality: 0.5,
        maxWidth: 288,
        maxHeight: 120,
        success(file) {
          return resolve({
            success: true,
            file: file,
          });
        },
        error(err) {
          return resolve({
            success: false,
            message: err.message,
          });
        },
      });
    });
  };

  const uploader = {
    action: "",
    name: "file",
    multiple: false,
    defaultFileList: update
      ? [
          {
            uid: "-1",
            name: "image.png",
            status: "done",
            url: update?.image_link,
          },
        ]
      : [],
    beforeUpload: (file) => {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        message.error("You can only upload JPG/PNG file!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error("Image must smaller than 2MB!");
      }
      return isJpgOrPng && isLt2M ? true : Upload.LIST_IGNORE;
    },
    customRequest(e) {
      setTimeout(() => {
        e.onSuccess();
      }, 2000);
    },
    onChange: async (info) => {
      const compressState = await fileCompress(info.fileList[0]?.originFileObj);
      if (compressState.success) {
        let fileName = uuidv4();
        let storage = firebase.storage().ref();
        storage
          .child(fileName)
          .put(compressState.file)
          .then((snapshot) => {
            return snapshot.ref.getDownloadURL();
          })
          .then((url) => {
            setUrl(url);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    progress: {
      strokeColor: {
        "0%": "#108ee9",
        "100%": "#87d068",
      },
      strokeWidth: 3,
      format: (percent) => `${parseFloat(percent.toFixed(2))}%`,
    },
  };

  return (
    <Modal
      title={update ? "Update Service" : "Add Service"}
      visible={isShow}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={false}
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
          label="Image"
          name="image_link"
          rules={[
            {
              required: !update ? true : false,
              message: "Image is required",
            },
          ]}
        >
          <Upload
            {...uploader}
            maxCount={1}
            name="logo"
            listType="picture"
            required
          >
            <Button icon={<FileImageOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>

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
          <Select
            disabled={update ? true : false}
            placeholder="Type of service."
            allowClear
            onChange={onChange}
          >
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
            <Input
              disabled={update ? true : false}
              type="number"
              min={0}
              placeholder="Quantity of gift."
            />
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
                    disabled={update ? true : false}
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
            {update ? "Update Service" : "Add Service"}
          </Button>
          <Button icon={<QuestionCircleOutlined />} type="text"></Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
export default ServiceForm;

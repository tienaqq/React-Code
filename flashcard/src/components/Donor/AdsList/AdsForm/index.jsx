import { FileImageOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Upload, DatePicker, message } from "antd";
import Moment from "moment";
import Compressor from "compressorjs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import firebase from "services/firebase";
import { v4 as uuidv4 } from "uuid";
import adsAPI from "apis/ads";
import Notification from "components/Notification";
import { fetchAds, setShowModal } from "redux/reducer/donor";

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 18,
  },
};
const tailLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 18, offset: 4 },
  },
};

const { RangePicker } = DatePicker;
const dateFormat = "YYYY-MM-DD h:mm:ss";

function AdsForm(props) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { isShow } = useSelector((state) => state.donor);
  const [url, setUrl] = useState(null);
  const { update } = props;

  useEffect(() => {
    form.resetFields();
    if (!update) return;
    form.setFieldsValue({
      advertiseId: update?.id,
      title: update?.title,
      content: update?.content,
      date: [
        Moment(update?.startDate, dateFormat),
        Moment(update?.endDate, dateFormat),
      ],
      target_url: update?.target_url,
      expected_using_point: update?.expected_using_point,
    });
  }, [update]);

  const handleCancel = () => {
    dispatch(setShowModal(false));
  };

  const add = async (params) => {
    const res = await adsAPI.addAds(params);
    if (res.status === "Success") {
      Notification("success", res.message);
      dispatch(fetchAds());
      form.resetFields();
      handleCancel();
    } else {
      Notification("error", res.message);
    }
  };

  const up = async (params) => {
    const res = await adsAPI.updateAds(params);
    if (res.status === "Success") {
      Notification("success", res.message);
      dispatch(fetchAds());
      form.resetFields();
      handleCancel();
    } else {
      Notification("error", res.message);
    }
  };

  const onFinish = async (values) => {
    const params = {
      advertiseId: values.advertiseId,
      title: values.title,
      content: values.content,
      imageLink: url ? url : update.imageLink,
      startDate: Moment(values.date[0]).format("YYYY-MM-DD h:mm:ss"),
      endDate: Moment(values.date[1]).format("YYYY-MM-DD h:mm:ss"),
      target_url: values.target_url,
      expected_using_point: values.expected_using_point,
    };
    if (update) {
      up(params);
    } else {
      add(params);
    }
  };

  const fileCompress = (file) => {
    return new Promise((resolve, reject) => {
      new Compressor(file, {
        file: "File",
        quality: 0.5,
        maxWidth: 900,
        maxHeight: 900,
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
            url: update?.imageLink,
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

  function disabledDate(current) {
    return Moment().add(-1, "days") >= current;
  }
  return (
    <Modal
      title="Advertisement Form"
      visible={isShow}
      onCancel={handleCancel}
      width={900}
      footer={false}
    >
      <Form
        {...layout}
        name="control-hooks"
        onFinish={onFinish}
        autoComplete="off"
        form={form}
      >
        <Form.Item
          label="Banner"
          name="imageLink"
          rules={[
            {
              required: !update ? true : false,
              message: "Banner is required",
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

        <Form.Item hidden name="advertiseId" label="AdvertiseId">
          <Input />
        </Form.Item>

        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: "Title is required",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="content"
          label="Description"
          rules={[
            {
              required: true,
              message: "Information is required",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Date"
          name="date"
          rules={[
            {
              required: true,
              message: "Date is required",
            },
          ]}
        >
          <RangePicker
            disabledDate={disabledDate}
            showTime
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Form.Item label="Config" style={{ marginBottom: 0 }}>
          <Form.Item
            name="expected_using_point"
            rules={[{ required: true, message: "Point is required" }]}
            style={{ display: "inline-block", width: "calc(30% - 8px)" }}
          >
            <Input type="number" min="100" placeholder="Point to spend" />
          </Form.Item>
          <Form.Item
            name="target_url"
            rules={[{ required: true, message: "Redirect url is required" }]}
            style={{
              display: "inline-block",
              width: "calc(70%)",
              marginLeft: "8px",
            }}
          >
            <Input placeholder="Redirect link" />
          </Form.Item>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
export default AdsForm;

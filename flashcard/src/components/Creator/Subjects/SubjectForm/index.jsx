import { FileImageOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Radio, Upload } from "antd";
import subjectAPI from "apis/subject";
import Notification from "components/Notification";
import Compressor from "compressorjs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubjects, setModalInfo } from "redux/reducer/creator";
import firebase from "services/firebase";
import { v4 as uuidv4 } from "uuid";

const { TextArea } = Input;

function SubjectForm(props) {
  const { modalInfo } = useSelector((state) => state.creator);
  const [url, setUrl] = useState(null);
  const { update, post } = props;
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
  }, [update]);

  const onSubmit = async (values) => {
    const params = {
      topicId: post,
      subjectId: update?.subjectId,
      subjectName: values.subjectName,
      subjectDescription: values.subjectDescription,
      imageUrl: url ? url : update.imageUrl,
      statusId: values.statusId,
    };
    if (update) {
      const res = await subjectAPI.updateSubjectById(params);
      if (res.status === "Success") {
        Notification("success", res.message);
        dispatch(fetchSubjects());
        dispatch(setModalInfo({ title: "Add", isVisible: false }));
      } else {
        Notification("error", res.message);
      }
    } else {
      const res = await subjectAPI.addSubjectByTopicId(params);
      if (res.status === "Success") {
        Notification("success", res.message);
        dispatch(fetchSubjects());
        dispatch(setModalInfo({ title: "Add", isVisible: false }));
      } else {
        Notification("error", res.message);
      }
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
            url: update?.imageUrl,
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
    <Form
      layout="vertical"
      form={form}
      name="topic"
      onFinish={onSubmit}
      autoComplete="off"
      initialValues={update ? update : { statusId: 1 }}
    >
      <Form.Item
        label="Banner"
        name="imageUrl"
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
      <Form.Item
        name="subjectName"
        label="Subject name:"
        rules={[
          {
            required: true,
            message: "Subject name is required",
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
      <Form.Item
        name="statusId"
        label="Status"
        rules={[
          {
            required: true,
            message: "Status is required",
          },
        ]}
      >
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

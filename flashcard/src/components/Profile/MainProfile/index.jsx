import { DownSquareOutlined } from "@ant-design/icons";
import { Button, DatePicker, Divider, Form, Input, Select, Spin } from "antd";
import Moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import userAPI from "apis/user";
import { saveUserInfo } from "redux/reducer/user";
import Notification from "components/Notification";
import "../index.css";

const { Option } = Select;

function MainProfile() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { userLogged } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    form.setFieldsValue({
      email: userLogged?.email,
      fullName: userLogged?.fullName,
      phone: userLogged?.phone,
      address: userLogged?.address,
      DOB: Moment(userLogged?.DOB, "YYYY-MM-DD"),
      gender: userLogged?.gender,
    });
  }, [userLogged]);

  const getProfile = async () => {
    const response = await userAPI.getMe();
    dispatch(saveUserInfo(response.account));
    setLoading(false);
  };

  const onFinish = async (values) => {
    setLoading(true);
    const params = {
      email: values?.email,
      fullName: values?.fullName,
      phone: values?.phone,
      address: values?.address,
      DOB: Moment(values?.DOB).format("YYYY-MM-DD"),
      gender: values?.gender,
    };
    const response = await userAPI.updateProfile(params);
    if (response.status === "Success") {
      Notification("success", response.message);
      getProfile();
    } else {
      Notification("error", response.message);
    }
  };

  return (
    <div className="profile__container">
      <Divider plain orientation="left">
        <DownSquareOutlined /> Update profile
      </Divider>
      <Spin spinning={loading}>
        <Form
          form={form}
          name="profile"
          className="profile__form"
          autoComplete="off"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please input your Email!",
              },
            ]}
          >
            <Input size="large" type="email" placeholder="Email" readOnly />
          </Form.Item>
          <Form.Item
            name="fullName"
            label="Fullname"
            rules={[{ required: true, message: "Please input your Fullname!" }]}
          >
            <Input size="large" type="text" placeholder="Fullname" />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[
              {
                required: true,
                pattern: "[0-9]{10}",
                message: "Type at: 0867677061",
              },
            ]}
          >
            <Input size="large" type="text" placeholder="Phone" />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: "Please input your Address!" }]}
          >
            <Input size="large" type="text" placeholder="Address" />
          </Form.Item>
          <Form.Item
            name="DOB"
            label="Birthday"
            rules={[
              {
                required: true,
                message: "Please input your Date of birth!",
              },
            ]}
          >
            <DatePicker
              size="large"
              style={{ width: "100%", color: "#6a727f" }}
            />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Select gender"
            rules={[{ required: true, message: "Please pick an item!" }]}
          >
            <Select size="large">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" size="middle" htmlType="submit">
              Update Profile
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
}
export default MainProfile;

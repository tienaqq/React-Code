import { Form, Input, Switch, Button, Divider } from "antd";
import Notification from "../../Notification";
import { useState } from "react";
import { useSelector } from "react-redux";
import userAPI from "../../../apis/user";
import { DownSquareOutlined } from "@ant-design/icons";

function Password() {
  const { userLogged } = useSelector((state) => state.user);
  const [isActive, setActive] = useState(false);

  const onFinish = async (values) => {
    const response = await userAPI.updatePassword(values);
    if (response.status === "Success") {
      Notification("success", response.message);
    } else {
      Notification("error", response.message);
    }
  };

  return (
    <div className="profile__container">
      <Divider plain orientation="left">
        <DownSquareOutlined /> Update password
      </Divider>
      <div className="profile__form">
        {userLogged && (
          <Form
            name="profile"
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              name="oldPassword"
              label="Old password"
              rules={[
                {
                  required: true,
                  min: 6,
                  message: "Please input a password",
                },
              ]}
            >
              <Input
                size="large"
                type={isActive ? "text" : "password"}
                placeholder="New password"
              />
            </Form.Item>
            <Form.Item
              name="newPassword"
              label="New password"
              rules={[
                {
                  required: true,
                  min: 6,
                  message: "Please input a password",
                },
              ]}
            >
              <Input
                size="large"
                type={isActive ? "text" : "password"}
                placeholder="New password"
              />
            </Form.Item>
            <Form.Item
              name="confirm"
              label="Confirm new password"
              rules={[
                {
                  required: true,
                  min: 6,
                  message: "Confirm must be at least 6 characters",
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      "The two passwords that you entered do not match!"
                    );
                  },
                }),
              ]}
            >
              <Input
                size="large"
                type={isActive ? "text" : "password"}
                placeholder="Confirm new password"
              />
            </Form.Item>
            <Form.Item>
              <Switch onClick={() => setActive(!isActive)} /> Show password
            </Form.Item>
            <Form.Item>
              <Button size="middle" type="primary" htmlType="submit">
                Update Password
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
    </div>
  );
}
export default Password;

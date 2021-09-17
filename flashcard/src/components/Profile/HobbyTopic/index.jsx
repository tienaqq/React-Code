import { DownSquareOutlined } from "@ant-design/icons";
import { Button, Divider, Form, Select } from "antd";
import topicAPI from "apis/topic";
import userAPI from "apis/user";
import Notification from "components/Notification";
import { getChangeInfo } from "helpers/me";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function HobbyTopic() {
  const { Option } = Select;
  const { userLogged } = useSelector((state) => state.user);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const getTopics = async () => {
      const response = await topicAPI.getAll();
      setTopics(response.listTopic);
    };
    getTopics();
  }, []);

  const children = [];
  if (topics !== null) {
    topics.forEach(createOption);
  }
  const hobby = {
    interestTopic: JSON.parse(userLogged.interestTopic),
  };

  function createOption(value, index, array) {
    children.push(
      <Option key={value.topicId} value={`${value.topicId}`}>
        {value.topicName}
      </Option>
    );
  }

  const onFinish = async (values) => {
    const response = await userAPI.updateHobbyTopic(values);
    if (response.status === "Success") {
      Notification("success", response.message);
      getChangeInfo();
    } else {
      Notification("error", response.message);
    }
  };
  return (
    <div className="profile__container">
      <Divider plain orientation="left">
        <DownSquareOutlined /> Update hobby
      </Divider>
      <div className="profile__form">
        <Form name="profile" initialValues={hobby} onFinish={onFinish}>
          <Form.Item>
            <label className="app__label">Hobby Topic:</label>
            <br />
            <label className="app__label">
              Updating your favorite topics helps us to have more accurate
              recommendations
            </label>
          </Form.Item>
          <Form.Item name="interestTopic">
            <Select size="large" mode="multiple">
              {children}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              Update Topic
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
export default HobbyTopic;

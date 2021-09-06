import { HomeOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Select } from "antd";
import topicAPI from "apis/topic";
import userAPI from "apis/user";
import Notification from "components/Notification";
import images from "constants/images";
import Moment from "moment";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./index.css";

const { Option } = Select;

const form_1 = {
  display: "inline-block",
  width: "calc(50% - 8px)",
};

const form_2 = {
  display: "inline-block",
  width: "calc(50% - 8px)",
  margin: "0 8px",
};

function Register() {
  const history = useHistory();
  const [topics, setTopics] = useState([]);
  const [selected, setSelected] = useState("1");

  useEffect(() => {
    const getTopics = async () => {
      const response = await topicAPI.getAll();
      setTopics(response.listTopic);
    };
    getTopics();
  }, []);

  const children = [];
  topics?.forEach(createOption);
  function createOption(value, index, array) {
    children.push(<Option key={value.topicId}>{value.topicName}</Option>);
  }

  const onFinish = async (values) => {
    const params = {
      email: values?.email,
      password: values?.password,
      fullName: values?.fullName,
      roleId: values?.roleId,
      phone: values?.phone,
      address: values?.address,
      DOB: Moment(values?.DOB).format("YYYY-MM-DD"),
      gender: values?.gender,
      interestTopic: selected === "1" ? values?.interestTopic : [],
    };
    const response = await userAPI.register(params);
    if (response.status === "Success") {
      history.push("/login");
      Notification("success", response.message);
    } else {
      Notification("error", response.message);
    }
  };

  function handleChange(value) {
    setSelected(value);
  }

  return (
    <div className="limiter">
      <div className="register-container">
        <div className="register-wrap">
          <div className="register-form">
            <Form
              name="basic"
              autoComplete="off"
              autoComplete="off"
              onFinish={onFinish}
            >
              <h1 className="register-title">Register</h1>
              <Form.Item style={{ marginBottom: 0 }}>
                <Form.Item
                  name="email"
                  style={form_1}
                  rules={[
                    { required: true, message: "Email is required" },
                    { type: "email", message: "Email is not valid format" },
                  ]}
                >
                  <Input size="large" placeholder="Email" />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: "Password is required" },
                    {
                      min: 8,
                      message:
                        "Password length must be greater than 8 characters",
                    },
                  ]}
                  style={form_2}
                >
                  <Input.Password size="large" placeholder="Password" />
                </Form.Item>
              </Form.Item>

              <Form.Item style={{ marginBottom: 0 }}>
                <Form.Item
                  name="fullName"
                  rules={[{ required: true, message: "Fullname is required" }]}
                  style={form_1}
                >
                  <Input size="large" placeholder="Fullname" />
                </Form.Item>
                <Form.Item
                  name="phone"
                  rules={[
                    { required: true, message: "Phone is required" },
                    {
                      min: 8,
                      max: 11,
                      pattern: "[0-9]{10}",
                      message: "Phone is not valid format",
                    },
                  ]}
                  style={form_2}
                >
                  <Input size="large" placeholder="Phone" />
                </Form.Item>
              </Form.Item>

              <Form.Item style={{ marginBottom: 0 }}>
                <Form.Item
                  name="address"
                  rules={[{ required: true, message: "Address is required" }]}
                  style={form_1}
                >
                  <Input size="large" placeholder="Address" />
                </Form.Item>
                <Form.Item
                  name="DOB"
                  rules={[{ required: true, message: "Birthday is required" }]}
                  style={form_2}
                >
                  <DatePicker
                    placeholder="Birthday"
                    size="large"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Form.Item>

              <Form.Item style={{ marginBottom: 0 }}>
                <Form.Item
                  name="roleId"
                  rules={[{ required: true, message: "Role is required" }]}
                  style={form_1}
                >
                  <Select
                    size="large"
                    placeholder="Role"
                    onChange={handleChange}
                  >
                    <Option value="1">Member</Option>
                    <Option value="3">Donor</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="gender"
                  rules={[{ required: true, message: "Gender is required" }]}
                  style={form_2}
                >
                  <Select size="large" placeholder="Gender">
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                    <Option value="other">Other</Option>
                  </Select>
                </Form.Item>
              </Form.Item>

              {selected === "1" && (
                <Form.Item
                  name="interestTopic"
                  rules={[
                    { required: true, message: "Interest topic is required" },
                  ]}
                  style={{ width: "calc(100% - 8px)" }}
                >
                  <Select
                    size="large"
                    mode="multiple"
                    placeholder="Interest topics:"
                    allowClear
                  >
                    {children}
                  </Select>
                </Form.Item>
              )}

              <p className="register-term">
                By clicking you agree with our <Link to="/">Term of use</Link>.
              </p>

              <Form.Item>
                <Button htmlType="submit" size="large" className="btn">
                  REGISTER
                </Button>
              </Form.Item>
            </Form>
          </div>

          <div className="register-image">
            <img src={images.LOGIN} alt="photo" />
            <Link to="/">
              <Button
                className="btn__back"
                type="primary"
                shape="circle"
                icon={<HomeOutlined />}
              />
            </Link>

            <div className="register-image__link">
              <p>
                {"Already have an account? "}
                <Link style={{ color: "#40a9ff", fontWeight: 600 }} to="/login">
                  LOGIN
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Register;

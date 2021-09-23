import { Space } from "antd";
import React from "react";

export const returnDone = (status) => {
  if (status === true) {
    return " ✔️ ";
  }
};

export const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

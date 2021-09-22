import { Tag } from "antd";

export const returnStatusType = (statusId) => {
  switch (statusId) {
    case 1:
      return <Tag color="warning">Waiting</Tag>;
    case 2:
      return <Tag color="processing">Running</Tag>;
    case 3:
      return <Tag color="default">Stopped</Tag>;
    case 4:
      return <Tag color="red">Deleted</Tag>;
    default:
      break;
  }
};

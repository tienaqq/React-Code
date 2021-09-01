import { Tag } from "antd";

export const backStatus = (statusId) => {
  switch (statusId) {
    case 1: {
      return (
        <Tag className="tag--style" color="#2db7f5">
          Public
        </Tag>
      );
    }
    case 2: {
      return (
        <Tag className="tag--style" color="#f50">
          Private
        </Tag>
      );
    }
    case 3: {
      return (
        <Tag className="tag--style" color="default">
          Deleted
        </Tag>
      );
    }
    case 4: {
      return (
        <Tag className="tag--style" color="default">
          Unavailable
        </Tag>
      );
    }
    default:
      break;
  }
};

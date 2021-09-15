import { Tag } from "antd";

export const backRequestStatus = (statusId) => {
  switch (statusId) {
    case 1: {
      return (
        <Tag className="tag--style" color="#2db7f5">
          Waiting
        </Tag>
      );
    }
    case 2: {
      return (
        <Tag className="tag--style" color="#f50">
          Approved
        </Tag>
      );
    }
    case 3: {
      return (
        <Tag className="tag--style" color="default">
          Denied
        </Tag>
      );
    }
    case 4: {
      return (
        <Tag className="tag--style" color="default">
          Deleted
        </Tag>
      );
    }
    case 5: {
      return (
        <Tag className="tag--style" color="default">
          Cancel
        </Tag>
      );
    }
    default:
      break;
  }
};

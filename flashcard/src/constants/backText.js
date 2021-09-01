import { Typography } from "antd";

const { Text } = Typography;

export const backText = (statusId) => {
  switch (statusId) {
    case 1: {
      return (
        <Text underline className="tag--style">
          Public
        </Text>
      );
    }
    case 2: {
      return (
        <Text underline className="tag--style">
          Private
        </Text>
      );
    }
    case 3: {
      return (
        <Text underline className="tag--style">
          Deleted
        </Text>
      );
    }
    case 4: {
      return (
        <Text underline className="tag--style">
          Unavailable
        </Text>
      );
    }
    default:
      break;
  }
};

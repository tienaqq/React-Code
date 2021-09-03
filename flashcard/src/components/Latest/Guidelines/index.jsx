import { Typography } from "antd";

const { Title, Paragraph, Text } = Typography;

function Guidelines() {
  return (
    <div className="app__first-child">
      <Typography>
        <Title level={3}>Guidelines</Title>
        <Paragraph>
          Flashcard application focuses on supporting user's self-study ability.
          <br />
          The courses that you have purchased will receive{" "}
          <Text strong>free</Text> public content updates, but for private
          lessons you will need a <Text strong>point to exchange</Text>.
        </Paragraph>
      </Typography>
    </div>
  );
}
export default Guidelines;

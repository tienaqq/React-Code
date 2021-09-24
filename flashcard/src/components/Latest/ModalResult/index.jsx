import { Button, Descriptions, Modal } from "antd";
import React from "react";
import { useHistory, useParams } from "react-router";

function ModalResult(props) {
  const { isModalVisible, result } = props;
  const history = useHistory();
  let { post } = useParams();

  return (
    <Modal
      title="Test Result"
      visible={isModalVisible}
      footer={false}
      width={800}
    >
      <div style={{ background: "#FFFFFF", marginBottom: 30 }}>
        <Descriptions bordered>
          <Descriptions.Item label="Test" span={3}>
            {result?.testName}
          </Descriptions.Item>
          <Descriptions.Item label="Question" span={3}>
            {result?.numOfQuestion}
          </Descriptions.Item>
          <Descriptions.Item label="Correct" span={3}>
            {result?.numOfCorrect}
          </Descriptions.Item>
          <Descriptions.Item label="Point" span={3}>
            {result?.point.toFixed(2)}
          </Descriptions.Item>
        </Descriptions>
        <Button
          type="primary"
          style={{ float: "right", marginTop: 10 }}
          onClick={() => history.push(`/latest/${post}`)}
        >
          Finish review
        </Button>
      </div>
    </Modal>
  );
}
export default ModalResult;

import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Descriptions,
  Input,
  List,
  Space,
  Row,
  Col,
  Image,
} from "antd";
import ModalCreator from "components/Creator/ModalCreator";
import showDeleteConfirm from "components/Creator/Remove";
import { backStatus } from "constants/backStatus";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { setModalInfo } from "redux/reducer/creator";
import SubjectForm from "../SubjectForm";

const { Search } = Input;

function SubjectList() {
  const dispatch = useDispatch();
  let { post } = useParams();
  const { subjects } = useSelector((state) => state.creator);
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(null);
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    let el = [];
    el = subjects?.filter((item) => item.topicId === parseInt(post));
    setData(el);
    setFilter(el);
  }, [post, subjects]);

  const onSearch = (value) => {
    if (!value) return setFilter(data);
    let result = [];
    result = data?.filter((item) => {
      return item.subjectName.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });
    return setFilter(result);
  };

  const showModal = (item) => {
    if (item) {
      setUpdate(item);
      dispatch(setModalInfo({ title: "Update Subject", isVisible: true }));
    } else {
      setUpdate(null);
      dispatch(setModalInfo({ title: "Add Subject", isVisible: true }));
    }
  };

  return (
    <>
      <ModalCreator>
        <SubjectForm update={update} post={post} />
      </ModalCreator>
      <div className="app__third-child">
        <div className="tool__container">
          <div className="tool__left">
            <Button icon={<PlusOutlined />} onClick={() => showModal()}>
              Add Subject
            </Button>
          </div>
          <div className="tool__right">
            <Search
              placeholder="Input search text"
              onSearch={onSearch}
              enterButton
              allowClear
            />
          </div>
        </div>
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            pageSize: 10,
          }}
          dataSource={filter}
          footer={
            <div>
              <b>Total:</b> {data?.length}
            </div>
          }
          renderItem={(item) => (
            <Card
              size="small"
              title={
                <Link to={`/creator/subject/${item.subjectId}`}>
                  {item?.subjectName}
                </Link>
              }
              extra={
                <Space>
                  <Button
                    icon={<EditOutlined />}
                    type="text"
                    onClick={() => showModal(item)}
                  />
                  <Button
                    icon={<DeleteOutlined />}
                    type="text"
                    onClick={() => showDeleteConfirm(item.subjectId, "subject")}
                  />
                </Space>
              }
              className="app--mg20"
            >
              <Row gutter={[16, 16]}>
                <Col xxl={5} xl={5} lg={5}>
                  <Image
                    preview={false}
                    width={150}
                    alt="logo"
                    src={item.imageUrl}
                  />
                </Col>
                <Col xxl={19} xl={19} lg={19}>
                  <Descriptions column={3}>
                    <Descriptions.Item span={3}>
                      {item?.subjectDescription}
                    </Descriptions.Item>
                    <Descriptions.Item label="Publish" span={2}>
                      {moment(item?.createdDate).format("YYYY-MM-DD")}
                    </Descriptions.Item>
                    <Descriptions.Item label="Status" span={1}>
                      {backStatus(item?.statusId)}
                    </Descriptions.Item>
                  </Descriptions>
                </Col>
              </Row>
            </Card>
          )}
        />
      </div>
    </>
  );
}
export default SubjectList;

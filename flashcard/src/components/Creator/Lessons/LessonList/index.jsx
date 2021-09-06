import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Descriptions, Input, List, Space } from "antd";
import ModalCreator from "components/Creator/ModalCreator";
import { backStatus } from "constants/backStatus";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { setModalInfo } from "redux/reducer/creator";
import LessonForm from "../LessonForm";
import showDeleteConfirm from "components/Creator/Remove";

const { Search } = Input;

function LessonList() {
  const dispatch = useDispatch();
  let { post } = useParams();
  const { lessons } = useSelector((state) => state.creator);
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(null);
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    let el = [];
    el = lessons?.filter((item) => item.subjectId === parseInt(post));
    setData(el);
    setFilter(el);
  }, [post, lessons]);

  const onSearch = (value) => {
    if (!value) return setFilter(data);
    let result = [];
    result = data?.filter((item) => {
      return item.lessionName.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });
    return setFilter(result);
  };

  const showModal = (item) => {
    if (item) {
      setUpdate(item);
      dispatch(setModalInfo({ title: "Update Lesson", isVisible: true }));
    } else {
      dispatch(setModalInfo({ title: "Add Lesson", isVisible: true }));
    }
  };

  return (
    <>
      <ModalCreator>
        <LessonForm update={update} post={post} />
      </ModalCreator>
      <div className="app__third-child">
        <div className="tool__container">
          <div className="tool__left">
            <Button icon={<PlusOutlined />} onClick={() => showModal()}>
              Add Lesson
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
              title={item?.lessionName}
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
                    onClick={() => showDeleteConfirm(item.lessionId, "lesson")}
                  />
                </Space>
              }
              className="app--mg20"
            >
              <Descriptions column={3}>
                <Descriptions.Item span={3}>
                  {item?.lessionDescription}
                </Descriptions.Item>
                <Descriptions.Item label="Publish" span={2}>
                  {moment(item?.createdDate).format("YYYY-MM-DD")}
                </Descriptions.Item>
                <Descriptions.Item label="Status" span={1}>
                  {backStatus(item?.statusId)}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          )}
        />
      </div>
    </>
  );
}
export default LessonList;

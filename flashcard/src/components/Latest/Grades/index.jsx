import { FileDoneOutlined, HighlightOutlined } from "@ant-design/icons";
import { Avatar, List, PageHeader, Space } from "antd";
import quizAPI from "apis/quiz";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { setListHistory } from "redux/reducer/latest";
import "./index.css";

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

function Grades() {
  const dispatch = useDispatch();
  let { post } = useParams();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  function filtered(values, post) {
    let data = [];
    data = values.filter((item) => item.subjectId === parseInt(post));
    return data;
  }

  useEffect(() => {
    const getHistory = async () => {
      const res = await quizAPI.getHistory();
      let obj = filtered(res, post);
      setList(obj);
      dispatch(setListHistory(obj));
      setLoading(false);
    };
    getHistory();
  }, [post]);

  return (
    <div className="app__first-child">
      <PageHeader
        className="site-page-header"
        title="Grades"
        style={{ marginBottom: 30 }}
      />
      <List
        loading={loading}
        itemLayout="horizontal"
        pagination={{
          pageSize: 10,
        }}
        dataSource={list[0]?.listTest}
        renderItem={(item) => (
          <List.Item
            key={item.title}
            actions={[
              <IconText
                icon={HighlightOutlined}
                text={"Take: " + item?.totalTakeQuiz}
                key="list-vertical-star-o"
              />,
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar className="quiz__icon" icon={<FileDoneOutlined />} />
              }
              title={
                <Link to={`/latest/${post}/grades-history/${item?.quiztestId}`}>
                  {item?.testName}
                </Link>
              }
              description="QUIZ"
            />
          </List.Item>
        )}
      />
    </div>
  );
}
export default Grades;

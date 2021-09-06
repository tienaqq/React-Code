import { Button, Col, Input, Row, Select, Spin, Form } from "antd";
import SearchLesson from "components/Search/SearchLesson";
import SearchSubject from "components/Search/SearchSubject";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Layout from "./Layout";

const { Search } = Input;
const { Option } = Select;

function SearchPage({ fetchSearchSubjects, fetchSearchLessons }) {
  let { post } = useParams();

  const [key, setKey] = useState("");
  const [type, setType] = useState("subject");

  const [loading, setLoading] = useState(true);

  const onSearch = (value) => setKey(value);
  function handleChange(value) {
    setType(value);
  }
  useEffect(() => {
    setKey(post);
  }, [post]);

  useEffect(() => {
    fetchSearchSubjects(key);
    fetchSearchLessons(key);
    setLoading(false);
  }, [key, type]);

  return (
    <Layout>
      <div className="search__container">
        <div className="search__wrapper">
          <div style={{ width: "100%", padding: "20px 0" }}>
            <Row>
              <Col span={12}>
                <Button type="text">Filter</Button>
                <Select
                  defaultValue="subject"
                  style={{ width: 150 }}
                  onChange={handleChange}
                >
                  <Option value="subject">Subject</Option>
                  <Option value="lesson">Lesson</Option>
                </Select>
              </Col>
              <Col span={12}>
                <Form initialValues={{ searchKey: post }}>
                  <Form.Item noStyle name="searchKey">
                    <Search
                      placeholder="Input search text"
                      onSearch={onSearch}
                      enterButton
                      allowClear
                    />
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </div>
          <div>
            <Spin spinning={loading}>
              {type === "subject" && <SearchSubject />}
              {type === "lesson" && <SearchLesson />}
            </Spin>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default SearchPage;

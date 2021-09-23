import { Descriptions, PageHeader } from "antd";
import Moment from "moment";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function CourseInfo() {
  const history = useHistory();
  const { subject } = useSelector((state) => state.latest);

  useEffect(() => {
    if (!subject) {
      history.replace("/notfound");
    }
  }, [subject]);

  return (
    <div className="app__first-child">
      <PageHeader
        title={subject?.subjectName}
        className="app--border app--bg app--shadow app--mg20"
      >
        <Descriptions size="small" column={3}>
          <Descriptions.Item label="Author">
            {subject?.fullName}
          </Descriptions.Item>
          <Descriptions.Item label="Publish" span={2}>
            {Moment(subject?.createdDate).format("YYYY-MM-DD")}
          </Descriptions.Item>
          <Descriptions.Item label="Description">
            {subject?.subjectDescription}
          </Descriptions.Item>
        </Descriptions>
      </PageHeader>
    </div>
  );
}
export default CourseInfo;

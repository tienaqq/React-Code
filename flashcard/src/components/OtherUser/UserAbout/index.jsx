import { Descriptions, Divider, Tag } from "antd";
import topicAPI from "apis/topic";
import { useEffect, useState } from "react";

const colors = [
  "success",
  "volcano",
  "red",
  "magenta",
  "purple",
  "geekblue",
  "blue",
];

function random_item(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function UserAbout(props) {
  const { info } = props;
  const [topics, setTopics] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await topicAPI.getAll();
      name(res.listTopic);
    };
    getData();
  }, [info]);

  const name = (values) => {
    let li = JSON.parse(info?.interestTopic);
    let array = [];
    values?.map((item) => {
      li?.map((el) => {
        if (item.topicId === parseInt(el)) {
          array.push(item);
        }
      });
    });
    return setList(array);
  };

  return (
    <div className="other__about">
      <div className="other__about-menu">
        <h3>About</h3>
        <p>Overview</p>
      </div>
      <div className="other__about-content">
        <Descriptions
          title={"About " + info?.fullName.split(" ").pop()}
          column={3}
        >
          <Descriptions.Item label="Email" span={3}>
            {info?.email}
          </Descriptions.Item>
          <Descriptions.Item label="Gender" span={3}>
            {info?.gender}
          </Descriptions.Item>
          <Descriptions.Item label="Address" span={3}>
            {info?.address}
          </Descriptions.Item>
        </Descriptions>
        <Divider />
        <div>
          <h4>Hobby Topics: </h4>
          {list?.map((item) => {
            return (
              <Tag key={item.topicId} color={random_item(colors)}>
                {item.topicName}
              </Tag>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default UserAbout;

import { PlusOutlined } from "@ant-design/icons";
import { Button, Space, Table, Tag, Typography } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices, fetchTypes } from "redux/reducer/donor";
import remove from "./remove";
import ServiceForm from "./ServiceForm";
import { setShowModal } from "redux/reducer/donor";

function ServiceList() {
  const dispatch = useDispatch();
  const { service, type } = useSelector((state) => state.donor);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(fetchTypes());
    dispatch(fetchServices());
    setLoading(false);
  }, []);

  useEffect(() => {
    let list = [];
    service?.map((item) => {
      list.push({
        key: item.id,
        name: item.serviceName,
        type: findType(item.serviceTypeId),
        desc: item.serviceInformation,
        quantity: item.quantity,
        time: moment(item.createdDate).format("YYYY-MM-DD"),
      });
    });
    setData(list);
  }, [service, type]);

  const findType = (id) => {
    if (!type) return;
    const obj = type.find((element) => {
      if (element.id === id) {
        return true;
      }
    });
    return obj;
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <Typography.Text>{text}</Typography.Text>,
    },
    {
      title: "Description",
      dataIndex: "desc",
      key: "desc",
      responsive: ["xl"],
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      responsive: ["xl"],
      render: (type) => <Tag color="green">{type?.typeName}</Tag>,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      responsive: ["xl"],
      sorter: {
        compare: (a, b) => a.quantity - b.quantity,
        multiple: 3,
      },
    },
    {
      title: "Time",
      key: "time",
      dataIndex: "time",
      responsive: ["xl"],
      sorter: {
        compare: (a, b) => a.time - b.time,
        multiple: 3,
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" ghost onClick={() => console.log(record)}>
            Update
          </Button>
          <Button danger onClick={() => remove(record.key)}>
            Remove
          </Button>
        </Space>
      ),
    },
  ];

  const showModal = () => {
    dispatch(setShowModal(true));
  };

  return (
    <div style={{ maxWidth: 1200 }}>
      <ServiceForm />
      <Space style={{ marginBottom: 20 }}>
        <Button icon={<PlusOutlined />} onClick={() => showModal()}>
          Add Service
        </Button>
      </Space>
      <Table
        size="middle"
        loading={loading}
        columns={columns}
        dataSource={data}
      />
    </div>
  );
}
export default ServiceList;

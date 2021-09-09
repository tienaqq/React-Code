import { SearchOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space, Table, Tag, Typography } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import Highlighter from "react-highlight-words";

const { Text } = Typography;

function OtherList(props) {
  const { list } = props;
  const [form] = Form.useForm();
  const [data, setData] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  useEffect(() => {
    let el = [];
    list?.map((item) => {
      el.push({
        key: item.email,
        email: item.email,
        fullName: item.fullName,
        gender: item.gender,
        roleName: item.roleName,
        statusName: item.statusName,
        createdDate: moment(item.createdDate).format("YYYY-MM-DD"),
      });
    });
    setData(el);
  }, [list]);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();

    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      responsive: ["lg"],
      ...getColumnSearchProps("fullName"),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      responsive: ["xl"],
      render: (gender) => <Text>{gender.toUpperCase()}</Text>,
      filters: [
        {
          text: "Male",
          value: "male",
        },
        {
          text: "Female",
          value: "female",
        },
        {
          text: "Other",
          value: "other",
        },
      ],
      onFilter: (value, record) => record.gender.indexOf(value) === 0,
    },
    {
      title: "Role",
      key: "roleName",
      dataIndex: "roleName",
      render: (role) => <Tag color="blue">{role.toUpperCase()}</Tag>,
      filters: [
        {
          text: "Student",
          value: "Student",
        },
        {
          text: "Donor",
          value: "Donor",
        },
      ],
      onFilter: (value, record) => record.roleName.indexOf(value) === 0,
    },
    {
      title: "Registration Date",
      dataIndex: "createdDate",
      key: "createdDate",
      responsive: ["xl"],
      sorter: (a, b) =>
        parseInt(a.createdDate.replaceAll("-", "")) -
        parseInt(b.createdDate.replaceAll("-", "")),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button disabled type="text">
            Ban
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}
export default OtherList;

import { Pagination } from "antd";

function Paging(props) {
  const { current, total } = props;

  const onChange = (page) => {
    props.onChangePage(page);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        margin: "20px 0",
      }}
    >
      <Pagination
        defaultCurrent={1}
        current={current}
        total={total}
        onChange={onChange}
      />
    </div>
  );
}
export default Paging;

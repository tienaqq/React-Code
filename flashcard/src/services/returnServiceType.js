import { Tag } from "antd";

export function returnServiceType(id) {
  switch (id) {
    case 1:
      return <Tag color="#2db7f5">Voucher</Tag>;
    case 2:
      return <Tag color="#87d068">Discount code</Tag>;
    case 3:
      return <Tag color="#108ee9">Clothes</Tag>;
    default:
      break;
  }
}

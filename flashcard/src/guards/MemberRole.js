import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { paths } from "constants/paths";
import { Result, Button } from "antd";

function RoleGuard() {
  const { userLogged } = useSelector((state) => state.user);
  if (!userLogged) {
    return (
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button type="primary">Back Home</Button>}
      />
    );
  }

  return userLogged.roleId;
}

export default function MemberRole({ children }) {
  const role = RoleGuard();

  if (role === 1) {
    return <> {children} </>;
  }
  return (
    <Redirect
      to={paths.NOTFOUND}
      message={"Not permission. Try another account."}
    />
  );
}

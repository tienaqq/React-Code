import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { paths } from "constants/paths";

function RoleGuard() {
  const { userLogged } = useSelector((state) => state.user);
  if (!userLogged) {
    return 0;
  }

  return userLogged.roleId;
}

export default function AdminRole({ children }) {
  const role = RoleGuard();

  if (role === 2) {
    return <> {children} </>;
  }
  return (
    <Redirect
      to={paths.NOTFOUND}
      message={"Not permission. Try another account."}
    />
  );
}

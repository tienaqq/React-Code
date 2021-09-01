import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { pathConstants } from "../constants/pathConstants";

function RoleGuard() {
  const { userLogged } = useSelector((state) => state.user);
  if (!userLogged) {
    return 0;
  }

  return userLogged.roleId;
}

export default function DonorRole({ children }) {
  const role = RoleGuard();

  if (role === 3) {
    return <> {children} </>;
  }
  return (
    <Redirect
      to={pathConstants.NOTFOUND}
      message={"Not permission. Try another account."}
    />
  );
}

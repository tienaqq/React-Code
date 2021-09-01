import { message } from "antd";
const { useSelector } = require("react-redux");

export function useAuthenticated() {
  return useSelector((state) => Boolean(state.user.userLogged));
}

const AppExpired = () => {
  const { userLogged } = useSelector((state) => state.user);
  if (userLogged) {
    const exp = userLogged.exp;
    if (exp * 1000 < Date.now()) {
      message.error("Token is expired, try login again!");
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
};
export default AppExpired;

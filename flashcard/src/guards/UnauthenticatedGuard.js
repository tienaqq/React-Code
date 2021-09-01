import { paths } from "constants/paths";
import { Redirect } from "react-router-dom";
import { useAuthenticated } from "./useAuthenticated";

export default function UnauthenticatedGuard({ children }) {
  const authenticated = useAuthenticated();

  if (authenticated) {
    return <Redirect to={paths.HOME} />;
  }

  return <> {children} </>;
}

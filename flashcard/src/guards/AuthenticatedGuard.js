import { Redirect } from "react-router-dom";
import { paths } from "constants/paths";
import { useAuthenticated } from "./useAuthenticated";

export default function AuthenticatedGuard({ children }) {
  const authenticated = useAuthenticated();

  if (!authenticated) {
    return <Redirect to={paths.LOGIN} />;
  }

  return <> {children} </>;
}

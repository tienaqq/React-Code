import "antd/dist/antd.css";
import NotFound from "components/404";
import Course from "components/Course";
import Home from "components/Home";
import Login from "components/Login";
import Register from "components/Register";
import { paths } from "constants/paths";
import Creator from "containers/Creator";
import Latest from "containers/Latest";
import AuthenticatedGuard from "guards/AuthenticatedGuard";
import MemberRole from "guards/MemberRole";
import UnauthenticatedGuard from "guards/UnauthenticatedGuard";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={paths.HOME}>
          <Home />
        </Route>

        <Route path={paths.REGISTER}>
          <UnauthenticatedGuard>
            <Register />
          </UnauthenticatedGuard>
        </Route>

        <Route path={paths.LOGIN}>
          <UnauthenticatedGuard>
            <Login />
          </UnauthenticatedGuard>
        </Route>

        <Route path={paths.COURSE}>
          <AuthenticatedGuard>
            <MemberRole>
              <Course />
            </MemberRole>
          </AuthenticatedGuard>
        </Route>

        <Route path={paths.LATEST}>
          <AuthenticatedGuard>
            <MemberRole>
              <Latest />
            </MemberRole>
          </AuthenticatedGuard>
        </Route>

        <Route path={paths.CREATOR}>
          <AuthenticatedGuard>
            <MemberRole>
              <Creator />
            </MemberRole>
          </AuthenticatedGuard>
        </Route>

        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

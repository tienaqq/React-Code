import "antd/dist/antd.css";
import NotFound from "components/404";
import Course from "components/Course";
import Home from "components/Home";
import Login from "components/Login";
import Register from "components/Register";
import { paths } from "constants/paths";
import Admin from "containers/Admin";
import Creator from "containers/Creator";
import Donor from "containers/Donor";
import GiftShop from "containers/GiftShop";
import Latest from "containers/Latest";
import Search from "containers/Search";
import AdminRole from "guards/AdminRole";
import AuthenticatedGuard from "guards/AuthenticatedGuard";
import DonorRole from "guards/DonorRole";
import MemberRole from "guards/MemberRole";
import UnauthenticatedGuard from "guards/UnauthenticatedGuard";
import history from "helpers/history";
import OtherUser from "layouts/OtherUser";
import Profile from "layouts/Profile";
import RecentLearning from "layouts/RecentLearning";
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { fetchAdsInterval } from "services/adsInterval";

function App() {
  useEffect(() => {
    const interval = setInterval(() => {
      fetchAdsInterval();
    }, 500000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Router history={history}>
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

        <Route path={paths.USER}>
          <AuthenticatedGuard>
            <MemberRole>
              <OtherUser />
            </MemberRole>
          </AuthenticatedGuard>
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

        <Route path={paths.LEARNING}>
          <AuthenticatedGuard>
            <MemberRole>
              <RecentLearning />
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

        <Route path={paths.PROFILE}>
          <AuthenticatedGuard>
            <MemberRole>
              <Profile />
            </MemberRole>
          </AuthenticatedGuard>
        </Route>

        <Route path={paths.GIFT}>
          <AuthenticatedGuard>
            <MemberRole>
              <GiftShop />
            </MemberRole>
          </AuthenticatedGuard>
        </Route>

        <Route path={paths.SEARCH}>
          <AuthenticatedGuard>
            <MemberRole>
              <Search />
            </MemberRole>
          </AuthenticatedGuard>
        </Route>

        <Route path={paths.DONOR}>
          <AuthenticatedGuard>
            <DonorRole>
              <Donor />
            </DonorRole>
          </AuthenticatedGuard>
        </Route>

        <Route path={paths.ADMIN}>
          <AuthenticatedGuard>
            <AdminRole>
              <Admin />
            </AdminRole>
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

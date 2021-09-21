import { connect } from "react-redux";
import Admin from "layouts/Admin";
import {
  fetchUser,
  fetchDonorService,
  fetchAdsByAdmin,
} from "redux/reducer/admin";

const mapStateToProps = (state) => {
  return {
    activeArray: state.admin.activeArray,
    inActiveArray: state.admin.inActiveArray,
    banArray: state.admin.banArray,
    adsWaiting: state.admin.adsWaiting,
    adsRunning: state.admin.adsRunning,
    adsStopped: state.admin.adsStopped,
  };
};

const mapActionToProps = (dispatch) => ({
  fetchUser: () => dispatch(fetchUser()),
  fetchDonorService: () => dispatch(fetchDonorService()),
  fetchAdsByAdmin: () => dispatch(fetchAdsByAdmin()),
});

export default connect(mapStateToProps, mapActionToProps)(Admin);

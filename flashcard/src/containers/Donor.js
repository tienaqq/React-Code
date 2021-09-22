import Donor from "layouts/Donor";
import { connect } from "react-redux";
import { fetchAds, fetchServices, fetchTypes } from "../redux/reducer/donor";

const mapStateToProps = (state) => {
  return {
    service: state.donor.service,
    type: state.donor.service,
    adsWaiting: state.donor.adsWaiting,
    adsRunning: state.donor.adsRunning,
    adsStopped: state.donor.adsStopped,
  };
};

const mapActionToProps = (dispatch) => ({
  fetchServices: () => dispatch(fetchServices),
  fetchTypes: () => dispatch(fetchTypes),
  fetchAds: () => dispatch(fetchAds),
});

export default connect(mapStateToProps, mapActionToProps)(Donor);

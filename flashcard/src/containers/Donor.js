import Donor from "layouts/Donor";
import { connect } from "react-redux";
import {
  fetchServices,
  fetchTypes,
  fetchHistory,
  fetchAds,
} from "../redux/reducer/donor";

const mapStateToProps = (state) => {
  return {
    service: state.donor.service,
    type: state.donor.service,
    history: state.donor.service,
    ads: state.donor.service,
  };
};

const mapActionToProps = (dispatch) => ({
  fetchServices: () => dispatch(fetchServices),
  fetchTypes: () => dispatch(fetchTypes),
  fetchHistory: () => dispatch(fetchHistory),
  fetchAds: () => dispatch(fetchAds),
});

export default connect(mapStateToProps, mapActionToProps)(Donor);

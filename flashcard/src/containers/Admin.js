import { connect } from "react-redux";
import Admin from "layouts/Admin";
import { fetchUser } from "redux/reducer/admin";

const mapStateToProps = (state) => {
  return {
    activeList: state.admin.active,
    inActiveList: state.admin.inActive,
    banList: state.admin.banList,
  };
};

const mapActionToProps = (dispatch) => ({
  fetchUser: () => dispatch(fetchUser()),
});

export default connect(mapStateToProps, mapActionToProps)(Admin);

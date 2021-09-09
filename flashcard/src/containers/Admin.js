import { connect } from "react-redux";
import Admin from "layouts/Admin";
import { fetchUser } from "redux/reducer/admin";

const mapStateToProps = (state) => {
  return {
    activeArray: state.admin.activeArray,
    inActiveArray: state.admin.inActiveArray,
    banArray: state.admin.banArray,
  };
};

const mapActionToProps = (dispatch) => ({
  fetchUser: () => dispatch(fetchUser()),
});

export default connect(mapStateToProps, mapActionToProps)(Admin);

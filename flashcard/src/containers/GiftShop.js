import GiftShop from "layouts/GiftShop";
import { connect } from "react-redux";
import { fetchGifts } from "../redux/reducer/gift";

const mapStateToProps = (state) => {
  return {
    gifts: state.gift.gifts,
  };
};

const mapActionToProps = (dispatch) => ({
  fetchGifts: () => dispatch(fetchGifts()),
});

export default connect(mapStateToProps, mapActionToProps)(GiftShop);

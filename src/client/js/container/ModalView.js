// ModalView.js
import { connect } from 'react-redux';
import getModalData from '../selector/getModalData.js';
import ModalView from '../component/ModalView.jsx';

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps;
  return {
    zIndex: getModalData(state, id, 'zIndex'),
    status: getModalData(state, id, 'status'),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: ({ id }) => dispatch({ type: '', payload: id }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalView);

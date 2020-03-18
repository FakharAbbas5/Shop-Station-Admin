const dispatchedModalReducer = (state = false, action) => {
  switch (action.type) {
    case "ShowDispatchedModal":
      return true;
    case "HideDispatchedModal":
      return false;
    default:
      return state;
  }
};

export default dispatchedModalReducer;

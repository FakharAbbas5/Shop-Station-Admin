import React, { useContext } from "react";
import styled from "styled-components";
import Button from "./Button";
import { StoreContext } from "../App";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
function ModalDispatched() {
  const StoreData = useContext(StoreContext);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch({ type: "HideDispatchedModal" });
  };

  return (
    <DispatchModal>
      <div className="dispatched-inner-container">
        <h3>Sales Data Added!</h3>
        <Link to="/home">
          <Button cart onClick={closeModal}>
            Orders
          </Button>
        </Link>
      </div>
    </DispatchModal>
  );
}

export default ModalDispatched;

const DispatchModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  .dispatched-inner-container {
    background: white;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    padding: 5px 15px;
  }
`;

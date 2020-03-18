import React, { useContext } from "react";
import styled from "styled-components";
import Button from "../Components/Button";
import { StoreContext } from "../App";
function ModalAdded() {
  const StoreData = useContext(StoreContext);
  const { CloseMyModal } = StoreData;
  return (
    <ModalContainer>
      <div className="inner-modal">
        <h2>Item Added To Inventory</h2>
        <div className="button-container">
          <Button onClick={CloseMyModal}>Add More</Button>
        </div>
      </div>
    </ModalContainer>
  );
}

export default ModalAdded;

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  .inner-modal {
    background: white;
    padding: 10px;
    .button-container {
      display: flex;
      justify-content: center;
    }
  }
`;

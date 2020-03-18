import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Router from "./Components/Router";

export const StoreContext = React.createContext();

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [dispatchedModalOpen, setDispatchedModalOpen] = useState(false);
  const OpenMyModal = () => {
    setModalOpen(true);
  };

  const CloseMyModal = () => {
    setModalOpen(false);
  };

  const OpenDispatchedModal = () => {
    setDispatchedModalOpen(true);
  };

  const CloseDispatchedModal = () => {
    setDispatchedModalOpen(false);
  };
  return (
    <div className="App">
      <StoreContext.Provider
        value={{
          modalOpen,
          OpenMyModal,
          CloseMyModal,
          dispatchedModalOpen,
          OpenDispatchedModal,
          CloseDispatchedModal
        }}
      >
        <Router></Router>
      </StoreContext.Provider>
    </div>
  );
}

export default App;

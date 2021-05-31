import React, {} from "react";
import { Overlay, Content, CloseButton } from "./style";

export const Modal = (props) => {
  const { showModal, handleClose, children } = props;
  return (
    <>
      {showModal && (
        <Overlay className="modalBackdrop" onClick={handleClose}>
          <Content onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={handleClose} className="modalClose">
              <span className="ti-close" />
              {" "}
              Close
            </CloseButton>
            {children}
          </Content>
        </Overlay>
      )}
    </>
  );
};

const ModalContext = React.createContext(null);

export const { Provider: ModalProvider, Consumer: ModalConsumer } = ModalContext;

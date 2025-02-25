import React from "react";
import ReactDOM from "react-dom";
import "./modal.style.scss";
import { IoIosCloseCircleOutline } from "react-icons/io";

interface ModalProps {
  isDisplayed: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isDisplayed, onClose, children }) => {
  const modalRoot = document.getElementById("modals") as HTMLElement;
  if (!isDisplayed) return null;
  return ReactDOM.createPortal(
    <div className="modal-container">
      <button className="modal-close-btn" onClick={onClose}>
        <IoIosCloseCircleOutline size={30} color="red" />
      </button>
      {children}
    </div>,
    modalRoot
  );
};

export default Modal;

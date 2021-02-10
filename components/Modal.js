import React, { useState } from "react";
import Modal from "react-modal";

const ReactModal = ({...props}) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  return <Modal {...props} />;
};

export default ReactModal;

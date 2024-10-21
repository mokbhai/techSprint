import React from 'react';

const FormModal = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center ">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className=" relative bg-white  text-black rounded  overflow-scroll p-5 h-80  ">
        {children}
      </div>
    </div>
  );
};

export default FormModal;

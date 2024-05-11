"use client";

import React from "react";

const Modal = ({ isOpen, onClose, children }: any) => {
  return (
    <>
      {isOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-auto max-w-[400px] p-6 mx-auto my-4 bg-white border border-gray-300 rounded-lg shadow-lg outline-none focus:outline-none">
            <div className="absolute top-2 left-4">
              <button
                className="text-sm text-gray-500 hover:text-gray-600 focus:outline-none"
                onClick={onClose}
              >
                Cerrar
              </button>
            </div>
            <div className="relative flex flex-col w-full max-h-96 overflow-y-auto my-4">{children}</div>
          </div>
        </div>
      ) : null}
      {isOpen ? (
        <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
      ) : null}
    </>
  );
};

export default Modal;

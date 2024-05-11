"use client";

import React from "react";
import { FaWindowClose } from "react-icons/fa";

const Modal = ({ isOpen, onClose, children }: any) => {
  return (
    <>
      {isOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-auto max-w-[400px] p-6 mx-auto my-4 bg-white border border-gray-300 rounded-lg shadow-lg outline-none focus:outline-none">
            <div className="absolute top-2 left-4">
              <button
                className="text-sm text-red-500 hover:text-red-600 focus:outline-none"
                onClick={onClose}
              >
                <FaWindowClose className="w-6 h-6" />
              </button>
            </div>
            <div className="relative flex flex-col w-full max-h-96 overflow-y-auto my-4">
              {children}
            </div>
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

import React from "react";

const Modal = ({
  isOpen,
  onClose,
  numInputs,
}: {
  isOpen: boolean;
  onClose: any;
  numInputs?: number;
}) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Ingrese los datos</h2>
            <div className="flex flex-wrap justify-center items-center">
              {[...Array(numInputs)].map((_, index) => (
                <input
                  key={index}
                  type="text"
                  className="bg-gray-100 m-2 px-3 py-1 rounded-lg"
                  placeholder={`Input ${index + 1}`}
                />
              ))}
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
                onClick={handleClose}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;

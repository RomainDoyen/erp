import { ModalProps } from "../../types/typesUI";

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
        {children}
        <button
          className="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-600"
          onClick={onClose}
        >
          X
        </button>
      </div>
    </div>
  );
}

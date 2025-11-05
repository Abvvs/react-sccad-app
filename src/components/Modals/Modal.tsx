import React from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  width?: string;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, title, children, width = "max-w-lg" }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className={`bg-white rounded-xl shadow-xl w-full ${width} mx-4 p-6 animate-fadeIn`}>
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          {title && <h2 className="text-xl font-bold text-[#5c4a3a]">{title}</h2>}
          <button
            onClick={onClose}
            className="text-[#5c4a3a] hover:text-[#d45500] text-2xl font-bold leading-none"
          >
            ×
          </button>
        </div>

        {/* Content */}
        {children}
      </div>
    </div>
  );
};

export default Modal;
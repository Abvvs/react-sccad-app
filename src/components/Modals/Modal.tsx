import React from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  width?: string;
  maxHeight?: string;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, title, children, width = "max-w-lg", maxHeight = "max-h-[85vh]" }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm overflow-y-auto p-4">
      <div className={`bg-white rounded-xl shadow-xl w-full ${width} ${maxHeight} mx-4 flex flex-col animate-fadeIn my-8`}>
        {/* Header - Fixed */}
        <div className="flex justify-between items-center p-6 pb-4 border-b border-gray-200 shrink-0">
          {title && <h2 className="text-xl font-bold text-[#5c4a3a]">{title}</h2>}
          <button
            onClick={onClose}
            className="text-[#5c4a3a] hover:text-[#d45500] text-2xl font-bold leading-none"
          >
            ×
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="overflow-y-auto flex-1 p-6 pt-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
const Modal = ({ onClose, title, children, footer }) => {
  return (
    <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50 px-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-5xl  shadow-lg">
        {/* Encabezado */}
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="text-red-500 text-2xl font-bold hover:text-red-600"
          >
            ✕
          </button>
        </div>

        {/* Contenido dinámico */}
        <div className="max-h-[60vh] overflow-auto">{children}</div>

        {/* Botones de acción */}
        <div className="flex justify-end gap-4 mt-4">
         {footer}
        </div>
      </div>
    </div>
  );
};

export default Modal;

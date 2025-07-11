const EditButton = ({ onClick } : any) => {
    return (
        <button type="button" onClick={onClick} className="bg-green-dark text-white px-4 py-3 rounded-md w-full sm:w-auto">
            Editar
        </button>
    );
};

export default EditButton;

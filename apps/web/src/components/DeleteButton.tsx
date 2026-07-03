type DeleteButtonProps = {
    onDelete: () => void;
    label: string
}

function DeleteButton({onDelete, label}: DeleteButtonProps)  {

    return (
        <button 
            className="bg-red-700 text-white px-5 py-2 rounded-2xl cursor-pointer"
            onClick={() => onDelete()}
        >
            {label}
        </button>
    )
}
export default DeleteButton
type SimpleButtonProps = {
    label: string
    onClick: () => void;
    mode?: 'default' | 'artylic'
}

function SimpleButton ({label, onClick, mode = 'default'}: SimpleButtonProps) {

    return (
        <button 
            className={` py-2 px-3 rounded-3xl ${mode == 'artylic' ? 'text-white bg-orange-700 hover:bg-orange-600' : 
                'dark:bg-mist-700 hover:dark:bg-mist-600 bg-mist-200 hover:bg-mist-300'}  cursor-pointer`}
            onClick={onClick}
        >
            {label}
        </button>
    )
}
export default SimpleButton
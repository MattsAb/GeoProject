

type ProfileStateButtonProps = {
    onClick: () => void
    label: string
    profileState: string
    buttonState: string
}


function StateButton ({label, onClick, profileState, buttonState}: ProfileStateButtonProps) {


    return (
        <button
            className={`hover:cursor-pointer flex gap-3 font-semibold px-2 py-1 rounded-xl ${profileState == buttonState && "dark:bg-mist-800 bg-mist-300"}`}
            onClick={onClick}
        >
            {label}
        </button>
    )
}

export default StateButton
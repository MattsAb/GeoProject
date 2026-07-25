

type ProfileStateButtonProps = {
    onClick: () => void
    label: string
    profileState: string
    buttonState: string
}


function ProfileStateButton ({label, onClick, profileState, buttonState}: ProfileStateButtonProps) {


    return (
        <button
            className={`hover:cursor-pointer flex gap-3 font-semibold px-2 py-1 rounded-xl ${profileState == buttonState && "bg-mist-800"}`}
            onClick={onClick}
        >
            {label}
        </button>
    )
}

export default ProfileStateButton
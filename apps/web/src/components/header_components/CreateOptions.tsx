import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

type CreateOptionsProps = {
    open: boolean
    onClose: () => void
    createRef: React.RefObject<HTMLElement | null>
}

function CreateOptions ({open, onClose, createRef}: CreateOptionsProps) {

    const navigate = useNavigate();
    
    const ref = useRef<HTMLDivElement>(null)
     
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            const target = e.target as Node;
            const clickedInsideMenu = ref.current?.contains(target);
            const clickedIcon = createRef.current?.contains(target);

            if (!clickedInsideMenu && !clickedIcon) {
                onClose();
            }
        }
        if (open) document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [open, createRef]);

    if (!open) return null;
    
    const goToCreatePost = () => navigate(`/create/post`);
    const goToCreateTrip= () => navigate('/create/trip');

    return (
        <div 
            className="absolute top-14 right-14 w-46 dark:bg-mist-800 bg-mist-100 py-3 px-5 rounded-xl z-50 flex flex-col shadow-2xl"
            ref={ref}
        >
            <button 
                className="hover:dark:bg-mist-700 hover:bg-mist-200 text-left p-2 rounded-xl cursor-pointer"
                onClick={() => {
                    goToCreatePost()
                    onClose()
                }}
                > Create post </button>

            <button 
                className="hover:dark:bg-mist-700 hover:bg-mist-200  text-left p-2 rounded-xl cursor-pointer"
                onClick={() => {
                    goToCreateTrip()
                    onClose()
                }}
            > Create Trip </button>
        </div>
    )
}

export default CreateOptions
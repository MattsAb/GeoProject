import { HandThumbUpIcon } from "@heroicons/react/20/solid"
import { useNavigate } from "react-router-dom"

type PostComponentProps = {
    photoUrl: string
    likes: number
    id: string
}

function PostComponent ({photoUrl, likes, id}: PostComponentProps) {

    const navigate = useNavigate();

    const handleImage = () => navigate(`/post/${id}`);

    return (
        
        <button 
            className=" mb-4 rounded-lg  bg-gray-100  dark:bg-mist-900 flex-3 cursor-pointer overflow-hidden relative group
            shadow-gray-400 dark:shadow-black shadow-2xl hover:dark:bg-mist-700 transition-colors duration-100 ease-in-out hover:bg-mist-200"
        onClick={() => handleImage()}
        >
            <div>
                <img src={photoUrl} className="w-full h-75 object-cover" />
            </div>

            <div className=" absolute flex right-3 bottom-2 gap-3 items-center dark:bg-mist-800 text-white rounded-2xl px-2 py-1">
                <HandThumbUpIcon className={`h-5 w-5`}/>
                <h2 className="">{likes}</h2>
            </div>

            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"/>
        </button>
    )
}

export default PostComponent;
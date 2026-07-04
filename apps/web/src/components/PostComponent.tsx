import { useNavigate } from "react-router-dom"

type PostComponentProps = {
    photoUrl: string
    username: string
    countryCode: string
    likes: number
    id: string
}

function PostComponent ({photoUrl, username, countryCode, likes, id}: PostComponentProps) {

    const navigate = useNavigate();

    const handleImage = () => navigate(`/post/${id}`);

    return (
        
        <button 
            className=" mb-4 relative rounded-lg overflow-hidden dark:bg-mist-800 bg-gray-100 cursor-pointer
            shadow-gray-400 dark:shadow-black shadow-2xl hover:dark:bg-mist-700 transition-colors duration-100 ease-in-out hover:bg-mist-200"
        onClick={() => handleImage()}
        >
            <div>
                <img src={photoUrl} className="w-100 h-75 object-cover" />
            </div>
            <div className="absolute top-3 right-3"> 
                <span className={`fi fi-${countryCode.toLowerCase()}` }></span>
            </div>
            <div className="flex flex-col justify-around p-2">
                <h1 className="self-start font-semibold"> by: {username} </h1>
                <h2 className="self-end"> Likes: {likes}</h2>
            </div>
        </button>
    )
}

export default PostComponent;
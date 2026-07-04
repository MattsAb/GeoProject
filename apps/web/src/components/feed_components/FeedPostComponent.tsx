import { HandThumbUpIcon } from "@heroicons/react/20/solid"
import { useNavigate } from "react-router-dom"

type PostComponentProps = {
    photoUrl: string
    username: string
    countryCode: string
    avatar: string
    likes: number
    id: string
    userId: string
}

function PostComponent ({photoUrl, username, countryCode, avatar, likes, id, userId}: PostComponentProps) {

    const navigate = useNavigate();

    const handlePostImage = () => navigate(`/post/${id}`);
    const handleProfileNavigate = () => navigate(`/profile/${userId}`)

    return (
        
        <div
            className=" mb-4 flex relative rounded-lg overflow-hidden dark:bg-mist-800 bg-gray-100 max-w-150
            shadow-gray-400 dark:shadow-black shadow-2xl"
        >

        <button 
            className="dark:bg-mist-900 flex-3 cursor-pointer overflow-hidden relative group"
            onClick={() => handlePostImage()}
        >
            <img 
                src={photoUrl} 
                className="w-full h-75 object-cover transition-transform duration-300 ease-in-out group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"/>

            <div className="absolute top-3 left-3 dark:bg-mist-800 px-2 py-2 rounded-full"> 
                <span className={`fi fi-${countryCode.toLowerCase()}` }></span>
            </div>
        </button>

            <div className="flex flex-1 flex-col dark:bg-mist-900">
                <button 
                    className="cursor-pointer h-50"
                    onClick={() => handleProfileNavigate()}
                >
                    <img src={avatar}/>
                </button>
                <div className="flex flex-col h-full justify-between p-2">
                    <h1 className=" font-semibold self-start"> {username} </h1>
                    <div className="flex self-end gap-2 items-center dark:bg-mist-800 rounded-2xl px-2 py-1">
                         <h2 className="">{likes}</h2>
                        <HandThumbUpIcon className={`h-5 w-5`}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostComponent;
import type { Post } from "@geoapp/types"
import ErrorMessageComponent from "../simple_components/ErrorMessageComponent"
import { HandThumbUpIcon } from '@heroicons/react/24/solid';
import { HandThumbUpIcon  as HandThumbUpIconOutline} from "@heroicons/react/24/outline";
import SimpleButton from "../simple_components/SimpleButton";
import { useNavigate } from "react-router-dom";
import GoogleMapsCredentialsWhite from "../../assets/GoogleMaps_Logo_White.svg"
import GoogleMapsCredentialsDark from "../../assets/GoogleMaps_Logo_DarkGray.svg"

type PostInfoProps = {
    postInfo: Post | undefined
    errorMessage: string
    isAuth: boolean
    isLiked: boolean
    postLikes: number
    canEdit: boolean
    id: string | undefined
    handleLike: () => void
}

function PostInfoComponent ({postInfo, errorMessage, isAuth, isLiked, postLikes, canEdit, id, handleLike}: PostInfoProps) {

        const navigate = useNavigate();
    
        const goToProfile = () => navigate(`/profile/${postInfo?.userId}`)
        const goToEdit = () => navigate(`/edit/${id}`);

    return (
        <div className="flex flex-col">
            <img src={postInfo?.photoUrl} className="w-full object-contain max-h-200 rounded dark:bg-mist-900 bg-mist-100 mb-2" />
            <ErrorMessageComponent message={errorMessage}/>
            <div className="flex flex-col items-center gap-3">
                <div className="flex items-center gap-1 self-start">
                    <button 
                        onClick={() => goToProfile()}
                        className="bg-mist-500 p-0.5 rounded-full cursor-pointer"
                    >
                        <img 
                            className="w-12 h-12 rounded-full"
                            src={postInfo?.user.avatarUrl}
                        />
                    </button>

                    <h2 className="font-bold text-xl ">{postInfo?.user.username}</h2>
                </div>
                    <div className="self-start items-center flex gap-3">
                        <h2>Place:</h2>
                        <a 
                            className="text-blue-400"
                            href={`/place/${postInfo?.place.id}`}
                        >
                            {postInfo?.place.placeName}
                        </a>
                        <img src={GoogleMapsCredentialsDark} className="block dark:hidden" alt="Google Maps" />
                        <img src={GoogleMapsCredentialsWhite} className="hidden dark:block" alt="Google Maps" />
                    </div>
                    <button
                        disabled={!isAuth}
                        className="dark:bg-mist-700 py-1 px-4 flex gap-3 items-center ml-auto rounded-full cursor-pointer"
                        onClick={handleLike}
                    >
                        {!isLiked ? (<HandThumbUpIconOutline className={`h-6 w-6`}/>) : (<HandThumbUpIcon className={`h-6 w-6`}/> )}
                        <h2 className="font-bold text-xl">{postLikes}</h2>
                    </button>

            </div>

            <p>{postInfo?.description}</p>

            { canEdit && <div className="self-end">
                <SimpleButton 
                    onClick={() => goToEdit()}
                    label="Edit post"
                />
            </div>}

        </div>
    )
}

export default PostInfoComponent
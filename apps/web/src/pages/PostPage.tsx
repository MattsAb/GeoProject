import { useNavigate, useParams } from "react-router-dom";
import { HandThumbUpIcon } from '@heroicons/react/24/solid';
import { HandThumbUpIcon  as HandThumbUpIconOutline} from "@heroicons/react/24/outline";
import SimpleButton from "../components/SimpleButton";
import { useEffect, useState } from "react";
import CommentComponent from "../components/CommentComponent";
import { useAuth } from "../context/AuthContext";
import type { Post } from "@geoapp/types";
import { getPost } from "../services/post.api";
import { likePost, unlikePost } from "../services/like.api";
import { postComment } from "../services/comment.api";
import ErrorMessageComponent from "../components/ErrorMessageComponent";

function PostPage () {

    const [commentMode, setCommentMode] = useState(false);
    const [userComment, setUserComment] = useState('');
    const [postInfo, setPostInfo] = useState<Post>();
    const [postLikes, setPostLikes] = useState<number>(0);
    const [isLiked, setIsLiked] = useState(false);
    const [canEdit, setCanEdit] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const { id } = useParams();
    const navigate = useNavigate();

    const {user, isLoading, isAuthenticated} = useAuth();
    
    useEffect(() => {

        async function getInfo() {
            if (!id) return;
            if (!isLoading) return;

            setIsLiked(false)
            setCanEdit(false)
            const result = await getPost(id);
            if (result.success && result.data) {
                setPostInfo(result.data);
                setPostLikes(result.data._count?.likes || 0);

                if (result.data.likes?.length) setIsLiked(true);
                if (result.data.userId == user?.id) setCanEdit(true);

            } else if (result.error) {
                setErrorMessage(result.error);
            }
        }
        getInfo();
    },[id, isLoading, user])

    async function handleComment() {
        if (userComment == '' || !id) return;
        const result = await postComment(id, userComment)
        if (result.success && result.data) {
            setUserComment('');
            setCommentMode(false);
            setPostInfo(prev => {
                if (!prev || !result.data) return prev
                return {
                    ...prev,
                    comments: [...prev.comments, result.data]
                }
            })
        }

    }

    async function handleLike() {
        if (!id) return;
        console.log(isLiked)
        let result;
        if (!isLiked){
            result = await likePost(id);
        } else {
            result = await unlikePost(id);
        }

        if (result.success) {
            setIsLiked(!isLiked);
            isLiked ? setPostLikes(postLikes - 1) : setPostLikes(postLikes + 1);
        } else if (result.error) {
            setErrorMessage(result.error)
        }
    }

    const goToProfile = () => navigate(`/profile/${postInfo?.userId}`)
    const goToEdit = () => navigate(`/edit/${id}`);

    return (
        <div className="flex shadow-2xl mt-10 dark:shadow-none">
            <div className="flex-3 px-5 flex items-center justify-center">
                <div className="py-10 px-5 dark:bg-mist-800 rounded-2xl flex flex-col gap-3 w-full xl:w-2/3 "> 
                    <img src={postInfo?.photoUrl} className="w-full object-contain max-h-200 rounded dark:bg-mist-900 bg-mist-200" />
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

                            <button
                                disabled={!isAuthenticated}
                                className="dark:bg-mist-700 py-1 px-4 flex gap-3 items-center ml-auto rounded-full cursor-pointer"
                                onClick={() => handleLike()}
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
                <div className="mt-10">
                   {  isAuthenticated && <div className="dark:bg-mist-800 rounded-2xl p-5 flex flex-col gap-5">
                        <h1 className="text-2xl ml-5"> Leave a comment </h1>
                        <textarea 
                        onClick={() => setCommentMode(true)}
                        value={userComment}
                        onChange={(e) => setUserComment(e.target.value)}
                        rows={commentMode ? 2 : 1} 
                        className="w-full p-3 border-b dark:border-mist-700 resize-none"/>
                        {commentMode && <div className="self-end flex gap-5 mr-5">
                            <SimpleButton label="Cancel" onClick={() => setCommentMode(false)}/>
                            <SimpleButton label="Comment" onClick={() => handleComment()}/>
                        </div>}
                    </div>}

                    <div className="mt-10">

                     <div className="flex items-center text-2xl ml-5 gap-3">
                            <p> {postInfo?._count?.comments}</p>
                            <p> comments </p>
                    </div>

                        {postInfo?.comments  && ( <div className="mt-10 flex flex-col gap-5 dark:bg-mist-800 rounded-2xl pb-5">
                            
                                    {postInfo.comments.map((comment) => (
                                        <CommentComponent 
                                            username={comment.user.username}
                                            body={comment.body}
                                            key={comment.id}
                                            avatar={comment.user.avatarUrl ?? ''}
                                            ids={[comment.userId, postInfo.userId]}
                                            userId={user?.id}
                                            id={comment.id}
                                            postId={comment.postId}
                                        />
                                    ))}
                        </div>)}
                    </div>
                    
                </div>
            </div>
            </div>
        </div>
    )
}

export default PostPage
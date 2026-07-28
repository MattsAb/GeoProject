import { useParams } from "react-router-dom";
import SimpleButton from "../components/simple_components/SimpleButton";
import { useEffect, useState } from "react";
import CommentComponent from "../components/post_Page_Components/CommentComponent";
import { useAuth } from "../context/AuthContext";
import type { Post } from "@geoapp/types";
import PostInfoComponent from "../components/post_Page_Components/PostInfoComponent";
import { getPost, likePost, postComment, unlikePost } from "@geoapp/services";
import PostPageGhostComponent from "../components/post_Page_Components/postPageGhostComponent";

function PostPage () {

    const [commentMode, setCommentMode] = useState(false);
    const [userComment, setUserComment] = useState('');
    const [postInfo, setPostInfo] = useState<Post>();
    const [postLikes, setPostLikes] = useState<number>(0);
    const [isLiked, setIsLiked] = useState(false);
    const [canEdit, setCanEdit] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const { id } = useParams();

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

    if (!postInfo) {
        return (<PostPageGhostComponent/>)
    }

    return (
        <div className="flex mt-10">
            <div className="flex-3 px-5 flex items-center justify-center">
                <div className="py-10 px-5 dark:bg-mist-800 bg-mist-100 rounded-2xl flex flex-col gap-3 w-full xl:w-2/3 "> 

                {/* Post Information */}
                <PostInfoComponent
                    postInfo={postInfo}
                    id={id}
                    errorMessage={errorMessage}
                    isAuth={isAuthenticated}
                    isLiked={isLiked}
                    postLikes={postLikes}
                    canEdit={canEdit}
                    handleLike={() => handleLike()}
                />

                {/* post Comment */}
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


                    {/* Comments */}
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
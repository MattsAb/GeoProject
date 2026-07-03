import { useNavigate } from "react-router-dom";
import { HandThumbUpIcon } from "@heroicons/react/16/solid";
import img1 from "../assets/pexels-renso-villarreal-2152599962-33797291.jpg"
import SimpleButton from "../components/SimpleButton";
import { useState } from "react";
import CommentComponent from "../components/CommentComponent";

function PostPage () {

    const [commentMode, setCommentMode] = useState(false);
    const [userComment, setUserComment] = useState('');

    const navigate = useNavigate();

    const goToProfile = () => console.log('profile');

    async function handleLike () {}
    async function handleComment() {}

    return (
        <div className="flex w-full h-full justify-center">
            <div className="p-10 dark:bg-mist-800 rounded-2xl flex flex-col gap-3 w-2/3 mt-10">
                <img src={img1} className="w-full object-contain max-h-175 rounded dark:bg-mist-900 bg-mist-200"/>
                <div className="flex items-center gap-5">
                    <button 
                        onClick={() => goToProfile()}
                        className="bg-mist-500 p-0.5 rounded-full self-baseline cursor-pointer"
                    >
                        <img 
                            className="w-12 h-12 rounded-full"
                            src={img1}
                        />
                    </button>
                    <h1 className="font-semibold text-xl"> TestUser </h1>
                </div>

                <button className="dark:bg-mist-700 py-2 px-4 flex gap-3 items-center ml-auto rounded-full cursor-pointer"
                    onClick={() => handleLike()}
                >
                    <HandThumbUpIcon className={`h-6 w-6`}/>
                    <h2 className="font-bold text-xl">{5}</h2>
                </button>

                <p> some long description I guess</p>

                    <div className="dark:bg-mist-800 rounded-2xl p-5 flex flex-col gap-5">
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
                    </div>

                    <div>
                    </div>

            </div>
        </div>
    )
}

export default PostPage;


import { useState } from "react";
import ErrorMessageComponent from "../simple_components/ErrorMessageComponent";
import DeleteButton from "../simple_components/DeleteButton"
import { deleteComment } from "../../services/comment.api";

type CommentComponentProps = {
    username: string
    body: string
    avatar: string,
    ids: [string, string];
    userId?: string;
    postId: string;
    id: string;
}

function CommentComponent({username, body, avatar, ids, userId, postId, id}: CommentComponentProps) {

    const [isVisible, setIsVisible] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    const canDelete = ids.some((id) => id == userId);

    if (!isVisible) return null;

    async function handleDelete() {
        const result = await deleteComment(`${postId}`, `${id}`);
        if (result.success) {
            setIsVisible(false);
        } else if (result.error) {
            setErrorMessage(result.error);
        }
    }

    return (
        <div className="flex flex-col lg:flex-row justify-between items-center">
            <div className="p-8 rounded-xl flex gap-4">
                <img 
                    className="rounded-full w-10 h-10"
                    src={avatar}
                />
                <div className="flex flex-col gap-3">
                    <h1 className="font-bold"> {username} </h1>
                    <p> {body} </p>
                </div>
            </div>
            {canDelete &&
                <div className="mr-10 flex gap-5 items-center">
                    <ErrorMessageComponent message={errorMessage}/>
                    <DeleteButton 
                        label="Delete"
                        onDelete={() => handleDelete()}
                    />
                </div>
            }
        </div>
    )
}

export default CommentComponent
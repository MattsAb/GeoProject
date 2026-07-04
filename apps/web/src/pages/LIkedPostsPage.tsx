import { useEffect, useState } from "react"
import ErrorMessageComponent from "../components/simple_components/ErrorMessageComponent";
import { useAuth } from "../context/AuthContext";
import type { Post } from "@geoapp/types";
import { getLikedPosts } from "@geoapp/services";
import PostComponent from "../components/feed_components/FeedPostComponent";

function LikedPostsPage () {

    const {user} = useAuth();

    const [likedPosts, setLikedPosts] = useState<Post[]>();
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        async function fetchLikes () {

            const result = await getLikedPosts(`${user?.id}`);

            if (result.success && result.data) {
                setLikedPosts(result.data)
            } else if (result.error) {
                setErrorMessage(result.error);
            }

        }
        fetchLikes()
    },[])

    return (
        <div className="w-full flex justify-center">
            <div className="2xl:w-2/3 w-full px-5">
                <h1 className="text-2xl mb-5 "> {likedPosts?.length ? "Your Liked Posts" : "No liked posts"} </h1>
                <div className="break-inside-avoid columns-1 lg:columns-2 gap-4">
                    <ErrorMessageComponent message={errorMessage}/>
                    {likedPosts && (
                        likedPosts.map((post) => (
                            <PostComponent
                                key={post.id}
                                id={post.id}
                                photoUrl={post.photoUrl}
                                username={post.user.username}
                                avatar={post.user.avatarUrl}
                                userId={post.user.id}
                                countryCode={post.countryCode}
                                likes={post._count?.likes || 0}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
export default LikedPostsPage
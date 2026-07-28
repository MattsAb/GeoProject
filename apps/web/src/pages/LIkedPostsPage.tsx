import { useEffect, useState } from "react"
import ErrorMessageComponent from "../components/simple_components/ErrorMessageComponent";
import { useAuth } from "../context/AuthContext";
import type { Post } from "@geoapp/types";
import { getLikedPosts } from "@geoapp/services";
import PostComponent from "../components/feed_components/FeedPostComponent";
import ComponentLoader from "../components/simple_components/ComponentLoader";
import ProfileGhostComponent from "../components/profile_components/ProfileGhostComponent";

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

                    <ErrorMessageComponent message={errorMessage}/>

                    <ComponentLoader
                        isLoaded={likedPosts ? true : false}
                        gapSize={4}
                        columnNum={{small: 1, medium: 2, large: 2}}
                        ghostComponent={<ProfileGhostComponent/>}
                        ghostCount={8}
                        loadedComponent={
                            <>
                            {likedPosts?.map((post) => (
                                <PostComponent
                                    key={post.id}
                                    id={post.id}
                                    username={post.user.username}
                                    avatar={post.user.avatarUrl}
                                    photoUrl={post.photoUrl}
                                    countryCode={post.countryCode}
                                    likes={post._count?.likes || 0}
                                    userId={post.userId}
                                />
                            ))}
                            </>
                        }
                    />

            </div>
        </div>
    )
}
export default LikedPostsPage
import { getUserPosts } from "@geoapp/services";
import type { Post } from "@geoapp/types";
import { useEffect, useState } from "react";
import ImageComponent from "../profile_components/PostComponent";

type PostComponentProps = {
    id?: string
}

function ProfilePostsComponent ({id}: PostComponentProps) {

    const [posts, setPosts] = useState<Post[]>()
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        async function getProfilePosts () {
            if (!id) return
            

            const result = await getUserPosts(id);

            if (result.success && result.data) {
                setPosts(result.data)
            }
            else {
                if (result.error)
                {
                    setErrorMessage(result.error)
                }
            }

        }
        getProfilePosts()
    }, [id]) 

    return (
            <>
                <div className="flex gap-2 items-center font-bold text-2xl">
                    <h1> {posts?.length}</h1>
                    <h1> Posts </h1>
                </div>

                { posts && <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    
                        {posts.map((post) => (
                            <ImageComponent
                            key={post.id}
                            photoUrl={post.photoUrl}
                            countryCode={post.countryCode}
                            likes={post._count?.likes || 0}
                            id={post.id}
                            />
                        ))}
                    
                </div>} 
            </>
    )

}

export default ProfilePostsComponent
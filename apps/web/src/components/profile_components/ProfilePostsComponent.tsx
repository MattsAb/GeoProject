import { getUserPosts } from "@geoapp/services";
import type { Post } from "@geoapp/types";
import { useEffect, useState } from "react";
import ImageComponent from "../profile_components/PostComponent";
import ProfileGhostComponent from "./ProfileGhostComponent";
import ComponentLoader from "../simple_components/ComponentLoader";
import ErrorMessageComponent from "../simple_components/ErrorMessageComponent";

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

                <ErrorMessageComponent message={errorMessage}/>

                <ComponentLoader
                    isLoaded={posts ? true : false}
                    columnNum={{small: 1, medium: 2, large: 3}}
                    gapSize={2}
                    ghostComponent={<ProfileGhostComponent/>}
                    ghostCount={9}
                    loadedComponent={
                        <>
                        {posts?.map((post) => (
                            <ImageComponent
                                key={post.id}
                                id={post.id}
                                photoUrl={post.photoUrl}
                                likes={post._count?.likes || 0}
                            />
                        ))}
                        </>
                    }

                />
            </>
    )

}

export default ProfilePostsComponent
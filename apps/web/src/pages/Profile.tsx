import { useEffect, useState } from "react"
import ImageComponent from "../components/PostComponent";
import SimpleButton from "../components/SimpleButton"
import ErrorMessageComponent from "../components/ErrorMessageComponent";
import { useParams } from "react-router-dom";
import type { User } from "@geoapp/types";

import img1 from "../assets/pexels-michelle-cuaya-1311865844-27349112.jpg"


function Profile () {

    const [profile, setProfile] = useState<User>()
    const [ownProfile, setOwnProfile] = useState(false);
    const [followerCount, setFollowerCount] = useState(0);
    const [isfollowed, setIsFollowed] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const { id } = useParams();

    async function handleFollow() {}

    return (
        <div 
            className="w-full flex flex-col"
            data-testId="userProfile"
            >
            
            <div className="w-full dark:bg-mist-800 py-15 flex gap-10 shadow-2xl">
                { <> <img src={img1} className="w-30 h-30 rounded-full ml-18"/>
                <div className="flex flex-col gap-5 w-1/3 justify-center">
                    <h1 className="font-bold text-2xl"> testUser </h1>
                    <div className="flex gap-5 items-center">
                        { !ownProfile && <SimpleButton label={isfollowed ? "Unfollow" : "Follow"} onClick={() => handleFollow()}/>}
                        <p className="font-bold text-2xl"> Followers: </p>
                        <p className="font-bold text-2xl"> 3 </p>
                    </div>
                    <p className="overflow-auto wrap-break-word"> some random profile bio </p>
                </div>

                 </>}
                <ErrorMessageComponent message={errorMessage}/>
            </div>

            <div className="w-full lg:w-3/4 md:w-4/5 dark:bg-mist-800 h-full self-center mt-10 p-10 rounded-2xl flex flex-col gap-10 shadow-2xl">
                <div className="flex gap-2 items-center font-bold text-2xl">
                    <h1> {profile?._count?.posts ? profile?._count?.posts : 0}</h1>
                    <h1> Posts </h1>
                </div>
                { profile?.posts && <div className="columns-2 md:columns-3 lg:columns-4 gap-4 w-full">
                    
                        {profile.posts.map((post) => (
                            <ImageComponent
                            key={post.id}
                            location={post.countryCode}
                            photoUrl={post.photoUrl}
                            username={post.user.username}
                            likes={post._count?.likes || 0}
                            id={post.id}
                            />
                        ))}
                    
                </div>} 
            </div>
        </div>
    )
}

export default Profile
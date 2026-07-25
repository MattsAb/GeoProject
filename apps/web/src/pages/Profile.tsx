import { useEffect, useState } from "react"
import SimpleButton from "../components/simple_components/SimpleButton"
import ErrorMessageComponent from "../components/simple_components/ErrorMessageComponent";
import { useParams } from "react-router-dom";
import type { ProfileType } from "@geoapp/types";
import { useAuth } from "../context/AuthContext";
import { followUser, getUserProfile, unfollowUser } from "@geoapp/services";
import ProfilePostsComponent from "../components/profile_components/ProfilePostsComponent";
import ProfileTripsComponent from "../components/profile_components/ProfileTripsComponent";


function Profile () {

    const [profile, setProfile] = useState<ProfileType>()
    const [ownProfile, setOwnProfile] = useState(false);
    const [followerCount, setFollowerCount] = useState(0);
    const [isfollowed, setIsFollowed] = useState(false);
    const [ProfileState, setProfileState] = useState<'POSTS' | 'TRIPS'>('POSTS')
    const [errorMessage, setErrorMessage] = useState<string>('');

    const { id } = useParams();
    const {user} = useAuth();

    useEffect(() => {
        async function getProfile () {
            if (!id) return
            
            setOwnProfile(false)
            const result = await getUserProfile(id);

            if (result.success && result.data) {
                setProfile(result.data)
                setFollowerCount(result.data._count.followers);
                if(result.data.followers.length > 0) setIsFollowed(true);
                if(result.data.id == `${user?.id}`) setOwnProfile(true);
            }
            else {
                if (result.error)
                {
                    setErrorMessage(result.error)
                }
            }

        }
        getProfile()
    }, [id]) 

    async function handleFollow() {
        if (!id) return;
        let result;
        if( !isfollowed)
        {
            result = await followUser(id);
        } else {
            result = await unfollowUser(id);
        }

        if (result.success)
        {
            setIsFollowed(!isfollowed);
            isfollowed ? setFollowerCount(followerCount - 1) : setFollowerCount(followerCount + 1);
        }
        else if (result.error) {
            setErrorMessage(result.error)
        }
    }

    return (
        <div 
            className="w-full flex flex-col"
            >
            {/* Banner */}
            <div className="w-full dark:bg-mist-800 py-15 flex gap-10 shadow-2xl">

                { <> <img src={profile?.avatarUrl} className="w-30 h-30 lg:ml-10 ml-4  rounded-full"/>
                
                <div className="flex flex-col gap-5 w-1/3 justify-center">
                    <h1 className="font-bold text-2xl"> {profile?.username} </h1>
                    <div className="flex flex-col gap-5 items-center self-start">
                        { !ownProfile && <SimpleButton label={isfollowed ? "Unfollow" : "Follow"} onClick={() => handleFollow()}/>}
                        <div className="flex gap-2 self-start">
                            <p className="font-bold"> Followers: </p>
                            <p className="font-bold"> {followerCount} </p>
                        </div>
                    </div>
                    <p className="overflow-auto wrap-break-word"> {profile?.bio} </p>
                </div>

                 </>}
                <ErrorMessageComponent message={errorMessage}/>
            </div>
                <div className="my-5 flex gap-3 f-full justify-center">
                    <SimpleButton 
                    label="posts" 
                    onClick={() => setProfileState('POSTS')}
                    />
                    <SimpleButton 
                    label="trips" 
                    onClick={() => setProfileState('TRIPS')}
                    />
                </div>
            {
                ProfileState == 'POSTS' ? (
                <ProfilePostsComponent id={id}/>
                ) : (
                    <ProfileTripsComponent id={id}/>
                )
            }
        </div>
    )
}

export default Profile
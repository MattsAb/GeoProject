import { getFollows } from "@geoapp/services";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import type { Follow } from "@geoapp/types";
import UserFollowComponent from "../components/follow_components/UserFollowComponent";
import ErrorMessageComponent from "../components/simple_components/ErrorMessageComponent";


function UserFollows () {

    const [follows, setFollows] = useState<Follow[]>()
    const [errorMessage, setErrorMessage] = useState('')

    const {user} = useAuth()

    useEffect(() => {
        async function getInfo() {
            if (!user) return
            const result = await getFollows(user.id)

            if (result.success && result.data) {
                setFollows(result.data)
            } else if (result.error) {
                setErrorMessage(result.error)
            }
        }
        getInfo()
    },[user])


    return (
        <div className="w-full h-full flex flex-col items-center p-5">
            <div className="flex flex-col gap-5 w-full lg:w-1/2 mt-10">
                <h1 className="text-2xl font-semibold"> People you follow </h1>
                <ErrorMessageComponent message={errorMessage}/>
                <div>
                    {follows?.map((follow) => (
                        <UserFollowComponent
                            key={follow.id}
                            user={follow.followed}
                        />
                    ))}
                </div>
            </div>
        </div> 
    )
}

export default UserFollows
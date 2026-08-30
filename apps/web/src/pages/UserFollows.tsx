import { getFollows } from "@geoapp/services";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import type { Follow } from "@geoapp/types";
import UserComponent from "../components/user_components/UserComponent";
import ErrorMessageComponent from "../components/simple_components/ErrorMessageComponent";
import ComponentLoader from "../components/simple_components/ComponentLoader";
import FollowGhostComponent from "../components/user_components/UserGhostComponent";

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

                    <ComponentLoader
                        isLoaded={follows ? true : false}
                        gapSize={0}
                        columnNum={{small: 1, medium: 1, large: 1}}
                        ghostComponent={<FollowGhostComponent/>}
                        ghostCount={8}
                        loadedComponent={
                            <div className="flex flex-col gap-4">
                            {follows?.map((follow) => (
                                <UserComponent
                                    user={follow.followed}
                                />
                            ))}
                            </div>
                        }
                    />
            </div>
        </div> 
    )
}

export default UserFollows
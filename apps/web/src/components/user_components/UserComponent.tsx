import type { User } from "@geoapp/types"
import { useNavigate } from "react-router-dom"


type UserFollowProps = {
    user: User
}

function UserComponent ({user}: UserFollowProps) {

    const navigate = useNavigate()
    const goToFollow = () => navigate(`/profile/${user.id}`)

    return (
        <button 
            className="flex gap-4 dark:bg-mist-800 bg-mist-200 rounded-xl p-5 w-full cursor-pointer"
            onClick={() => goToFollow()}
        >
            <img src={user.avatarUrl} className="w-15 h-15 rounded-full"/>
            <div className="flex flex-col gap-3">
                <h1 className="font-semibold"> {user.username} </h1>
                <h2> Followers: {user._count?.followers}</h2>
            </div>
        </button>
    )
}

export default UserComponent
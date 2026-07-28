import type { Trip } from "@geoapp/types"
import { useNavigate } from "react-router-dom"

type FeedTripProps = {
    trip: Trip
}


function FeedTripComponent({trip}: FeedTripProps) {

    const navigate = useNavigate()
    const goToTrip = () => navigate(`/trip/${trip.id}`)

    return (
        <button
            className=" mb-4 rounded-lg  bg-gray-100  dark:bg-mist-900 flex-3 cursor-pointer overflow-hidden relative group
             shadow-gray-400 dark:shadow-black shadow-2xl hover:dark:bg-mist-700 transition-colors duration-100 ease-in-out hover:bg-mist-200"
            onClick={() => goToTrip()}
        >
            <div>
                <img src={trip.photoUrl} className="w-full h-75 object-cover" />
            </div>
            <div className="w-full h-full p-2 font-semibold ">
                <h1 className="my-2 self-start flex"> {trip.title} </h1>
                <div className="flex gap-3 items-center">
                    <img src={trip.user?.avatarUrl} className="w-10 h-10 rounded-full"/>
                    <h1> {trip.user?.username} </h1>
                </div>
            </div>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"/>
        </button>
    )
}

export default FeedTripComponent
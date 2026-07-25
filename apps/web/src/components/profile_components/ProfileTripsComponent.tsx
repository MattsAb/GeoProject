import type { Trip } from "@geoapp/types";
import { useEffect, useState } from "react";
import TripComponent from "./TripComponent";
import { getUserTrips } from "@geoapp/services";

type TripsComponentProps = {
    id?: string
}

function ProfileTripsComponent ({id}: TripsComponentProps) {

    const [trips, setTrips] = useState<Trip[]>()
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        async function getProfilePosts () {
            if (!id) return
            

            const result = await getUserTrips(id);

            if (result.success && result.data) {
                setTrips(result.data)
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
        <div className="w-full lg:w-3/4 dark:bg-mist-800 h-full self-center  p-10 rounded-2xl flex flex-col gap-10 shadow-2xl">

            <div className="flex gap-2 items-center font-bold text-2xl">
                <h1> {trips?.length}</h1>
                <h1> Trips </h1>
            </div>

            { trips && <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                
                    {trips.map((trip) => (
                        <TripComponent
                        key={trip.id}
                        title={trip.title}
                        photoUrl={trip.photoUrl}
                        id={trip.id}
                        />
                    ))}
                
            </div>} 
        </div>
    )

}

export default ProfileTripsComponent
import type { Trip } from "@geoapp/types";
import { useEffect, useState } from "react";
import TripComponent from "./TripComponent";
import { getUserTrips } from "@geoapp/services";
import ComponentLoader from "../simple_components/ComponentLoader";
import ProfileGhostComponent from "./ProfileGhostComponent";
import ErrorMessageComponent from "../simple_components/ErrorMessageComponent";

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
        <>
            <div className="flex gap-2 items-center font-bold text-2xl">
                <h1> {trips?.length}</h1>
                <h1> Trips </h1>
            </div>

                <ErrorMessageComponent message={errorMessage}/>

                <ComponentLoader
                    isLoaded={trips ? true : false}
                    gapSize={0}
                    columnNum={{small: 1, medium: 1, large: 1}}
                    ghostComponent={<ProfileGhostComponent/>}
                    ghostCount={3}
                    loadedComponent={
                        <>
                        {trips?.map((trip) => (
                            <TripComponent
                                key={trip.id}
                                id={trip.id}
                                photoUrl={trip.photoUrl}
                                title={trip.title}
                            />
                        ))}
                        </>
                    }

                />
        </>
    )

}

export default ProfileTripsComponent
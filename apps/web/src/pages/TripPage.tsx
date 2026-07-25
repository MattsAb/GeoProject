import { getTripInfo } from "@geoapp/services";
import type { Trip } from "@geoapp/types"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";

import ImageComponent from "../components/profile_components/PostComponent";
import SimpleButton from "../components/simple_components/SimpleButton";


function TripPage () {

    const [trip, setTrip] = useState<Trip>()
    const [countryCodes, setCountryCodes] = useState<string[]>()
    const [errorMessage, setErrorMessage] = useState('');

    const { id } = useParams();
    const navigate = useNavigate()

    const goToEdit = () => navigate(`/trip/edit/${id}`);

    useEffect(() => {
        async function getInfo() {
            if (!id) return;
            const result = await getTripInfo(id)
            if (result.success && result.data) {
                setTrip(result.data)
            } else if (result.error) {
                setErrorMessage(result.error)
            }

        }
        getInfo()
    },[id])

    return (
        <div className="flex flex-col">
            <div className="dark:bg-mist-800 mx-5 my-5 rounded-xl flex flex-col gap-5 p-5">
                <h1 className="text-2xl"> {trip?.title} </h1>
                <h2> {trip?.description}</h2>
                <div className="w-full flex justify-end px-5 pb-5">
                    <SimpleButton 
                    label="Edit trip"
                    onClick={() => goToEdit()}
                    />
                </div>
            </div>

            <div className="dark:bg-mist-800 mx-5 my-5 lg:w-4/5 self-center rounded-xl flex flex-col gap-5 p-5">
                { trip?.posts && <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    
                        {trip.posts.map((post) => (
                            <ImageComponent
                            key={post.id}
                            photoUrl={post.photoUrl}
                            countryCode={post.countryCode}
                            likes={post._count?.likes || 0}
                            id={post.id}
                            />
                    ))}
                </div>} 

            </div>
        </div>
    )
}

export default TripPage
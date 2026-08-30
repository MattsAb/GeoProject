import { getTripInfo } from "@geoapp/services";
import type { Trip } from "@geoapp/types"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";

import ImageComponent from "../components/profile_components/PostComponent";
import SimpleButton from "../components/simple_components/SimpleButton";
import ErrorMessageComponent from "../components/simple_components/ErrorMessageComponent";
import { useAuth } from "../context/AuthContext";


function TripPage () {

    const [trip, setTrip] = useState<Trip>();
    const [canEdit, setCanEdit] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const {user} = useAuth();

    const { id } = useParams();
    const navigate = useNavigate()

    const goToEdit = () => navigate(`/trip/edit/${id}`);
    const goToProfile = () => navigate(`/profile/${trip?.userId}`)

    useEffect(() => {
        async function getInfo() {
            if (!id) return;
            const result = await getTripInfo(id)
            if (result.success && result.data) {
                setTrip(result.data)
                if (result.data.userId == user?.id) setCanEdit(true)
            } else if (result.error) {
                setErrorMessage(result.error)
            }

        }
        getInfo()
    },[id])

    return (
        <div className="flex flex-col">
            <div className="dark:bg-mist-800 mx-5 my-5 rounded-xl flex flex-col gap-5 p-5">
                <div className="flex gap-3 items-center">
                    <h1 className="text-2xl"> {trip?.title} with:</h1>
                    <button 
                        className="flex gap-3 items-center dark:bg-mist-700 p-2 rounded-full cursor-pointer text-xl"
                        onClick={() => goToProfile()}
                        >
                        <img className="h-10 w-10" src={trip?.user?.avatarUrl}/>
                        <h1> {trip?.user?.username}</h1>
                    </button>
                </div>
                <h2> {trip?.description}</h2>
                {canEdit && <div className="w-full flex justify-end px-5 pb-5">
                    <SimpleButton 
                    label="Edit Trip"
                    onClick={() => goToEdit()}
                    />
                </div>}
            </div>
            <ErrorMessageComponent message={errorMessage}/>
            <div className="dark:bg-mist-800 mx-5 my-5 lg:w-4/5 self-center rounded-xl flex flex-col gap-5 p-5">
                { trip?.posts && <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    
                        {trip.posts.map((post) => (
                            <ImageComponent
                            key={post.id}
                            photoUrl={post.photoUrl}
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
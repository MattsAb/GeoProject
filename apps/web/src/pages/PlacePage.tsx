
import type { Place } from "@geoapp/types";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import ErrorMessageComponent from "../components/simple_components/ErrorMessageComponent";
import ImageComponent from "../components/profile_components/PostComponent"
import { getPlace } from "@geoapp/services";


function PlacePage () {

    const [place, setPlace] = useState<Place>();
    const [errorMessage, setErrorMessage] = useState('');

    const { id } = useParams();


    useEffect(() => {
        async function getInfo() {
            if (!id) return;
            const result = await getPlace(id)
            if (result.success && result.data) {
                setPlace(result.data)
            } else if (result.error) {
                setErrorMessage(result.error)
            }

        }
        getInfo()
    },[id])

    return (
        <div className="flex flex-col">
            <div className="dark:bg-mist-800 mx-5 my-5 rounded-xl flex flex-col gap-5 p-5">
                <h1 className="text-2xl"> {place?.placeName} </h1>

            </div>
            <ErrorMessageComponent message={errorMessage}/>
            <div className="dark:bg-mist-800 mx-5 my-5 lg:w-4/5 self-center rounded-xl flex flex-col gap-5 p-5">
                { place?.posts && <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    
                        {place.posts.map((post) => (
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

export default PlacePage
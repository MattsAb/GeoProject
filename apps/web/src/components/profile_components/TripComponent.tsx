import { useNavigate } from "react-router-dom"

type TripProps = {
    id: string
    title: string
    photoUrl?: string
}


function TripComponent({id, title, photoUrl}: TripProps) {

    const navigate = useNavigate()
    const goToTrip = () => navigate(`/trip/${id}`)

    return (
        <button
            className=" mb-4 rounded-lg  bg-gray-100  dark:bg-mist-900 flex-3 cursor-pointer overflow-hidden relative group
             shadow-gray-400 dark:shadow-black shadow-2xl hover:dark:bg-mist-700 transition-colors duration-100 ease-in-out hover:bg-mist-200"
            onClick={() => goToTrip()}
        >
            <div>
                <img src={photoUrl} className="w-full h-75 object-cover" />
            </div>

            <h1> {title} </h1>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"/>
        </button>
    )
}

export default TripComponent
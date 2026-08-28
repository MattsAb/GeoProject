import type { Place } from "@geoapp/types";
import { useJsApiLoader, GoogleMap, Marker, Autocomplete } from "@react-google-maps/api";
import { useRef, useState } from "react";

type GoogleMapComponentProps = {
    getPlace: (placeInfo: Place) => void
}

const MAP_OPTIONS = {
    zoomControl: false,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
};

const GOOGLE_MAPS_LIBRARIES: ("places")[] = ['places'];

function GoogleMapComponent({getPlace}: GoogleMapComponentProps) {

    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [position, setPosition] = useState({ lat: 48.8584, lng: 2.2945 });

    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries: GOOGLE_MAPS_LIBRARIES
    })
    
    if (!isLoaded) return (<></>)

    const onPlaceChanged = () => {
        const place = autocompleteRef.current?.getPlace();
        if (place?.geometry?.location) {
            const newPos = {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
            };
            setPosition(newPos);
            map?.panTo(newPos);
            const info: Place = {
                place_id: place.place_id || ''
            }
            getPlace(info)
            
        }
    };


    return (
            <div className="flex flex-col w-full h-200">
                <h1 className="text-xl mb-2"> Select a location </h1>
                <GoogleMap
                    center={position}
                    zoom={15}
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    onLoad={(mapInstance) => setMap(mapInstance)}
                    options={MAP_OPTIONS}
                >
                <Marker position={position}/>
                </GoogleMap>

                <div className="dark:bg-mist-700 flex w-full justify-between gap-3 p-4 rounded-xl items-center">
                    <div className="flex gap-3">
                        <h2 className="text-xl"> Location: {}</h2>
                        <Autocomplete
                            onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
                            onPlaceChanged={onPlaceChanged}
                        >
                            <input
                                className="dark:bg-mist-800 w-full" 
                                type="text"
                            />    
                        </Autocomplete>
                    </div>
                </div>
            </div>
    )
}

export default GoogleMapComponent
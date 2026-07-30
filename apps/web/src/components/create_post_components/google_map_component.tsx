import type { PlaceInfo } from "@geoapp/types";
import { useJsApiLoader, GoogleMap, Marker, Autocomplete } from "@react-google-maps/api";
import { useRef, useState } from "react";

function GoogleMapComponent() {

    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [position, setPosition] = useState({ lat: 48.8584, lng: 2.2945 });

    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries: ['places']
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
            let countyInfo = extractPlaceDetails(place.address_components)
            const info: PlaceInfo = {
                placeName: place.name || '',
                countryLongName: countyInfo.countryLongName || '',
                countryShortName: countyInfo.countryShortName || '',
                lat: newPos.lat,
                lng: newPos.lng
            }
            console.log(info)
            
        }
    };

function extractPlaceDetails(addressComponents: any) {
  let result = {
    countryLongName: null,
    countryShortName: null,
  };

  if (!Array.isArray(addressComponents)) return result;

  const countryComponent = addressComponents.find((component) =>
    component.types.includes('country')
  );

  if (countryComponent) {
    result.countryLongName = countryComponent.long_name;
    result.countryShortName = countryComponent.short_name;
  }

  return result;
}

    return (
            <div className="flex flex-col w-full h-200">
                <h1 className="text-xl mb-2"> Select a location </h1>
                <GoogleMap
                    center={position}
                    zoom={15}
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    onLoad={(mapInstance) => setMap(mapInstance)}
                    options={{
                        zoomControl: false,
                        streetViewControl: false,
                        mapTypeControl: false,
                        fullscreenControl: false,
                    }}
                >
                <Marker position={position}/>
                </GoogleMap>

                <div className="dark:bg-mist-700 flex w-full gap-3 p-4 rounded-xl items-center">
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
    )
}

export default GoogleMapComponent
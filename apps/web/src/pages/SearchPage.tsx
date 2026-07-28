import type { SearchType } from "@geoapp/types";
import { useEffect, useState } from "react";
import { getSearch } from "../../../../packages/services/src/lib/serach.api";
import { useSearchParams } from "react-router-dom";
import UserComponent from "../components/user_components/UserComponent";
import StateButton from "../components/simple_components/StateButton";
import ErrorMessageComponent from "../components/simple_components/ErrorMessageComponent";
import ComponentLoader from "../components/simple_components/ComponentLoader";
import UserGhostComponent from "../components/user_components/UserGhostComponent";
import ProfileGhostComponent from "../components/profile_components/ProfileGhostComponent";
import FeedTripComponent from "../components/feed_components/FeedTripComponent";

function SearchPage() {

    const [searchInfo, setSearchInfo] = useState<SearchType>();
    const [searchState, setSeacrhState] = useState<'ALL' | 'USERS' | 'TRIPS'>('ALL');
    const [errorMessage, setErrorMessage] = useState('');

    const [searchParams] = useSearchParams()
    const query = searchParams.get('q');

    useEffect(() => {
        async function fetchSearch () {
            if (!query) return;
            const result = await getSearch(query);

            if (result.success && result.data) {
                setSearchInfo(result.data);
            } else if (result.error) {
                setErrorMessage(result.error);
            }

        }
        fetchSearch()
    },[query])



    return (
        <div className="w-full h-full flex flex-col items-center p-5">
            <div className="flex flex-col gap-5 w-full lg:w-1/2 mt-10">
            <h1 className="text-2xl font-semibold"> Searches by: {query}</h1>

            <div className="flex gap-3">
                <StateButton
                    label="all"
                    buttonState="ALL"
                    profileState={searchState}
                    onClick={() => setSeacrhState('ALL')}
                />

                <StateButton
                    label="users"
                    buttonState="USERS"
                    profileState={searchState}
                    onClick={() => setSeacrhState('USERS')}
                />
                <StateButton
                    label="trips"
                    buttonState="TRIPS"
                    profileState={searchState}
                    onClick={() => setSeacrhState('TRIPS')}
                />

                <ErrorMessageComponent message={errorMessage}/>

            </div>

            {(searchState == 'USERS' || searchState == 'ALL') && 
                <ComponentLoader
                    isLoaded={searchInfo?.users ? true : false}
                    gapSize={0}
                    columnNum={{small: 1, medium: 1, large: 1}}
                    ghostComponent={<UserGhostComponent/>}
                    ghostCount={8}
                    loadedComponent={
                        <div className="flex flex-col gap-3">
                            {searchInfo?.users.map((user) => (
                                <UserComponent
                                    key={user.id}
                                    user={user}
                                />
                            )) }
                        
                        </div>
                    }
                />
            }

            {(searchState == 'TRIPS' || searchState == 'ALL') &&
                <ComponentLoader
                    isLoaded={searchInfo?.trips ? true : false}
                    gapSize={4}
                    columnNum={{small: 1, medium: 1, large: 1}}
                    ghostComponent={<ProfileGhostComponent/>}
                    ghostCount={8}
                    loadedComponent={
                        <>
                        {searchInfo?.trips?.map((trip) => (
                            <FeedTripComponent
                                key={trip.id}
                                trip={trip}
                            />
                        ))}
                        </>
                    }
                />
            }

            </div>
        </div>
    )
}

export default SearchPage
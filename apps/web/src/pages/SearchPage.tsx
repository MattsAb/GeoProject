import type { SearchType } from "@geoapp/types";
import { useEffect, useState } from "react";
import { getSearch } from "../../../../packages/services/src/lib/serach.api";
import { useSearchParams } from "react-router-dom";
import UserFollowComponent from "../components/follow_components/UserFollowComponent";
import TripComponent from "../components/profile_components/TripComponent";
import ProfileStateButton from "../components/profile_components/ProfileStateButton";




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
                <ProfileStateButton
                    label="all"
                    buttonState="ALL"
                    profileState={searchState}
                    onClick={() => setSeacrhState('ALL')}
                />

                <ProfileStateButton
                    label="users"
                    buttonState="USERS"
                    profileState={searchState}
                    onClick={() => setSeacrhState('USERS')}
                />
                <ProfileStateButton
                    label="trips"
                    buttonState="TRIPS"
                    profileState={searchState}
                    onClick={() => setSeacrhState('TRIPS')}
                />
            </div>
            {(searchState == 'USERS' || searchState == 'ALL') && searchInfo?.users.map((user) => (
                <UserFollowComponent
                    key={user.id}
                    user={user}
                />
            ))}
            <div className="grid md:grid-cols-1 xl:grid-cols-2 gap-4">
                {(searchState == 'TRIPS' || searchState == 'ALL') && searchInfo?.trips.map((trip) => (
                    <TripComponent
                        key={trip.id}
                        id={trip.id}
                        photoUrl={trip.photoUrl}
                        title={trip.title}
                    />
                ))}
            </div>
            </div>
        </div>
    )
}

export default SearchPage
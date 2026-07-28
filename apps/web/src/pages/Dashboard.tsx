import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import type { Feed} from "@geoapp/types";
import FeedPostComponent from "../components/feed_components/FeedPostComponent";
import ErrorMessageComponent from "../components/simple_components/ErrorMessageComponent";
import { getFeed } from "@geoapp/services";
import ComponentLoader from "../components/simple_components/ComponentLoader";
import ProfileGhostComponent from "../components/profile_components/ProfileGhostComponent";
import FeedTripComponent from "../components/feed_components/FeedTripComponent";

function Dashboard() {
  
    const [feed, setFeed] = useState<Feed>()
    const [errorMessage, setErrorMessage] = useState(''); 
    
    const {user} = useAuth();

   useEffect(() => {
    async function getFeedInfo() {
      if (!user)  {
        setFeed(undefined);
        return
      }
      const result = await getFeed() 

      if (result.success && result.data)
      {
        setFeed(result.data)
      } else if (result.error) {
        setErrorMessage(result.error)
      }
    }
    getFeedInfo();
      },[user?.id])

  

  return (
    <div className="flex flex-col px-5 flex-wrap gap-4 w-full">

      <h1 className="font-semibold text-2xl pl-10 pt-5"> People traveling </h1>
      <ErrorMessageComponent message={errorMessage}/>

      <ComponentLoader
        isLoaded={feed?.trips ? true : false}
        gapSize={4}
        columnNum={{small: 1, medium: 2, large: 2}}
        ghostComponent={<ProfileGhostComponent/>}
        ghostCount={8}
        loadedComponent={
            <>
            {feed?.trips?.map((trip) => (
                <FeedTripComponent
                    key={trip.id}
                    trip={trip}
                />
            ))}
            </>
        }
      />

      <h1 className="font-semibold text-2xl pl-10 pt-5"> Posts </h1>

      <ComponentLoader
        isLoaded={feed?.posts ? true : false}
        columnNum={{small: 1, medium: 2, large: 3}}
        gapSize={5}
        ghostComponent={<ProfileGhostComponent/>}
        ghostCount={9}
        loadedComponent={
            <>
            {feed?.posts?.map((post) => (
                <FeedPostComponent
                    key={post.id}
                    id={post.id}
                    username={post.user.username}
                    avatar={post.user.avatarUrl}
                    userId={post.userId}
                    photoUrl={post.photoUrl}
                    countryCode={post.countryCode}
                    likes={post._count?.likes || 0}
                />
            ))}
            </>
        }

    />
        
    </div>
  )
}

export default Dashboard
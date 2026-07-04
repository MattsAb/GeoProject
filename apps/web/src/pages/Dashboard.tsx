import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import type { Post } from "@geoapp/types";
import { getFeed } from "../services/post.api";
import FeedPostComponent from "../components/FeedPostComponent";
import ErrorMessageComponent from "../components/ErrorMessageComponent";


function Dashboard() {
  
    const [feed, setFeed] = useState<Post[]>()
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
        console.log(result.data);
        setFeed(result.data)
      } else if (result.error) {
        setErrorMessage(result.error)
      }
    }
    getFeedInfo();
      },[user?.id])

  

  return (
    <div className="flex flex-wrap gap-4 w-full">

      <h1 className="font-semibold text-2xl pl-10 pt-5"> People traveling </h1>
      <ErrorMessageComponent message={errorMessage}/>

        { feed && <div className="px-5 pt-5 grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6 w-full justify-center">
        
            {feed.map((post) => (
                <FeedPostComponent
                key={post.id}
                photoUrl={post.photoUrl}
                countryCode={post.countryCode}
                avatar={post.user.avatarUrl}
                username={post.user.username}
                likes={post._count?.likes || 0}
                id={post.id}
                userId={post.userId}
                />
            ))}
            
        </div>} 
        
    </div>
  )
}

export default Dashboard
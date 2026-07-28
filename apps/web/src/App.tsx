import { Route, Routes } from "react-router-dom"
import { useState } from "react";

//pages
import Dashboard from "./pages/Dashboard"
import Header from "./components/header_components/Header"
import Sidebar from "./components/sidebar_components/Sidebar"
import PostPage from "./pages/PostPage";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import EditProfile from "./pages/EditProfile";
import Profile from "./pages/Profile";
import LikedPostsPage from "./pages/LIkedPostsPage";
import CreateTripPage from "./pages/CreateTrip";
import TripPage from "./pages/TripPage";
import EditTrip from "./pages/EditTrip";
import UserFollows from "./pages/UserFollows";
import SearchPage from "./pages/SearchPage";

function App() {

  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <Header setSidebarOpen={setSidebarOpen} isOpen={sidebarOpen}/>

      <div className="flex min-h-screen dark:bg-mist-900 text-black dark:text-white">

        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)}/>
        <div className="flex-1 pt-14">
            <Routes>
              <Route path="/" element={<Dashboard/>} />
              <Route path="/post/:id" element={<PostPage/>} />
              <Route path="/profile/:id" element={<Profile/>} />
              <Route path="/create/post" element={<CreatePost/>} />
              <Route path="/create/trip" element={<CreateTripPage/>}/>
              <Route path="/trip/:id" element={<TripPage/>}/>
              <Route path="/edit/:id" element={<EditPost/>} />
              <Route path="/trip/edit/:id" element={<EditTrip/>}/>
              <Route path="/edituser" element={<EditProfile/>}/>
              <Route path="/liked" element={<LikedPostsPage/>}/>
              <Route path="/follows" element={<UserFollows/>}/>
              <Route path="/search" element={<SearchPage/>}/>
            </Routes>
        </div>
        
      </div>
    </>
  )
}

export default App
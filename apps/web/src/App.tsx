import { Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Header from "./components/Header"
import Sidebar from "./components/sidebar_components/Sidebar"
import PostPage from "./pages/PostPage";
import CreatePost from "./pages/CreatePost";
import { useState } from "react";
import Profile from "./pages/Profile";

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
              <Route path="/create" element={<CreatePost/>} />
            </Routes>
        </div>
        
      </div>
    </>
  )
}

export default App
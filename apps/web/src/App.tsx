import { Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Header from "./components/Header"
import Sidebar from "./components/sidebar_components/Sidebar"
import { useState } from "react";

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
            </Routes>
        </div>
        
      </div>
    </>
  )
}

export default App
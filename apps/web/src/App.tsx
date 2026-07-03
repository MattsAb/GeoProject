import { Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"

function App() {
  

  return (
    <>

      <div className="flex min-h-screen dark:bg-mist-900 text-black dark:text-white">

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
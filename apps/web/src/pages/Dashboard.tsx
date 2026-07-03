import PostComponent from "../components/PostComponent"

import url1 from "../assets/pexels-efrem-efre-2786187-32507662.jpg"

function Dashboard() {
  

  return (
    <div className="p-10">
        <PostComponent photoUrl={url1} username="testuser" location="some location in norway" likes={5}/>
    </div>
  )
}

export default Dashboard
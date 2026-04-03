import  { Navigate, Route, Routes } from "react-router"
import {Toaster} from "react-hot-toast"
import Home from "./components/Home/Home"
import Login from "./components/Login/Login"
import Signin from "./components/Signin/Signin"
import { userStore } from "./store/userStore"
import { useEffect } from "react"
import PageLoader from "./components/PageLoader"

function App() {
  const { authUser, check, isCheckAuth } = userStore();

  useEffect(() => {
    check();
  }, [check])

  if(isCheckAuth) return <PageLoader />;
  return (
    <>
      <Routes>
        <Route path="/" element={authUser ? <Home/> : <Navigate to={"/login"} />}/>
        <Route path="/login" element={!authUser ? <Login/> : <Navigate to={"/"} />}/>
        <Route path="/signin" element={!authUser ? <Signin/> : <Navigate to={"/"} />}/>
      </Routes>   
     
      <Toaster/>
    </>
  )
}

export default App

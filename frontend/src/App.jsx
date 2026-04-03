import React from "react"
import  { Route, Routes } from "react-router"
import {Toaster} from "react-hot-toast"
import Home from "./components/Home/Home"
import Login from "./components/Login/Login"
import Signin from "./components/Signin/Signin"

function App() {


  return (
    <>
<Routes>
  <Route path="/" element={<Home/>}/>
  <Route path="/login" element={<Login/>}/>
  <Route path="/signin" element={<Signin/>}/>
  </Routes>   
     <Toaster/>

    </>
  )
}

export default App

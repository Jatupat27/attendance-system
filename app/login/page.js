"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Login(){

 const router = useRouter()

 const [role,setRole] = useState("student")

 const login = ()=>{

   if(role==="teacher"){
     router.push("/teacher")
   }else{
     router.push("/student")
   }

 }

 return(

  <div>

   <h1>Login</h1>

   <select onChange={(e)=>setRole(e.target.value)}>

     <option value="student">Student</option>
     <option value="teacher">Teacher</option>

   </select>

   <button onClick={login}>Login</button>

  </div>

 )

}
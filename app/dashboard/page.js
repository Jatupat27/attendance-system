"use client"

import { useEffect,useState } from "react"
import { db } from "../../lib/firebase"
import { collection, getDocs } from "firebase/firestore"

export default function Dashboard(){

 const [data,setData] = useState([])

 useEffect(()=>{

   const load = async()=>{

     const query = await getDocs(collection(db,"attendance"))

     const list = query.docs.map(doc=>doc.data())

     setData(list)

   }

   load()

 },[])

 return(

  <div>

   <h1>Attendance</h1>

   <table>

    <thead>

      <tr>
        <th>Student</th>
        <th>Course</th>
        <th>Time</th>
      </tr>

    </thead>

    <tbody>

     {data.map((d,i)=>(
      <tr key={i}>
        <td>{d.studentId}</td>
        <td>{d.course}</td>
        <td>{d.time?.toString()}</td>
      </tr>
     ))}

    </tbody>

   </table>

  </div>

 )

}
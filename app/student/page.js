"use client"

import QRScanner from "../../components/QRScanner"
import { db } from "../../lib/firebase"
import { collection, addDoc } from "firebase/firestore"

export default function Student(){

 const handleScan = async(text)=>{

  const data = JSON.parse(text)

  await addDoc(collection(db,"attendance"),{

    studentId:"64001",
    course:data.course,
    time:new Date()

  })

  alert("Check-in success")

 }

 return(

  <div>

   <h1>Scan QR</h1>

   <QRScanner onScan={handleScan}/>

  </div>

 )

}
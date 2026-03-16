"use client"

import { useState } from "react"
import QRCode from "react-qr-code"

export default function Teacher(){

 const [qrData,setQrData] = useState(null)

 const generate = ()=>{

   const data = {
     course:"CS101",
     time:Date.now()
   }

   setQrData(JSON.stringify(data))

 }

 return(

  <div>

   <h1>Teacher Panel</h1>

   <button onClick={generate}>
     Generate QR
   </button>

   {qrData && (
    <QRCode value={qrData}/>
   )}

  </div>

 )

}
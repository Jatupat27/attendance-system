"use client"

import { Html5QrcodeScanner } from "html5-qrcode"
import { useEffect } from "react"

export default function QRScanner({onScan}){

 useEffect(()=>{

   const scanner = new Html5QrcodeScanner(
     "reader",
     { fps:10, qrbox:250 }
   )

   scanner.render((text)=>{
     onScan(text)
   })

 },[onScan])

 return(
   <div id="reader"></div>
 )

}
"use client";

import { useSearchParams } from "next/navigation";
import { QRCodeCanvas } from "qrcode.react";
import { useState } from "react";

export default function Home() {

const searchParams = useSearchParams();
const checkin = searchParams.get("checkin");

const [name,setName] = useState("");
const [studentId,setStudentId] = useState("");

const url = "https://obsequent-entangleable-paul.ngrok-free.dev/?checkin=true";

const handleCheckin = () => {

if(!name || !studentId){
alert("กรอกข้อมูลก่อน");
return;
}

alert("เช็คชื่อสำเร็จ");

setName("");
setStudentId("");

};

return (

<div style={{padding:"40px",fontFamily:"sans-serif"}}>

{checkin ? (

<div>

<h1>Student Check-in</h1>

<input
placeholder="Name"
value={name}
onChange={(e)=>setName(e.target.value)}
style={{display:"block",marginBottom:"10px",padding:"8px"}}
/>

<input
placeholder="Student ID"
value={studentId}
onChange={(e)=>setStudentId(e.target.value)}
style={{display:"block",marginBottom:"10px",padding:"8px"}}
/>

<button onClick={handleCheckin}>
Check-in
</button>

</div>

) : (

<div>

<h1>Attendance Dashboard</h1>

<h3>Scan QR</h3>

<QRCodeCanvas value={url} size={220} />

</div>

)}

</div>

);
}
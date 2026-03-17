"use client";

import { useSearchParams } from "next/navigation";
import { useState,useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";

import {
Chart as ChartJS,
CategoryScale,
LinearScale,
BarElement,
Title,
Tooltip,
Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

import { db } from "@/lib/firebase";

import {
collection,
addDoc,
onSnapshot,
serverTimestamp
} from "firebase/firestore";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

ChartJS.register(
CategoryScale,
LinearScale,
BarElement,
Title,
Tooltip,
Legend
);

export default function Home(){

const searchParams = useSearchParams();
const checkin = searchParams.get("checkin");

const [name,setName] = useState("");
const [studentId,setStudentId] = useState("");
const [students,setStudents] = useState([]);

const url = "https://obsequent-entangleable-paul.ngrok-free.dev";

useEffect(()=>{

const unsub = onSnapshot(
collection(db,"attendance"),
(snapshot)=>{

const data = snapshot.docs.map(doc=>doc.data());
setStudents(data);

}
);

return ()=>unsub();

},[]);

const handleCheckin = async ()=>{

if(!name || !studentId){

alert("กรุณากรอกข้อมูลให้ครบ");

return;

}

await addDoc(collection(db,"attendance"),{

name,
studentId,
time: serverTimestamp()

});

setName("");
setStudentId("");

};

const totalStudents = 40;

const present = students.length;

const absent = totalStudents - present;

const chartData = {

labels:["มาเรียน","ขาดเรียน"],

datasets:[{

label:"จำนวนนักศึกษา",

data:[present,absent]

}]

};

const exportExcel = ()=>{

const worksheet = XLSX.utils.json_to_sheet(students);

const workbook = XLSX.utils.book_new();

XLSX.utils.book_append_sheet(workbook,worksheet,"รายชื่อเช็คชื่อ");

const excelBuffer = XLSX.write(workbook,{
bookType:"xlsx",
type:"array"
});

const file = new Blob([excelBuffer]);

saveAs(file,"รายชื่อเช็คชื่อ.xlsx");

};

return(

<div style={{

minHeight:"100vh",
background:"#f5f7fb",
fontFamily:"sans-serif"

}}>

{/* หน้า QR */}

{!checkin &&(

<div style={{

display:"flex",
flexDirection:"column",
justifyContent:"center",
alignItems:"center",
height:"100vh"

}}>

<h1>ระบบเช็คชื่อด้วย QR Code</h1>

<p>สแกน QR เพื่อเช็คชื่อเข้าเรียน</p>

<div style={{

padding:"20px",
background:"#fff",
borderRadius:"12px",
boxShadow:"0 10px 30px rgba(0,0,0,0.1)"

}}>

<QRCodeCanvas value={url} size={220}/>

</div>

</div>

)}

{/* หน้าเช็คชื่อ */}

{checkin &&(

<div style={{

maxWidth:"1100px",
margin:"auto",
padding:"40px"

}}>

<h1>แดชบอร์ดเช็คชื่อนักศึกษา</h1>

{/* สถิติ */}

<div style={{

display:"flex",
gap:"20px",
marginTop:"20px"

}}>

<div style={{

background:"#fff",
padding:"20px",
borderRadius:"10px",
flex:1

}}>

<h3>มาเรียน</h3>

<h2>{present}</h2>

</div>

<div style={{

background:"#fff",
padding:"20px",
borderRadius:"10px",
flex:1

}}>

<h3>ขาดเรียน</h3>

<h2>{absent}</h2>

</div>

<div style={{

background:"#fff",
padding:"20px",
borderRadius:"10px",
flex:1

}}>

<h3>นักศึกษาทั้งหมด</h3>

<h2>{totalStudents}</h2>

</div>

</div>

{/* ฟอร์ม + กราฟ */}

<div style={{

display:"grid",
gridTemplateColumns:"1fr 1fr",
gap:"20px",
marginTop:"20px"

}}>

{/* ฟอร์ม */}

<div style={{

background:"#fff",
padding:"20px",
borderRadius:"10px"

}}>

<h3>ฟอร์มเช็คชื่อ</h3>

<input
placeholder="ชื่อ - นามสกุล"
value={name}
onChange={(e)=>setName(e.target.value)}
style={{
width:"100%",
padding:"10px",
marginTop:"10px"
}}
/>

<input
placeholder="รหัสนักศึกษา"
value={studentId}
onChange={(e)=>setStudentId(e.target.value)}
style={{
width:"100%",
padding:"10px",
marginTop:"10px"
}}
/>

<button
onClick={handleCheckin}
style={{
marginTop:"10px",
padding:"10px",
width:"100%",
background:"#4f46e5",
color:"#fff",
border:"none"
}}
>

เช็คชื่อเข้าเรียน

</button>

</div>

{/* กราฟ */}

<div style={{

background:"#fff",
padding:"20px",
borderRadius:"10px"

}}>

<h3>สถิติการเข้าเรียน</h3>

<Bar data={chartData}/>

</div>

</div>

{/* ตาราง */}

<div style={{

marginTop:"20px",
background:"#fff",
padding:"20px",
borderRadius:"10px"

}}>

<h3>รายชื่อนักศึกษาที่เช็คชื่อแล้ว</h3>

<button
onClick={exportExcel}
style={{
marginBottom:"10px",
padding:"8px 15px"
}}
>

ดาวน์โหลด Excel

</button>

<table style={{

width:"100%",
borderCollapse:"collapse"

}}>

<thead>

<tr style={{background:"#eee"}}>

<th>ชื่อ</th>
<th>รหัสนักศึกษา</th>
<th>เวลาเช็คชื่อ</th>

</tr>

</thead>

<tbody>

{students.map((s,i)=>(

<tr key={i}>

<td>{s.name}</td>

<td>{s.studentId}</td>

<td>
{s.time ? s.time.toDate().toLocaleTimeString("th-TH") : ""}
</td>

</tr>

))}

</tbody>

</table>

</div>

</div>

)}

</div>

);

}
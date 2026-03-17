"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
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

const url="https://obsequent-entangleable-paul.ngrok-free.dev/?checkin=true";

useEffect(()=>{

const unsub=onSnapshot(
collection(db,"attendance"),
(snapshot)=>{

const data=snapshot.docs.map(doc=>doc.data());
setStudents(data);

});

return()=>unsub();

},[]);

const handleCheckin=async()=>{

if(!name||!studentId){
alert("กรุณากรอกข้อมูล");
return;
}

await addDoc(collection(db,"attendance"),{
name,
studentId,
time:serverTimestamp()
});

setName("");
setStudentId("");

};

const totalStudents=40;
const present=students.length;
const absent=totalStudents-present;

const chartData={
labels:["มาเรียน","ขาดเรียน"],
datasets:[{
label:"จำนวนนักศึกษา",
data:[present,absent],
backgroundColor:["#3b82f6","#ef4444"]
}]
};

const exportExcel=()=>{

const worksheet=XLSX.utils.json_to_sheet(students);
const workbook=XLSX.utils.book_new();

XLSX.utils.book_append_sheet(workbook,worksheet,"Attendance");

const excelBuffer=XLSX.write(workbook,{
bookType:"xlsx",
type:"array"
});

const file=new Blob([excelBuffer]);

saveAs(file,"attendance.xlsx");

};

return(

<div style={{display:"flex",minHeight:"100vh",background:"#f1f5f9"}}>

{/* SIDEBAR */}

<div style={{
width:"220px",
background:"#1e293b",
color:"white",
padding:"20px"
}}>

<h2>🎓 Attendance</h2>

<div style={{marginTop:"30px"}}>

<Link href="/?checkin=true" style={menu}>
Dashboard
</Link>

<Link href="/" style={menu}>
QR Code
</Link>

<Link href="/?checkin=true#students" style={menu}>
รายชื่อนักศึกษา
</Link>

<Link href="/?checkin=true#students" style={menu}>
รายงาน
</Link>

</div>

</div>


<div style={{flex:1}}>

{/* NAVBAR */}

<div style={{
background:"#1e3a8a",
color:"white",
padding:"15px 25px",
display:"flex",
alignItems:"center",
justifyContent:"space-between"
}}>

<div style={{display:"flex",alignItems:"center",gap:"10px"}}>

<Image
src="/logo.png"
width={40}
height={40}
alt="logo"
/>

<h2 style={{margin:0}}>
ระบบเช็คชื่อเข้าเรียน
</h2>

</div>

<div>
อาจารย์ผู้สอน ผศ.ดร.กานดา ศรอินทร์
</div>

</div>


{/* QR PAGE */}

{!checkin &&(

<div style={{
display:"flex",
flexDirection:"column",
alignItems:"center",
justifyContent:"center",
height:"80vh"
}}>

<h2>สแกน QR เพื่อเช็คชื่อเข้าเรียน</h2>

<div style={{
background:"white",
padding:"30px",
borderRadius:"10px",
boxShadow:"0 10px 20px rgba(0,0,0,0.1)"
}}>

<QRCodeCanvas value={url} size={220}/>

</div>

</div>

)}


{/* DASHBOARD */}

{checkin &&(

<div style={{padding:"30px"}}>

{/* CARDS */}

<div style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",
gap:"20px"
}}>

<Card title="มาเรียน" value={present} color="#2563eb"/>
<Card title="ขาดเรียน" value={absent} color="#ef4444"/>
<Card title="ทั้งหมด" value={totalStudents} color="#1e3a8a"/>

</div>


{/* FORM + CHART */}

<div style={{
display:"grid",
gridTemplateColumns:"1fr 1fr",
gap:"20px",
marginTop:"20px"
}}>

<div style={box}>

<h3>เช็คชื่อเข้าเรียน</h3>

<input
placeholder="ชื่อ - นามสกุล"
value={name}
onChange={(e)=>setName(e.target.value)}
style={input}
/>

<input
placeholder="รหัสนักศึกษา"
value={studentId}
onChange={(e)=>setStudentId(e.target.value)}
style={input}
/>

<button
onClick={handleCheckin}
style={button}
>

เช็คชื่อ

</button>

</div>


<div style={box}>

<h3>สถิติการเข้าเรียน</h3>

<Bar data={chartData}/>

</div>

</div>


{/* TABLE */}

<div id="students" style={{...box,marginTop:"20px"}}>

<h3>รายชื่อนักศึกษาที่เช็คชื่อแล้ว</h3>

<button onClick={exportExcel} style={excelBtn}>
ดาวน์โหลด Excel
</button>

<table style={{width:"100%",marginTop:"10px",borderCollapse:"collapse"}}>

<thead>

<tr style={{background:"#1e3a8a",color:"white"}}>

<th>ชื่อ</th>
<th>รหัสนักศึกษา</th>
<th>เวลา</th>

</tr>

</thead>

<tbody>

{students.map((s,i)=>(

<tr key={i}>

<td style={td}>{s.name}</td>
<td style={td}>{s.studentId}</td>
<td style={td}>
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

</div>

);

}

function Card({title,value,color}){

return(

<div style={{
background:"white",
padding:"20px",
borderRadius:"10px",
boxShadow:"0 5px 15px rgba(0,0,0,0.1)",
textAlign:"center"
}}>

<h3>{title}</h3>
<h1 style={{color}}>{value}</h1>

</div>

)

}

const box={
background:"white",
padding:"20px",
borderRadius:"10px",
boxShadow:"0 5px 15px rgba(0,0,0,0.1)"
}

const input={
width:"100%",
padding:"10px",
marginTop:"10px",
borderRadius:"6px",
border:"1px solid #ccc"
}

const button={
marginTop:"10px",
width:"100%",
padding:"12px",
background:"#2563eb",
color:"white",
border:"none",
borderRadius:"6px",
cursor:"pointer"
}

const excelBtn={
background:"#10b981",
color:"white",
padding:"8px 15px",
border:"none",
borderRadius:"6px",
cursor:"pointer"
}

const td={
padding:"10px",
borderBottom:"1px solid #ddd"
}

const menu={
display:"block",
padding:"10px 0",
color:"white",
textDecoration:"none",
cursor:"pointer"
}
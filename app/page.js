"use client";

import { useEffect,useState } from "react";
import { db } from "@/lib/firebase";
import { collection,onSnapshot } from "firebase/firestore";
import { QRCodeCanvas } from "qrcode.react";
import Link from "next/link";

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

ChartJS.register(
CategoryScale,
LinearScale,
BarElement,
Title,
Tooltip,
Legend
);

export default function Dashboard(){

const [attendance,setAttendance]=useState([]);
const [showList,setShowList]=useState(false);

const checkinURL="http://localhost:3000/checkin";

useEffect(()=>{

const unsubscribe = onSnapshot(collection(db,"attendance"),(snapshot)=>{

const list=[];

snapshot.forEach(doc=>{
list.push(doc.data());
});

setAttendance(list);

});

return ()=>unsubscribe();

},[]);



/* GROUP BY DATE */

const dates={};

attendance.forEach(a=>{

if(!a.time) return;

const d=new Date(a.time).toLocaleDateString();

dates[d]=(dates[d]||0)+1;

});

const chartData={
labels:Object.keys(dates),
datasets:[
{
label:"Attendance",
data:Object.values(dates)
}
]
};



return(

<div style={{
background:"#f3f4f6",
minHeight:"100vh",
padding:40,
fontFamily:"sans-serif"
}}>

<h1 style={{fontSize:32,fontWeight:"bold"}}>
Attendance Dashboard
</h1>

<p style={{marginBottom:30}}>
QR Classroom Check-in System
</p>



{/* CARDS */}

<div style={{
display:"grid",
gridTemplateColumns:"repeat(3,1fr)",
gap:20,
marginBottom:30
}}>

<div style={{
background:"white",
padding:20,
borderRadius:10
}}>
<h3>Total Check-ins</h3>
<h1 style={{fontSize:40}}>
{attendance.length}
</h1>
</div>

<div style={{
background:"white",
padding:20,
borderRadius:10
}}>
<h3>Status</h3>
<p style={{color:"green"}}>Active</p>
</div>

<div style={{
background:"white",
padding:20,
borderRadius:10
}}>
<h3>Students</h3>
<p>{attendance.length}</p>
</div>

</div>



{/* QR */}

<div style={{
background:"white",
padding:30,
borderRadius:10,
marginBottom:30
}}>

<h2>Scan QR</h2>

<br/>

<QRCodeCanvas value={checkinURL} size={200}/>

<br/><br/>

<Link href="/checkin">

<button style={{
background:"#2563eb",
color:"white",
border:"none",
padding:"10px 16px",
borderRadius:6
}}>

Open Scanner

</button>

</Link>

</div>



{/* CHART */}

<div style={{
background:"white",
padding:30,
borderRadius:10,
marginBottom:30
}}>

<h2>Attendance Statistics</h2>

<Bar data={chartData}/>

</div>



{/* BUTTON */}

<button
onClick={()=>setShowList(!showList)}
style={{
background:"#16a34a",
color:"white",
padding:"10px 16px",
border:"none",
borderRadius:6
}}
>

{showList ? "Hide Attendance" : "Show Attendance"}

</button>



{/* TABLE */}

{showList && (

<table style={{
width:"100%",
marginTop:20,
borderCollapse:"collapse",
background:"white"
}}>

<thead style={{background:"#2563eb",color:"white"}}>

<tr>

<th style={{padding:10}}>Name</th>
<th>Student ID</th>
<th>Time</th>

</tr>

</thead>

<tbody>

{attendance.map((s,i)=>{

const time = s.time
? new Date(s.time).toLocaleString()
: "-";

return(

<tr key={i} style={{borderBottom:"1px solid #eee"}}>

<td style={{padding:10}}>
{s.name}
</td>

<td>
{s.studentId}
</td>

<td>
{time}
</td>

</tr>

);

})}

</tbody>

</table>

)}

</div>

);

}
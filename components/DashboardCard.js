"use client";

export default function DashboardCard({title,value}){

return(

<div style={{
background:"white",
padding:"20px",
borderRadius:"12px",
boxShadow:"0 5px 20px rgba(0,0,0,0.1)",
textAlign:"center",
transition:"0.3s"
}}

onMouseEnter={(e)=>e.currentTarget.style.transform="scale(1.05)"}
onMouseLeave={(e)=>e.currentTarget.style.transform="scale(1)"}
>

<h3>{title}</h3>

<h1 style={{color:"#1e3a8a"}}>{value}</h1>

</div>

)

}
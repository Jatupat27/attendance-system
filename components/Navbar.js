"use client";

import Image from "next/image";

export default function Navbar(){

return(

<div style={{
background:"#1e3a8a",
color:"white",
padding:"15px 30px",
display:"flex",
alignItems:"center",
justifyContent:"space-between"
}}>

{/* LEFT SIDE */}

<div style={{
display:"flex",
alignItems:"center",
gap:"10px"
}}>

<Image
 src="/logo.png"
 width={40}
 height={40}
 alt="University Logo"
/>

<h2 style={{
margin:0,
fontSize:"20px",
fontWeight:"bold"
}}>
ระบบเช็คชื่อเข้าเรียนด้วย QR Code
</h2>

</div>

{/* RIGHT SIDE */}

<div style={{
fontSize:"14px"
}}>
ระบบสำหรับอาจารย์
</div>

</div>

);

}
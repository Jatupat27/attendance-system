"use client";

import { QRCodeCanvas } from "qrcode.react";

export default function QRPage() {

const url = "https://obsequent-entangleable-paul.ngrok-free.dev/checkin";

return (
<div style={{
display:"flex",
flexDirection:"column",
alignItems:"center",
justifyContent:"center",
height:"100vh",
fontFamily:"sans-serif"
}}>

<h1>Scan QR</h1>

<QRCodeCanvas value={url} size={250}/>

<p style={{marginTop:20}}>
{url}
</p>

</div>
);
}
import { useState } from "react";
import { QrReader } from "react-qr-reader";
import { API_AUTH } from "../service/api";

function Scanner(){

const [result,setResult]=useState("");
const [message,setMessage]=useState("");

const handleScan = async(data)=>{

if(!data) return;

const passId = data?.text || data;

setResult(passId);

try{

const res = await API_AUTH.post(`/checklogs/checkin/${passId}`);
setMessage(res.data.message);

}catch{

try{

const res = await API_AUTH.post(`/checklogs/checkout/${passId}`);
setMessage(res.data.message);

}catch{
setMessage("Invalid QR Code");
}

}

};

return(

<div>

<h1>Security QR Scanner</h1>

<QrReader
constraints={{facingMode:"environment"}}
onResult={(result)=>{ if(result) handleScan(result)}}
/>

<h3>Scanned Pass ID: {result}</h3>

<h2>{message}</h2>

</div>

);

}

export default Scanner;
import { useEffect,useState } from "react";
import { API_AUTH } from "../service/api";

function Visitors(){

const [visitors,setVisitors]=useState([]);

const [form,setForm]=useState({
name:"",
email:"",
phone:"",
purpose:"",
host:""
});

useEffect(()=>{
fetchVisitors();
},[]);

const fetchVisitors = async()=>{

try{

const res = await API_AUTH.get("/visitors");

setVisitors(res.data.visitors || []);

}catch(error){
console.log(error);
}

};

const handleChange=(e)=>{
setForm({...form,[e.target.name]:e.target.value});
};

const handleSubmit=async(e)=>{

e.preventDefault();

try{

await API_AUTH.post("/visitors",form);

fetchVisitors();

setForm({
name:"",
email:"",
phone:"",
purpose:"",
host:""
});

}catch(error){

alert(error.response?.data?.message || "Failed to add visitor");

}

};

return(

<div>

<h1>Visitors</h1>

<form onSubmit={handleSubmit}>

<input name="name" placeholder="Name" value={form.name} onChange={handleChange}/>
<input name="email" placeholder="Email" value={form.email} onChange={handleChange}/>
<input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange}/>
<input name="purpose" placeholder="Purpose" value={form.purpose} onChange={handleChange}/>
<input name="host" placeholder="Host Employee ID" value={form.host} onChange={handleChange}/>

<button>Add Visitor</button>

</form>

<h2>Visitor List</h2>

{visitors.map(v=>(
<div key={v._id}>
<strong>{v.name}</strong>
<p>{v.phone}</p>
<p>{v.purpose}</p>
</div>
))}

</div>

);

}

export default Visitors;
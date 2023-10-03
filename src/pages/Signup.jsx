import axios from "axios";
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { UserContext } from "../userContext";
import { SERVER_BASE_URL } from "../constants";

 

const Signup = () => {
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate(); 
  const {updateUsername} = useContext(UserContext)
  const handleSubmit  = async(e)=>{
    e.preventDefault();
    try{
        const res =  await axios.post(`${SERVER_BASE_URL}/user/signup`,{
            "username":username,
            "password":password
        })
        console.log(res)
        if(res?.data?.token){
            setPassword('')
            setUsername('')
            localStorage.setItem('token',res?.data?.token)
            updateUsername(username)
            navigate('/questions')
        }
    }catch(err){
       console.log('Some error in signup-',err)
    }
  }
  return (
    <form onSubmit={handleSubmit} style={{display:"flex",flexDirection:"column",gap:"14px",alignItems:'center',marginTop:"15%"}}>
        <h2>Signup</h2>
        <input value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Enter email" style={{padding:"8px",borderRadius:'4px',width:"330px"}} />
        <input value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter password" style={{padding:"8px",borderRadius:'4px',width:"330px"}} />
        <button style={{padding:"8px",borderRadius:'4px',width:"200px",backgroundColor:"pink",cursor:"pointer"}}>Submit</button>
    </form>
  )
}

export default Signup
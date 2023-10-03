import { useContext } from "react";
import { useNavigate } from "react-router-dom"
import { UserContext } from "../userContext";

const Header = () => {
  // eslint-disable-next-line react/prop-types
  const {username,updateUsername} = useContext(UserContext)
  const navigate = useNavigate();
  return (
    <div style={{display:"flex",justifyContent:"right",gap:"10px",alignItems:"center"}}>
    {!username ? <>
        <button onClick={()=>navigate("/signup")} style={{padding:"8px 16px",borderRadius:"8px", backgroundColor:"pink",cursor:"pointer"}}>Signup</button>
        <button onClick={()=>navigate("/login")} style={{padding:"8px 16px",borderRadius:"8px", backgroundColor:"pink",cursor:"pointer"}}>Login</button>
    </>:
       
        <button onClick={()=>{localStorage.removeItem("token");updateUsername(null)}} style={{padding:"8px 16px",borderRadius:"8px", backgroundColor:"pink",cursor:"pointer"}}>Logout</button>}
    </div>
  )
}

export default Header
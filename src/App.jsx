import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Questions from "./pages/Questions";
import Signup from "./pages/Signup";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import Login from "./pages/Login";
import { UserContext } from "./userContext";
import { SERVER_BASE_URL } from "./constants";

function App() {
  const {username, updateUsername } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const init = async () => {
    try {
      const res = await axios.get(`${SERVER_BASE_URL}/me`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (res?.data?.username) {
        updateUsername(res?.data?.username);
        setIsLoading(false);
      } else {
        updateUsername(null);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      updateUsername(null);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={username ?   <Questions /> : <Navigate to={"/login"}/>} />
          <Route path="/questions" element={username ? <Questions />: <Navigate to={"/login"}/>} />
          <Route path="/signup" element={username ? <Navigate to={"/"}/> : <Signup />} />
          <Route path="/login" element={username ? <Navigate to={"/"}/> :<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { Link,useNavigate} from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthProvider.jsx";
function Logout() {
  const [loading, setLoading] = useState(false);
 


  const handleLogout = async () => {
    setLoading(true);
    try {
      localStorage.removeItem("ChatApp");
      setLoading(false);
      toast.success("Logged out successfully");
      window.location.reload();
    } catch (error) {
      console.log("Error in Logout", error);
      toast.error("Error in logging out");
    }
  };

  return (
    <>
      <hr />
      <div className="flex p-4 h-[10vh] bg-transparent">
      <div className="text-xl py-3">Logout</div>
        <div>
          <BiLogOutCircle
            className="text-5xl text-white hover:bg-slate-700 duration-300 cursor-pointer rounded-full p-2 ml-2 mt-1"
            onClick={handleLogout}
          />
        </div>
      </div>
    </>
  );
}

export default Logout;
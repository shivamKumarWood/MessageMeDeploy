import { useEffect, useState } from "react";

const useGetAllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const userData = JSON.parse(localStorage.getItem('ChatApp'));

  
        const email = userData.user.email;

        console.log("📧 Logged in user email:", email);

        const response = await fetch("http://localhost:4002/api/user/allusers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("✅ Fetched users:", data);
          setAllUsers(data);
        } else {
          console.error("❌ Backend returned status:", response.status);
        }
      } catch (error) {
        console.error("❌ Error in useGetAllUsers:", error.message);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  return [allUsers, loading];
};

export default useGetAllUsers;


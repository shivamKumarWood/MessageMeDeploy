import React from "react";
import User from "./User";
import useGetAllUsers from "../../context/useGetAllUsers";
function Users() {
  const [allUsers, loading] = useGetAllUsers();
  console.log(allUsers);
  const user = JSON.parse(localStorage.getItem("ChatApp"));
console.log("user from localStorage:", user);
  return (
    <div>
      <h1 className="px-8 py-2 text-white font-semibold bg-slate-700 rounded-md">
        Messages
      </h1>
      <div className="py-2 overflow-y-auto"
      style={{maxHeight:"calc(70vh)"}}>
        {allUsers.map((user, index) => (
          
            <User key={index} user={user} />
          
        ))}

      </div>
    </div>
  );
}

export default Users;

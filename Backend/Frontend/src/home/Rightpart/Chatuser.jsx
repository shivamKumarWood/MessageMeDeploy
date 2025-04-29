import React from "react";
import useConversation from "../../zustand/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";
function Chatuser() {
  const { selectedConversation } = useConversation();
  // console.log("selected conversation",selectedConversation);
  const { onlineUsers } = useSocketContext();
  const getOnlineUsersStatus = (userId) => {
    return onlineUsers.includes(userId.toString()) ? "Online" : "Offline";
  };
  return (
    <div className=" flex space-x-3  p-2 items-center justify-center h-[8vh] bg-gray-800 hover:bg-gray-700 duration-300 m-1">
      <div className={`avatar ${onlineUsers.includes(selectedConversation?.id?.toString()) ? "avatar-online" : ""}`}>

        <div className="w-16 rounded-full">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <div>
        <h1 className="text-xl">{selectedConversation?.name}</h1>
        <span className="text-sm">{getOnlineUsersStatus(selectedConversation.id)}
</span>
      </div>
    </div>
  );
}

export default Chatuser;

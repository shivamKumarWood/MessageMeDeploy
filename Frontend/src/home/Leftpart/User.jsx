import React from 'react'
import useConversation from '../../zustand/useConversation';
import { useSocketContext } from '../../context/SocketContext.jsx';

function User({user}) {
  // console.log("userid",user.id)
  const {selectedConversation, setSelectedConversation} = useConversation();
  const isSelected = selectedConversation?.id === user.id;
  // console.log("selectedConversation id",selectedConversation?.id);
  // console.log("selected conversation",selectedConversation);
  const {socket, onlineUsers} = useSocketContext();
  const isOnline = onlineUsers.includes(user.id.toString());
 
  
  return (
    <div className={`hover:bg-slate-600 duration-300 ${
      isSelected ? "bg-slate-700" : ""
    }`}
    onClick={() => setSelectedConversation(user)}>
       <div className="flex space-x-4 px-8 py-3 hover:bg-slate-700 duration-300 cursor-pointer rounded-lg" onClick={() => setSelectedConversation(user)}>
        <div className={`avatar ${isOnline ? "avatar avatar-online" : ""}`}>
          <div className="w-16 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <div>
            <h1 className='font-bold'>{user.name}</h1>
            <span>{user.email}</span>
        </div>
      </div>
    </div>
  )
}

export default User

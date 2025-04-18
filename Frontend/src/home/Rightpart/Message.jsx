import React from 'react'


function Message({message}) {
  const authUser = JSON.parse(localStorage.getItem("ChatApp"));
  const itsMe = message.senderid === authUser.user?.id;
  const chatName = itsMe ? " chat-end" : "chat-start";
  const chatColor = itsMe ? "bg-blue-500" : "bg-gray-400";
  const chatTextColor = itsMe ? "text-white" : "text-black";
  
 

  const createdAt = new Date(message.sent_at);
  
  const formattedTime = createdAt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div>
      <div className="p-4 rounded-lg text-xl">
        <div className={`chat ${chatName}`}>
          <div className={`chat-bubble ${chatTextColor} ${chatColor}`}>
            {message.message}
          </div>
          <div className="chat-footer">{formattedTime}</div>
        </div>
      </div>
    </div>
  
  );
}

export default Message

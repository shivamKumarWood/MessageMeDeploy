import React from "react";
import Message from "./Message";
import Loading from "../../components/Loading.jsx";

import useGetMessage from "../../context/useGetMessage.js";
import  { useEffect, useRef } from "react";
import useGetSocketMessage from "../../context/useGetSocketMessage.js";
function Messages() {
  const { loading, messages } = useGetMessage();
  useGetSocketMessage(); // listing incoming messages
  console.log("messages", messages);
  const lastMsgRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      if (lastMsgRef.current) {
        lastMsgRef.current.scrollIntoView({
          behavior: "smooth",
        });
      }
    }, 100);
  }, [messages]);
  return (
    <div
      className="flex-1 overflow-y-auto"
      style={{ minHeight: "calc(92vh - 8vh)" }}
    >
      {loading ? (
        <Loading />
      ) : (
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message.id} ref={lastMsgRef}>
            <Message message={message} />
          </div>
        ))
      )}

      {!loading && messages.length === 0 && (
        <div>
          <p className="text-center mt-[20%]">
            Say! Hi to start the conversation
          </p>
        </div>
      )}
    </div>
  );
}

//   return (
//     <div className="flex-1 overflow-y-auto" style={{minHeight:"calc(92vh - 11vh)"}}>
//       <Message /> 
//       <Message />
//       <Message />
//       <Message />
//       <Message />
//       <Message />
//       <Message />
//       <Message />
   
        
//     </div>
//   );
// }

export default Messages;

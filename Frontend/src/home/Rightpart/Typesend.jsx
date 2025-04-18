import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../../context/useSendMessage.js";

function Typesend() {
  const [message, setMessage] = useState("");
  const { loading, sendMessages } = useSendMessage();

  const handleSubmit = async (e) => {
    console.log(e);
    e.preventDefault();
    await sendMessages(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex space-x-2 h-[8vh]  bg-gray-800 m-2 p-2">
        <div className=" w-full mx-2">
          <input
            type="text"
            placeholder="Type here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="input input-bordered rounded-xl border-slate-400 w-full bg-slate-800"
          />
        </div>
        <button className="text-3xl p-2 hover:bg-gray-600 rounded-full duration-300 cursor-pointer">
          <IoSend className="text-3xl" />
        </button>
      </div>
    </form>
  );
}

export default Typesend;
// import React from "react";
// import { IoSend } from "react-icons/io5";
// function Typesend() {
//   return (
//     <div className="flex space-x-2 p-2 m-2 h-[8vh]">
//       <div className="w-full mx-2">
//         <input
//           type="text"
//           placeholder="Type here"
//           className="input input-bordered rounded-xl border-slate-400 w-full bg-slate-800"
//         />
//       </div>
//       <button className="text-3xl p-2 hover:bg-gray-600 rounded-full duration-300 cursor-pointer">
//       <IoSend />
//       </button>
//     </div>
//   );
// }

// export default Typesend;

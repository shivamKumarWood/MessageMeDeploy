import React from 'react'
import Chatuser from './Chatuser'
import Messages from './Messages'
import Typesend from './Typesend'
import { CiMenuFries } from "react-icons/ci";
import { useEffect } from "react";
import useConversation from "../../zustand/useConversation.js";


function Right() {
  const { selectedConversation, setSelectedConversation } = useConversation();
  useEffect(() => {
    return setSelectedConversation(null);
  }, [setSelectedConversation]);
  return (
    <div className="w-full bg-slate-900 text-gray-300">
      <div>
        {!selectedConversation ? (
          <NoChatSelected />
        ) : (
          <>
            <Chatuser />
            <div
              className=" flex-1 overflow-y-auto"
              style={{ maxHeight: "calc(92vh - 11vh)" }}
            >
              <Messages />
            </div>
            <Typesend />
          </>
        )}
      </div>
    </div>
  );
}


// function Right() {
//   return (
//     <div className="w-[70%] text-white bg-slate-900">
//       <Chatuser/>
//       <div className='flex-1 overflow-y-auto' style={{maxHeight:"calc(92vh - 11vh)"}}>
//       <Messages/>
//       </div>
//       <Typesend/>
//     </div>
//   )
// }

export default Right;

const NoChatSelected = () => {
  const userData = JSON.parse(localStorage.getItem("ChatApp")); // or whatever key you're using
  const name = userData.user?.name;
  return (
    <>
      <div className="relative">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-ghost drawer-button lg:hidden absolute left-5"
        >
          <CiMenuFries className="text-white text-xl" />
        </label>
        <div className="flex h-screen items-center justify-center">
          <h1 className="text-center">
            Welcome{" "}
            <span className="font-semibold text-xl">
              {name}
            </span>
            <br />
            No chat selected, please start conversation by selecting anyone to
            your contacts
          </h1>
        </div>
      </div>
    </>
  );
};

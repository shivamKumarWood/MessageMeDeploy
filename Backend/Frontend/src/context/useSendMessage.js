import React, { useState } from "react";
import useConversation from "../zustand/useConversation.js";
import axios from "axios";
const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessage, selectedConversation } = useConversation();
  const userData = JSON.parse(localStorage.getItem("ChatApp")); // or whatever key you're using
const senderId = userData.user?.id;
  const sendMessages = async (message) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `https://messagemedeploy.onrender.com/api/message/send/${selectedConversation.id}`,
        { message ,senderId}
      );
      setMessage([...messages, res.data]);
      setLoading(false);
    } catch (error) {
      console.log("Error in send messages", error);
      setLoading(false);
    }
  };
  return { loading, sendMessages };
};

export default useSendMessage;

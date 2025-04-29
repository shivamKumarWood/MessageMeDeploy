import React, { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation.js";
import axios from "axios";
const useGetMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessage, selectedConversation } = useConversation();
  const userData = JSON.parse(localStorage.getItem("ChatApp")); // or whatever key you're using
  const senderId = userData.user?.id;
  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      if (selectedConversation && selectedConversation.id) {
        try {
          const res = await axios.get(
            `https://messagemedeploy.onrender.com/api/message/get/${selectedConversation.id}`,
            {
             params: {
      senderId,
    },
             }
        );
          setMessage(res.data);
          setLoading(false);
        } catch (error) {
          console.log("Error in getting messages", error);
          setLoading(false);
        }
      }
    };
    getMessages();
  }, [selectedConversation, setMessage]);
  return { loading, messages };
};

export default useGetMessage;

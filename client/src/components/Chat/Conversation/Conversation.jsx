import React from "react";
import "./conversation.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { PROXY } from "../../../actions";

export default function Conversation({ conversation, currentUser }) {
  console.log(conversation, currentUser);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.members?.find((m) => m !== currentUser);
    console.log(friendId);
    const getUser = async () => {
      try {
        const res = await axios.get(`${PROXY}/user/` + friendId);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [conversation, currentUser]);
  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={
          user?.image
            ? user.image
            : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
        }
        alt=""
      />
      <span className="conversationName">{user?.username}</span>
    </div>
  );
}

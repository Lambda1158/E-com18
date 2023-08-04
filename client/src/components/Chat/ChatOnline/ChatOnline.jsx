import axios from "axios";
import React, { useEffect, useState } from "react";
import { PROXY } from "../../../actions";
import "./chatOnline.css";
export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  // useEffect(() => {
  //   const getFriends = async ()=>{
  //     const res = await axios.get(`${PROXY}/user/friends` + currentId)
  //     setFriends(res.data)
  //   }
  //   getFriends()
  // },[])

  return (
    <div className="chatOnline">
      <div className="chatOnlineFriend">
        <div className="chatOnlineImgContainer">
          <img
            className="chatOnlineImg"
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            alt=""
          />
          <div className="chatOnlineBadge"></div>
        </div>
        <span className="chatOnlineName">John Doe</span>
      </div>
    </div>
  );
}

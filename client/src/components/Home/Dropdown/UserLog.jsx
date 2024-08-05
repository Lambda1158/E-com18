import React from "react";
import defaultImage from "../../../assets/profile_default.png";
const UserLog = ({user,toggle}) => {
  return (
    <div className=" p-2 rounded-xl flex gap-3 mr-4  justify-center transform hover:scale-105 duration-75" onClick={toggle}>
      <p className=" font-medium cursor-pointer mt-1">Hi, {user.username}</p>
      <img
        className="h-10 w-10 border-solid border-black rounded-full"
        src={user?.image ? user?.image : defaultImage}
        alt="user_image"
      />
    </div>
  );
};

export default UserLog;

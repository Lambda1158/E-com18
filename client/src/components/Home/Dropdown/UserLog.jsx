import React from "react";
import defaultImage from "../../../assets/profile_default.png";
const UserLog = ({ user, toggle, state }) => {
  return (
    <div
      className={`flex gap-4 items-center border-[1px] border-black mr-4 p-2 px-4  justify-center transform hover:scale-105 duration-200 cursor-pointer ${
        state && "bg-dark text-white scale-105 shadow-2xl"
      }`}
      onClick={toggle}
    >
      <img
        className="h-10 w-10 border-solid border-black border-[1px] rounded-full"
        src={user?.image ? user?.image : defaultImage}
        alt="user_image"
      />
      <p className=" font-medium cursor-pointer mt-1">Hi, {user.username}</p>
    </div>
  );
};

export default UserLog;

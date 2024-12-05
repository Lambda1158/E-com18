import React from "react";
import { useNavigate } from "react-router-dom";
const SubItem = ({ children, link }) => {
  const navigate = useNavigate();
  const OnClick = () => {
    navigate(link);
  };

  return (
    <li onClick={OnClick} className=" pl-2 font-semibold transform hover:scale-105 duration-75 hover:bg-semidark hover:text-black hover:ml-4">
      {children}
    </li>
  );
};

export default SubItem;

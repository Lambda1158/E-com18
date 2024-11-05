import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import Profile from "./Profile";
import UserLog from "./UserLog";

const useModal = ()=>{
	const modalRef = useRef(null);
	const buttonRef = useRef(null);
	const [modal, setModal] = useState(false);
	const OnClick = () => {
	  setModal((prev) => !prev);
	};
	useEffect(() => {
	  const handleClickOutside = (event) => {
		if (
		  modalRef.current &&
		  !modalRef.current.contains(event.target) &&
		  buttonRef.current &&
		  !buttonRef.current.contains(event.target)
		) {
		  setModal(false);
		}
	  };
  
	  if (modal) {
		document.addEventListener("click", handleClickOutside);
	  } else {
		document.removeEventListener("click", handleClickOutside);
	  }
  
	  return () => {
		document.removeEventListener("click", handleClickOutside);
	  };
	}, [modal]);
	return {modal,OnClick,modalRef,buttonRef}
}

export default function Dropdown() {
  const { user } = useSelector((state) => state.user);
  const {modal,OnClick,modalRef,buttonRef} = useModal()
  return (
    <>
      <div ref={buttonRef}>
        <UserLog toggle={OnClick} user={user} />
      </div>
      {modal && (
        <div
          className=" p-2 border-2 border-black absolute top-16 bg-semidark right-4 mt-2 w-48 z-10 shadow-lg shadow-current"
          ref={modalRef}
        >
          <Profile id={user.id} />
        </div>
      )}
    </>
  );
}

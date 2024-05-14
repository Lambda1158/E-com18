import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserbyId } from "../../actions";
import defaultImage from "../../assets/profile_default.png";
import { FaRegEdit, FaRegSave, FaRegWindowClose } from "react-icons/fa";
//import { Box, Image, Button } from '@chakra-ui/react';

export default function User({ modal }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  let { user } = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user.fullName);
  const [editedResume, setEditedResume] = useState("");
  const edit = (e) => {
    console.log(e);
    setIsEditing(!isEditing);
    if (e === "close") setEditedName(user.fullName);
  };
  useEffect(() => {
    dispatch(getUserbyId(id));
  }, [modal, id, dispatch]);

  function handleOnClick(e) {
    e.preventDefault();
    modal(true);
  }
  const handleChange = (e) => {
    e.preventDefault();
    setEditedName(e.target.value);
  };
  return (
    <>
      {!user ? (
        <h2>Cargando...</h2>
      ) : (
        <div className="flex flex-col items-center py-10 px-8 bg-dark border-2 text-white border-white rounded-lg space-y-6 ">
          <div>
            <div>
              <img
                className="rounded-full border-4 border-semilight w-[220px]"
                src={user.image ? user.image : defaultImage}
                alt={user.username}
              />
            </div>
            <div className="flex opacity-30 relative bottom-14 left-52 justify-center items-center w-12 h-12 bg-gray rounded-full shadow-xl hover:opacity-100 duration-70">
              <button onClick={(e) => handleOnClick(e)}>
                <img
                  width="44px"
                  heigth="44px"
                  src="https://codes.unidepix.com/img/photo.svg"
                  alt="userpic"
                />
              </button>
            </div>
          </div>
          <div className="flex flex-col w-full">
            <h4 className="text-2xl font-medium italic underline">
              {isEditing ? (
                <div className="relative">
                  <FaRegWindowClose
                    className=" cursor-pointer absolute right-0"
                    onClick={() => edit("close")}
                  />
                  <FaRegSave
                    className=" cursor-pointer absolute right-7"
                    onClick={() => edit("edit")}
                  />
                  <input
                    className=" w-[240px]  font-medium italic bg-dark  p-2 h-10 border-b-2"
                    type="text"
                    name="editedName"
                    value={editedName}
                    onChange={handleChange}
                  ></input>
                </div>
              ) : (
                <div className="relative">
                  <FaRegEdit
                    className=" cursor-pointer absolute right-0"
                    onClick={edit}
                  />
                  <p className=" ">{user.fullName}</p>
                </div>
              )}
            </h4>
            <h5 className="text-xl text-gray">{user.username}</h5>
          </div>
          {/* <div className='flex items-center w-full h-6 bg-dark border border-white rounded-md'>
                <div className='flex flex-row items-center h-5 w-9/12 bg-purple rounded-md'>
                    <div className='flex justify-center text-xs ml-2 font-medium'>
                        Nivel 5
                    </ div>
                </div>
            </div> */}
          {/* <div>
                <p className='font-medium'>Usuario desde:</p>
                <p> {user.createdAt.slice(0, 10)}</p>
            </div> */}
          <div className="flex flex-col justify-start space-y-6">
            <div>
              <p className="font-medium">Usuario desde:</p>
              <p> {user.createdAt.slice(0, 10)}</p>
            </div>

            <div>
              <p className="font-medium">Sobre mi: </p>
              <p>{user.resume}</p>
            </div>

            <div>
              <p>Pais</p>
              <p>{user.country}</p>
            </div>
            <h5 className="font-medium">Redes sociales</h5>
            <div>
              <button>
                <img
                  className="w-7 h-7 mr-2"
                  alt="Facebook logo"
                  src="http://codes.unidepix.com/img/facebook.svg"
                />
              </button>
              {/* {!user.social ? '' : (<button><img className='w-7 h-7 mr-2' alt='Facebook logo' src='http://codes.unidepix.com/img/facebook.svg'/></button>)} */}
              <button>
                <img
                  className="w-7 h-7 mr-2"
                  alt="Google logo"
                  src="http://codes.unidepix.com/img/google.svg"
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

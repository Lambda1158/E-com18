import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserbyId } from "../../actions";
import defaultImage from "../../assets/profile_default.png";
import Edit from "./Edit";
//import { Box, Image, Button } from '@chakra-ui/react';

export default function User({ modal }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  let { user } = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState({
    username: false,
    fullName: false,
    resume: false,
    country: false,
  });
  const [editedName, setEditedName] = useState({
    username: user.username,
    fullName: user.fullName,
    resume: user.resume,
    country: user.country,
  });
  const edit = (obj) => {
    if (obj.close) {
      setIsEditing((prev) => ({
        ...prev,
        [obj.text]: !prev[obj],
      }));
      return setEditedName((prev) => ({
        ...prev,
        [obj.text]: user[obj.text],
      }));
    }
    setIsEditing((prev) => ({
      ...prev,
      [obj]: !prev[obj],
    }));
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
    setEditedName((prevstate) => ({
      ...prevstate,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <>
      {!user ? (
        <h2>Cargando...</h2>
      ) : (
        <div className="flex flex-col items-center py-6 px-8 bg-dark border-2 text-white border-white rounded-lg space-y-6 ">
          <div>
            <img
              className="rounded-full border-4 border-semilight w-[220px]"
              src={user.image ? user.image : defaultImage}
              alt={user.username}
            />
            <div className="flex opacity-30 relative bottom-7 left-40 justify-center items-center w-10 h-10 bg-gray rounded-full shadow-xl hover:opacity-100 duration-70">
              <button onClick={(e) => handleOnClick(e)}>
                <img
                  width="40px"
                  heigth="40px"
                  src="https://codes.unidepix.com/img/photo.svg"
                  alt="userpic"
                />
              </button>
            </div>
          </div>
          <div className=" w-full">
            <h4 className="text-2xl font-medium italic underline">
              <Edit
                isEditing={isEditing}
                handleChange={handleChange}
                edit={edit}
                text={"fullName"}
                editedName={editedName}
              />
            </h4>
            <h5 className="text-2xl font-semibold py-2 text-gray">
              <Edit
                isEditing={isEditing}
                handleChange={handleChange}
                edit={edit}
                text={"username"}
                editedName={editedName}
              />
            </h5>
          </div>
          <div className="flex flex-col justify-start space-y-6">
            <div>
              <p className="font-medium">Usuario desde:</p>
              <p>{user.createdAt.slice(0, 10)}</p>
            </div>
            <div>
              <p className="font-medium">Sobre mi: </p>
              <Edit
                isEditing={isEditing}
                handleChange={handleChange}
                edit={edit}
                text={"resume"}
                editedName={editedName}
              />
            </div>
            <div>
              <p>Pais</p>
              <Edit
                isEditing={isEditing}
                handleChange={handleChange}
                edit={edit}
                text={"country"}
                editedName={editedName}
              />
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

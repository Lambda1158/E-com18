import React, { useState } from "react";
import ReactModal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { editarUsuario } from "../../actions/action-talents/user";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FaCloudUploadAlt, FaSave } from "react-icons/fa";

export default function Image({ modal, isModal }) {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [previewSource, setPreviewSource] = useState();

  const { user } = useSelector((state) => state.user);
  function handleSubmit(e) {
    if (file) {
      let fb = new FormData();
      fb.append("username", user.username);
      fb.append("image", file);
      dispatch(editarUsuario(fb));
      setPreviewSource(null);
      isModal(!modal);
    } else {
      return alert("seleccione una imagen por favor");
    }
  }

  function previewFile(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  }

  function handleFile(e) {
    setFile(e.target.files[0]);
    previewFile(e.target.files[0]);
  }

  function isClosed(e) {
    e.preventDefault(e);
    isModal(!modal);
    setFile(null);
    setPreviewSource(null);
  }
  function ChangeImg(e) {
    e.preventDefault(e);
    setFile(null);
    setPreviewSource(null);
  }

  return (
    <div>
      <ReactModal
        isOpen={modal}
        ariaHideApp={false}
        onRequestClose={isClosed}
        contentLabel="Example Modal"
        className=" absolute m-auto w-[650px] h-[400px] inset-x-0 top-[90px] bg-dark border-2 border-white rounded-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-90"
      >
        <div className="flex  items-center">
          <h1 className="text-white text-2xl  font-light text-center w-full p-8">
            Por favor seleccione una foto de perfil
          </h1>
          <IoIosCloseCircleOutline
            onClick={isClosed}
            className=" text-white cursor-pointer text-5xl mr-4  hover:scale-125 transform transition-transform duration-300"
          />
        </div>
        {previewSource && (
          <div className="flex flex-row justify-evenly items-center">
            <img
              className="rounded-full border-4 border-semilight h-[290px] w-[290px] cursor-pointer"
              src={previewSource}
              onClick={ChangeImg}
            />
            <FaSave
              onClick={(e) => handleSubmit(e)}
              className=" text-8xl text-white cursor-pointer"
            >
              subir
            </FaSave>
          </div>
        )}
        {!previewSource && (
          <div className=" w-full h-2/4 flex justify-center items-center">
            <label htmlFor="fileInput">
              <FaCloudUploadAlt className=" text-9xl text-white cursor-pointer" />
              <input
                id="fileInput"
                className="hidden"
                onChange={(e) => handleFile(e)}
                type="file"
                name="image"
                required
              />
            </label>
          </div>
        )}
      </ReactModal>
    </div>
  );
}

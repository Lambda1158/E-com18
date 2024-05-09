import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserbyId, PROXY } from "../../actions";

export default function Image({ modal, isModal }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [previewSource, setPreviewSource] = useState();

  const { user } = useSelector((state) => state.user);

  function handleSubmit(e) {
    let fb = new FormData();
    fb.append("username", user.username);
    fb.append("image", file);
    axios({
      method: "put",
      url: `${PROXY}/user`,
      data: fb,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => res)
      .catch((err) => console.log(err));
    dispatch(getUserbyId(id));
    setPreviewSource(null);
    isModal(!modal);
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
  }

  return (
    <div>
      <ReactModal
        isOpen={modal}
        ariaHideApp={false}
        onRequestClose={isClosed}
        contentLabel="Example Modal"
        className=" absolute m-auto w-4/12 inset-x-0 top-40 bg-dark border-2 border-white rounded-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-90"
      >
        <div className="flex justify-between items-center">
          <h1 className="text-white text-xl m-2 p-2">Foto de perfil</h1>
          <button
            className="flex items-center justify-center text-white w-4 h-6 rounded text-2xl pr-6"
            onClick={isClosed}
          >
            X
          </button>
        </div>
        <div className="flex justify-center">
          <div className="flex flex-col items-center justify-center w-full space-y-10">
            <div className="flex justify-center items-center">
              <img
                className="rounded-full border-4 border-semilight w-72"
                src={previewSource}
              />
            </div>
            <div className="w-full flex flex-row justify-center items-center pb-2">
              <input
                className="text-white"
                onChange={handleFile}
                type="file"
                name="image"
                required
              />
              <button
                onClick={(e) => handleSubmit(e)}
                className="btn-secondary btn-colors"
              >
                Actualizar imagen
              </button>
            </div>
          </div>
        </div>
      </ReactModal>
    </div>
  );
}

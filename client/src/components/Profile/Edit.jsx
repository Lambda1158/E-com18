import React from "react";
import { FaRegEdit, FaRegSave, FaRegWindowClose } from "react-icons/fa";
export default function Edit({
  isEditing,
  handleChange,
  edit,
  text,
  editedName,
}) {
  return (
    <>
      {isEditing[text] ? (
        <div className="relative">
          <FaRegWindowClose
            className=" cursor-pointer absolute right-0"
            onClick={() => edit({ text, close: true })}
          />
          <FaRegSave
            className=" cursor-pointer absolute right-7"
            onClick={() => edit(text)}
          />
          <input
            className=" w-[240px] italic bg-dark  p-2 h-10 border-b-2"
            type="text"
            name={text}
            value={editedName[text]}
            onChange={handleChange}
          ></input>
        </div>
      ) : (
        <div className="relative">
          <FaRegEdit
            className=" cursor-pointer absolute right-0"
            onClick={() => edit(text)}
          />
          <p className=" ">{editedName[text]}</p>
        </div>
      )}
    </>
  );
}

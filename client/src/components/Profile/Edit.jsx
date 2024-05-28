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
            className=" cursor-pointer absolute right-[-12px] top-[-12px]  "
            onClick={() => edit({ text, close: true })}
          />
          <FaRegSave
            className=" cursor-pointer absolute right-[15px] top-[-12px]  "
            onClick={() => edit(text)}
          />
          <input
            className=" w-[200px] italic bg-dark  p-2 h-8 border-b-2"
            type="text"
            name={text}
            value={editedName[text]}
            onChange={handleChange}
          />
        </div>
      ) : (
        <div className=" relative">
          <FaRegEdit
            className=" absolute  right-[-12px] top-[-12px]  cursor-pointer"
            onClick={() => edit(text)}
          />
          <p className=" text-base mt-2">{editedName[text]}</p>
        </div>
      )}
    </>
  );
}

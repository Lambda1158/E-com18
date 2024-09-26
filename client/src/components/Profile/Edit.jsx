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
          {text === "resume" ? (
            <textarea
              className="w-full p-2 border h-[160px] mt-4 overflow-hidden border-gray-300 rounded-md transition-height duration-200 ease text-[#5E8B7E]"
              type="text"
              name={text}
              value={editedName[text]}
              onChange={handleChange}
            />
          ) : (
            <input
              className="w-full p-2 border h-auto mt-4 overflow-hidden border-gray-300 rounded-md transition-height duration-200 ease text-[#5E8B7E]"
              type="text"
              name={text}
              value={editedName[text]}
              onChange={handleChange}
            />
          )}
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

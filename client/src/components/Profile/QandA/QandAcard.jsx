import React, { useRef, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { createAnswer } from "../../../actions/action-talents/review";
import { useDispatch } from "react-redux";
export default function QandAcard({ question }) {
  const [cargando, setCargando] = useState(true);
  const dispatch = useDispatch();
  const formRef = useRef();
  const handleSubmit = (e) => {
    setCargando(false);
    e.preventDefault();
    setCargando(true);
    const respuesta = new FormData(formRef.current);
    respuesta.append("idQuestion", question.id);
    respuesta.append("postId", question.post.id);
    const data = Object.fromEntries(respuesta.entries());
    dispatch(createAnswer(data));
    return setCargando(true);
  };
  return (
    <section className="flex flex-col items-center  mx-auto gap-4 mb-6 xxl:ml-10 ">
      <div className="flex items-start gap-2 w-full">
        <img
          className="h-10 w-10 rounded-full border-[1px]"
          src={question.user.image}
          alt="User_question"
        />
        <div className="flex flex-col bg-semidark p-3 rounded-2xl text-black min-w-[350px]  shadow-md">
          <p className="font-bold">{question.user.username}</p>
          <p className="text-sm text-gray-700">{question.user.email}</p>
          <p className="mt-2">{question.question}</p>
          <p className="text-xs text-gray-700 mt-1">
            Creada el: {new Date(question.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      {/* Respuesta */}
      <div className="flex items-end gap-2 w-full xxl:w-[570px] justify-end">
        <div className="flex flex-col bg-blue-200 p-3 rounded-2xl text-black min-w-[340px]  shadow-md">
          <p className="font-bold">{question.post.user.username}</p>
          <p className="text-sm text-gray-600">{question.post.user.email}</p>
          {question.answer ? (
            <>
              <p className="mt-2">{question.answer}</p>
              <p className="text-xs text-gray-500 mt-1">
                Respondida el:{" "}
                {new Date(question.updatedAt).toLocaleDateString()}
              </p>
            </>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit}>
              <label className="text-sm text-gray-600 mt-2">
                Responder a la pregunta:
              </label>
              {cargando ? (
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="text"
                    name="answer"
                    required
                    className="p-2 border rounded-md flex-grow"
                    placeholder="Escribe tu respuesta..."
                  />
                  <button
                    type="submit"
                    className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 flex items-center justify-center"
                  >
                    <IoMdSend size={20} />
                  </button>
                </div>
              ) : (
                <p>Loading ...</p>
              )}
            </form>
          )}
        </div>

        <img
          className="h-10 w-10 rounded-full border-[1px]"
          src={question.post.user.image}
          alt="User_answer"
        />
      </div>
    </section>
  );
}

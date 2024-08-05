import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getQAbyId, createAnswer } from "../../../actions/index";

export default function Qas() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const qa = useSelector((state) => state.review.qa);
  const [answer, setAnswer] = useState({});
  const [refresh, setRefresh] = useState(false);

  function handleChange(e) {
    e.preventDefault();
    setAnswer({
      [e.name]: { respuesta: e.target.value, id: e.target.name },
    });
  }
  function handleOnSubmit(e) {
    e.preventDefault();
    console.log({
      answer: answer[e.name].respuesta,
      idQuestion: answer[e.name].id,
    });
    if (answer[e.name].respuesta.length < 5 || !answer[e.name])
      return alert("Por favor escriba una respuesta");
    dispatch(
      createAnswer({
        answer: answer[e.name].respuesta,
        idQuestion: answer[e.name].id,
      })
    );
    setRefresh(true);
    setAnswer({});
  }
  useEffect(() => {
    dispatch(getQAbyId(id));
    setRefresh(false);
  }, [refresh, dispatch, id]);
  return (
    <div className="border-b-2 text-white border-white shadow-lg  py-4">
      <h2 className=" underline text-2xl font-semibold tracking-wider mb-4 shadow-xl w-fit transform hover:scale-110 duration-200">
        Preguntas
      </h2>
      {!(qa.posts?.length > 0) ? (
        <div className=" bg-semidark p-8 rounded shadow-xl w-full">
          <h2 className="text-3xl font-medium text-white mb-4">
            Disculpanos 😓
          </h2>
          <p className="text-white text-xl">
            Perdon no tienes publicaciones para responder Preguntas...
          </p>
        </div>
      ) : qa.posts.map((e) => e.questions?.length > 0) ? (
        qa.posts?.map((el) =>
          el.questions?.map((e) => (
            <div
              key={e.id}
              className="bg-semidark text-white rounded-2xl mb-4 h-50 p-4 flex flex-col space-y-4"
            >
              <div className="bg-dark text-white rounded-2xl p-3 w-3/5 self-start shadow-2xl">
                <h4 className="text-lg font-medium ml-2">
                  Usuario: {e.user.username}
                </h4>
                <p className="inline ml-4">Pregunto el </p>
                <span className=" font-bold underline inline underline-offset-2 ">
                  {e.createdAt.slice(0, 10)} :
                </span>
                <p className=" ml-8 font-light text-lg">{e.question}</p>
              </div>
              {e.answer ? (
                <div className="bg-semilight text-[#2F5D62] rounded-2xl p-3 w-3/5 self-end shadow-2xl">
                  <h4 className="text-lg font-medium">{qa.username}</h4>
                  <p className="inline">Respondio el </p>
                  <span className=" font-bold underline inline underline-offset-2 ">
                    {e.updatedAt.slice(0, 10)} :
                  </span>
                  <p className=" ml-8 text-lg font-light">{e.answer}</p>
                </div>
              ) : (
                <div className="bg-semilight text-[#2F5D62] rounded-2xl p-3 w-3/5 self-end shadow-2xl ">
                  <form className="p-2" onSubmit={(e) => handleOnSubmit(e)}>
                    <input
                      className="bg-semidark text-[#2F5D62]  text-center border w-full p-1 placeholder:text-center"
                      name={e.id}
                      id={e.id}
                      value={answer[`${id}`]}
                      onChange={(e) => handleChange(e)}
                      placeholder="Añade tu respuesta aquí..."
                    />
                    <div className="text-center">
                      <button
                        type="submit"
                        className=" border-2 border-white rounded-md  hover:bg-semidark hover:text-white p-2 mt-2 w-32"
                      >
                        Responder
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          ))
        )
      ) : (
        <div className=" bg-semidark p-8 rounded shadow-xl w-full">
          <h2 className="text-3xl font-medium text-white mb-4">
            Disculpanos 😓
          </h2>
          <p className="text-white text-xl">
            No tienes preguntas por el momento ...
          </p>
        </div>
      )}
    </div>
  );
}

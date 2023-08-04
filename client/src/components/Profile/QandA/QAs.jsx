import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getQAbyId, createAnswer } from "../../../actions/index";

export default function Qas() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const qa = useSelector((state) => state.index.qa);
  const [answer, setAnswer] = useState({});
  const [refresh, setRefresh] = useState(false);

  function handleChange(e) {
    e.preventDefault();
    setAnswer({
      answer: e.target.value,
      idQuestion: e.target.name,
    });
    console.log("Esta es la respuesta", answer);
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    dispatch(createAnswer(answer));
    setRefresh(true);
    setAnswer({
      answer: "",
      idQuestion: "",
    });

    console.log("Esta es la respuesta" + answer);
  }

  useEffect(() => {
    dispatch(getQAbyId(id));
    setRefresh(false);
  }, [refresh, dispatch, id]);

  return (
    <div className="flex flex-col justify-center border-2 text-white border-white rounded-lg w-11/12 h-full py-4">
      <div className="flex flex-col items-center py-2">
        {!(qa.posts?.length > 0) ? (
          <h2>No tienes publicaciones para obtener preguntas...</h2>
        ) : qa.posts.map((e) => e.questions?.length > 0) ? (
          qa.posts?.map((el) =>
            el.questions?.map((e) => (
              <div className="flex flex-col items-center bg-semidark border-2 text-white border-white rounded-lg w-11/12 py-4 mb-4">
                <div className="flex flex-row justify-center items-center  bg-dark text-white w-11/12 h-auto m-1">
                  <div className="flex flex-row justify-around items-center border w-full p-1">
                    <div>{el.title}</div>
                    <div>{e.question}</div>
                    <span className="ml-2 italic"> {e.user?.username}</span>
                  </div>
                </div>
                <div className="flex  items-center bg-dark w-11/12 rounded">
                  {!e.answer ? (
                    <form
                      className=" w-full pb-3 pt-3"
                      onSubmit={(e) => handleOnSubmit(e)}
                    >
                      <input
                        className="flex flex-row justify-around bg-dark items-center border w-full p-1"
                        name={e.id}
                        id={e.id}
                        value={answer[`${id}`]}
                        onChange={(e) => handleChange(e)}
                        placeholder="Añade tu respuesta aquí..."
                      />
                      <button
                        type="submit"
                        className="flex btn-quaternary btn-colors w-full ml-80"
                      >
                        Enviar
                      </button>
                    </form>
                  ) : (
                    <div class="flex flex-row justify-around items-center border w-full p-1">
                      {e.answer}
                    </div>
                  )}
                </div>
              </div>
            ))
          )
        ) : (
          <h1>No tienes preguntas por el momento...</h1>
        )}
      </div>
    </div>
  );
}

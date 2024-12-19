import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { postQuestion } from "../../actions/action-talents/review";

export default function QandA({ children, isOwner, user_id, post }) {
  const dispatch = useDispatch();
  const [pregunta, setPregunta] = useState({
    title: `Pregunta sobre: ${post.tile || ""}`,
    user_id: user_id || null,
    post_id: post.id || null,
    question: "",
  });

  useEffect(() => {
    setPregunta((prev) => ({
      ...prev,
      user_id,
      post_id: post.id,
      title: `Pregunta sobre: ${post.title || ""}`,
    }));
  }, [user_id, post.id, post.title]);

  const handleOnChange = (e) => {
    setPregunta((prev) => ({ ...prev, question: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pregunta.question.trim() === "") {
      return;
    }
    const dataToSend = {
      ...pregunta,
      title: pregunta.title + pregunta.question,
    };
    dispatch(postQuestion(dataToSend));
    setPregunta((prev) => ({ ...prev, question: "" }));
  };
  return (
    <section className="p-4">
      <h1 className="text-2xl mb-2 font-normal ">Preguntas y Respuestas</h1>
      {!isOwner && (
        <form
          onSubmit={handleSubmit}
          className="flex justify-between p-2 px-4 gap-4 my-4"
        >
          <input
            type="text"
            required
            name="question"
            value={pregunta.question}
            onChange={handleOnChange}
            className="border-2 border-gray-400 px-4 w-full rounded-sm"
            placeholder="Escribí tu pregunta..."
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 hover:scale-105 duration-300 p-2 w-52 text-white rounded-sm"
          >
            Preguntar
          </button>
        </form>
      )}
      {children}
    </section>
  );
}

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getPostQuestion } from "../../actions/action-talents/review";

export default function QyAanswer() {
  const dispatch = useDispatch();
  const qya = useSelector((state) => state.mislice.moreTalent);
  console.log(qya);
  const cargando = useSelector((state) => state.cargando);
  const questionPost = useSelector((state) => state.review.questionsPost);
  console.log(questionPost);
  useEffect(() => {
    dispatch(getPostQuestion(qya.id));
  }, [cargando, dispatch]);

  return (
    <div className="h-1/4 m-3">
      {/* <h3 className="text-xl font-semibold">Preguntas</h3>
      <div className="p-2">
        {questionsPost?.questions?.length > 0 ? (
          questionsPost.questions.map((e, index) => (
            <div className=" border-b-2 border-gray-500" key={index}>
              <div className="flex flex-col  mb-2 rounded-md">
                {"P: " + e.question}
                <div>
                  {e.answer
                    ? "R: " + e.answer
                    : "Esta pregunta aún no tiene respuesta"}
                </div>
              </div>
            </div>
          ))
        ) : (
          <span className="text-gray-400">Aún no hay preguntas</span>
        )}
      </div>
      <hr /> */}
      lala
    </div>
  );
}

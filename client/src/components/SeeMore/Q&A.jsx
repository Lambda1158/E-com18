import React, { useState, useEffect } from "react";
import {
  postQuestion,
  getTalentById,
  getPostQuestion,
  refresh,
} from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import QyAanswer from "./Q&Aanswer";

export default function QyA() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");

  // useEffect(() => {
  //     dispatch(postQuestion(userState.id))
  // })
  //   useEffect(() => {
  //     dispatch(getPostQuestion(id));
  //   }, [dispatch, id]);

  //   let body = {
  //     question: question,
  //     user_id: user.id,
  //     post_id: questionsPost.id,
  //   };

  function onSubmit(e) {
    e.preventDefault();
    // console.log("body del dispatch", body);
    // dispatch(
    //   postQuestion({
    //     question: question,
    //     user_id: user.id,
    //     post_id: questionsPost.id,
    //   })
    // );
    // setQuestion("");
  }

  //   function onChange(e) {
  //     e.preventDefault();
  //     setQuestion(e.target.value);
  //   }

  //   function onClick(e) {
  //     e.preventDefault();
  //     dispatch(postQuestion(body));
  //     dispatch(getPostQuestion(id));
  //     dispatch(refresh());
  //     setQuestion("");
  //     toast({
  //       title: "Pregunta enviada",
  //       status: "success",
  //       duration: 4000,
  //       isClosable: true,
  //     });
  //navigate(`/talent/${id}`); //La pregunta se va a mostrar, el usuario la tiene que responder desde su panel
  // <QyAanswer />;
  return (
    <div>
      lala
      {/* {user.id ? (
			  <div className="m-3">
				<h3 className="text-xl font-semibold">Haz una pregunta</h3>
				<form onSubmit={(e) => onSubmit(e)}>
				  <Input
					value={question}
					onChange={onChange}
					placeholder="Ingrese su pregunta"
					size="md"
				  />
				  <Button onClick={onClick}>Enviar</Button>
				</form>
			  </div>
			) : (
			  <br />
			)}
		  </> */}
    </div>
  );
}

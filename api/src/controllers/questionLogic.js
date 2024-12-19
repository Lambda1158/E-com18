const { Users, Question, Posts } = require("../db");

async function question(req, res, next) {
  const { title, question, user_id, post_id } = req.body;
  try {
    const newQuestion = await Question.create({
      title,
      question,
    });
    newQuestion.setUser(user_id);
    newQuestion.setPost(post_id);
    return res.send(newQuestion);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message, err });
  }
}
async function answer(req, res, next) {
  const { answer, idQuestion, postId } = req.body;
  if (!idQuestion)
    return res.status(401).json({ message: "No se recibio el id" });
  try {
    const newAnswer = await Question.findByPk(idQuestion);
    newAnswer.answer = answer;
    newAnswer.save();
    const allQuestions = await Question.findAll({
      where: { postId },
      include: [
        {
          model: Posts,
          attributes: ["id", "title", "description", "image"],
          include: [
            {
              model: Users,
              attributes: ["username", "email", "image"],
            },
          ],
        },
        {
          model: Users,
          attributes: ["id", "username", "email", "image"], 
        },
      ],
    });
    return res.json(allQuestions);
  } catch (err) {
    return res.status(500).json({ message: "Error en la respuesta", err });
  }
}

async function deleteQuestion(req, res) {
  const { idQuestion } = req.params;
  if (!idQuestion)
    return res.status(401).json({ message: "No se encontro idquestion" });
  try {
    Question.destroy({
      where: {
        id: idQuestion,
      },
    });
    return res.status(200).send("Question eliminada");
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Algo salio mal delet question", err });
  }
}

async function getAllQuestions(req, res, next) {
  const { idUser } = req.params;
  if (!idUser)
    return res.status(401).json({ message: "El id usuario no se encontro" });
  try {
    const allQuestions = await Question.findAll({
      include: [
        {
          model: Posts,
          where: { user_id: idUser },
          attributes: ["id", "title", "description", "rating", "cost"],
          include: [
            {
              model: Users,
              attributes: ["username", "email", "image"],
            },
          ],
        },
        {
          model: Users,
          attributes: ["username", "email", "image"],
        },
      ],
    });
    return res.json(allQuestions);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Error en traer question by id", err });
  }
}

async function getPostQuestions(req, res, next) {
  const { idPost } = req.params;
  if (!idPost)
    return res.status(401).json({ message: "No se encontro el ID del post " });
  try {
    const foundPost = await Question.findAll({
      where: {
        postId: idPost,
      },
      include: [
        {
          model: Posts,
          attributes: ["title", "description", "id", "image"],
        },
        {
          model: Users,
          attributes: ["username", "email", "image"],
        },
      ],
    });
    return res.json(foundPost);
  } catch (err) {
    return res.status(500).json({ message: "Error en get post question", err });
  }
}

module.exports = {
  question,
  answer,
  deleteQuestion,
  getAllQuestions,
  getPostQuestions,
};

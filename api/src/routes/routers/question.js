const { Router } = require("express");
const {
  question,
  answer,
  deleteQuestion,
  getAllQuestions,
  getPostQuestions,
} = require("../../controllers/questionLogic");
const router = Router();

router.get("/all/:idUser", getAllQuestions);
router.get("/:idPost", getPostQuestions);
router.post("/", question);
router.put("/answer", answer);
router.delete("/:idQuestion", deleteQuestion);

module.exports = router;

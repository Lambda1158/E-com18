const { Router } = require("express");
const {
  createReview,
  deleteReview,
  updateReview,
  getAllReviewsUser,
  getPostReview,
} = require("../../controllers/reviewLogic");
const router = Router();

router.get("/all/:id", getAllReviewsUser);
router.get("/:idPost", getPostReview);
router.post("/", createReview);
router.delete("/:idReview", deleteReview);
router.put("/:idReview", updateReview);

module.exports = router;

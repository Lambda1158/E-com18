const { Router } = require("express");
const router = Router();
const {
  getPosts,
  updatePost,
  createPost,
  deletePost,
  addImage,
  deleteImage,
  getPostId,
  getTalentsByTitle,
  getTalentosporRating,
  getUserPost,
} = require("../../controllers/postLogic");
const { uploader } = require("../../middleware/uploader");

router.get("/rating/:modo", getTalentosporRating);
router.get("/user/:id", getUserPost);
router.get("/title", getTalentsByTitle);
router.get("/", getPosts);
router.get("/:id", getPostId);

router.post("/", uploader.single("image"), createPost);
router.put("/", updatePost);
router.put("/image", uploader.single("image"), addImage);

router.delete("/:id", deletePost);
router.delete("/image/:id", deleteImage);

module.exports = router;

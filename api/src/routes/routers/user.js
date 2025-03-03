const { Router } = require("express");
const router = Router();
const {
  createUser,
  deleteUser,
  getUser,
  getLogIn,
  editUser,
  confirm,
  emailResetPassword,
  editPassword,
  getUserById,
} = require("../../controllers/userLogic");
const { uploader } = require("../../middleware/uploader");

router.get("/confirm/:token", confirm);
router.get("/", getUser);
router.get("/:idUser", getUserById);
router.post("/", uploader.single("image"), createUser);
router.delete("/", deleteUser);
router.post("/loggin", getLogIn);
router.put("/", uploader.single("image"), editUser);
router.post("/emailResetPassword", emailResetPassword);
router.put("/editPassword", editPassword);

module.exports = router;

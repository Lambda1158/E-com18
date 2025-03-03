const { Router } = require("express");
const router = Router();
const {getCategories,updateCategories,createCategories, deleteCategories, getCategoriesById}=require("../../controllers/categoriesLogic");


router.get("/",getCategories)
router.get('/:id', getCategoriesById)
router.post("/",createCategories)
router.put("/",updateCategories)
router.delete("/",deleteCategories)





module.exports = router;
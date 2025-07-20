import {Router} from "express";
import {deleteCategory,saveCategory , updateCategory , getCategory , getAllCategories} from "../controllers/category.controller";

const  categoryRouter : Router = Router();

// Handle request
categoryRouter.get("/all" , getAllCategories);
categoryRouter.post("/save" , saveCategory);
categoryRouter.get("/:id" , getCategory)
categoryRouter.put("/update/:id" , updateCategory)
categoryRouter.delete("/delete/:id" , deleteCategory)

export default categoryRouter;

import {Router} from "express";
import {getUser , getAllUsers , saveUser , updateUser , deleteUser} from "../controllers/user.controller";

const  userRoutes : Router = Router();


userRoutes.get("/all" , getAllUsers);
userRoutes.post("/save" , saveUser);
userRoutes.get("/:id" , getUser)
userRoutes.put("/update/:id" , updateUser)
userRoutes.delete("/delete/:id" , deleteUser)

export default userRoutes;

import {Router} from "express";
import {getUser , getAllUsers , saveUser , updateUser , deleteUser} from "../controllers/user.controller";
import {authenticateToken, authorizeRole} from "../middleware/auth.middleware";
import {authenticateUser} from "../controllers/auth.controller";

const  userRoutes : Router = Router();


userRoutes.get("/all" ,authenticateToken,authorizeRole('ADMIN'), getAllUsers);
userRoutes.post("/save" ,  saveUser);
userRoutes.get("/:id" ,authenticateToken,authorizeRole('ADMIN'),getUser)
userRoutes.put("/update/:id" , updateUser)
userRoutes.delete("/delete/:id" ,authenticateToken,authorizeRole('ADMIN'), deleteUser)

export default userRoutes;



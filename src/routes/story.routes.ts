import {Router} from "express";
import {
    getAllStories,
    saveStory,
    updateStory,
    deleteStory,
    getStories,
    getStory, getUserStories
} from "../controllers/story.controller";
import {authenticateToken} from "../middleware/auth.middleware";



const  storyRouter : Router = Router();
storyRouter.get("/my-stories", authenticateToken, getUserStories);

storyRouter.get("/all" , getAllStories);
storyRouter.post("/save" ,saveStory);
 storyRouter.get("/all/:id" , getStory);
storyRouter.put("/update/:id" ,updateStory)
storyRouter.delete("/delete/:id" , deleteStory)
storyRouter.get("/:categoryName", getStories);

export default storyRouter;

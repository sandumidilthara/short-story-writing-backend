import {Router} from "express";
import {
    getAllStories,
    saveStory,
    updateStory,
    deleteStory,
    getStories,
    getStory
} from "../controllers/story.controller";


const  storyRouter : Router = Router();


storyRouter.get("/all" , getAllStories);
storyRouter.post("/save" , saveStory);
 storyRouter.get("/all/:id" , getStory);
storyRouter.get("/:categoryName", getStories);
storyRouter.put("/update/:id" , updateStory)
storyRouter.delete("/delete/:id" , deleteStory)

export default storyRouter;

import {Router} from "express";
import {getAllStories , saveStory , updateStory ,deleteStory , getStories} from "../controllers/story.controller";

const  storyRouter : Router = Router();

// Handle request
storyRouter.get("/all" , getAllStories);
storyRouter.post("/save" , saveStory);
storyRouter.get("/:categoryName", getStories);
storyRouter.put("/update/:id" , updateStory)
storyRouter.delete("/delete/:id" , deleteStory)

export default storyRouter;

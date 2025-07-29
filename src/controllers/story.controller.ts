import {Request, Response} from "express";
import * as storyService from "../services/story.service"





export const getAllStories = async (req: Request, res: Response) => {

    try {
        const stories = await storyService.getAllStories();
        res.status(200).json(stories)
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: 'Something went wrong'
        })
    }

}



export const getStory = async (req: Request, res: Response) => {
    const storyId =  req.params.id;
    const userIdPattern = /^STORY_\d+_\d{3}$/; // USER_timestamp_randomnumber format

    if (!storyId || !userIdPattern.test(storyId)) {
        res.status(400).json({
            error: 'Invalid Story ID Format!!!!'
        });
        return;
    }
    const story = await storyService.getStoryById(storyId)
    if(!story){
        res.status(404).json({
            error : 'Story not found!!'
        })
        return;
    }
    res.status(200).json(story)
}
export const saveStory = async (req: Request, res: Response) => {

    try {
        const newStory = req.body;
        const validationError = storyService.validateStory(newStory);
        if (validationError) {
            res.status(400).json({
                error: validationError
            });
            return
        }
        const savedStory = await storyService.saveStory(newStory)
        res.status(201).json(savedStory)

    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: 'Something went wrong'
        })
    }

}



export const getStories = async (req: Request, res: Response) => {
    try {

        const categoryName = req.params.categoryName;


        if (!categoryName || categoryName.trim() === '') {
            return res.status(400).json({
                error: 'Category name is required'
            });
        }

        const storyDtos = await storyService.getStoriesByCategory(categoryName);


        if (!storyDtos || storyDtos.length === 0) {
            return res.status(404).json({
                error: 'Stories not found for this category!',
                category: categoryName
            });
        }

        return res.status(200).json(storyDtos);

    } catch (error) {
        console.error('Error in getStories controller:', error);
        return res.status(500).json({
            error: 'Internal server error',

        });
    }
};




    export const updateStory = async (req: Request, res: Response) => {

    const storyId = req.params.id;
        const userIdPattern = /^STORY_\d+_\d{3}$/; // USER_timestamp_randomnumber format

        if (!storyId || !userIdPattern.test(storyId)) {
            res.status(400).json({
                error: 'Invalid STORY ID Format!!!!'
            });
            return;
        }

    const updatedData = req.body;
    const updatedStory = await storyService.updateStory(storyId , updatedData)
    if(!updatedStory){
        res.status(404 ).json({
            error : 'Story not found!!'
        })
        return;
    }
    res.status(200).json(updatedStory)

}
export const deleteStory = async (req: Request, res: Response) => {

    const storyId = req.params.id;
    const userIdPattern = /^STORY_\d+_\d{3}$/; // USER_timestamp_randomnumber format

    if (!storyId || !userIdPattern.test(storyId)) {
        res.status(400).json({
            error: 'Invalid STORY ID Format!!!!'
        });
        return;
    }
    const deletedCategory = await storyService.deleteStory(storyId);
    if(!deletedCategory){
        res.status(404).json({
            error : 'Story not found!!'
        })
        return;
    }
    res.status(200).json({
        message : 'Story deleted successfully!! '
    })
}


export const getUserStories = async (req: Request, res: Response) => {
    try {
        console.log('getUserStories called');
        console.log('req.user:', (req as any).user);


        const user = (req as any).user;
        if (!user) {
            console.log('No user found in request');
            return res.status(401).json({
                error: 'User not authenticated'
            });
        }


        let userEmail = null;


        if (user.email) {
            userEmail = user.email;
        }

        else if (req.headers['user-email']) {
            userEmail = req.headers['user-email'] as string;
        }

        else if (req.body.email) {
            userEmail = req.body.email;
        }

        console.log('User email:', userEmail);

        if (!userEmail) {
            return res.status(400).json({
                error: 'User email not found'
            });
        }

        const stories = await storyService.getStoriesByAuthorEmail(userEmail);
        console.log('Stories found:', stories.length);

        return res.status(200).json({
            stories,
            count: stories.length,
            userEmail
        });

    } catch (error) {
        console.error('Error in getUserStories controller:', error);
        return res.status(500).json({
            error: 'Internal server error',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
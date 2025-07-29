

import  Story from "../model/story.model"
import {StoryDto} from "../dto/story.dto";




export const getAllStories = async ():Promise<StoryDto[]>  => {
    return Story.find();
}


export const saveStory = async (category : StoryDto) : Promise<StoryDto> => {
    return  Story.create(category)
}

export const getStoriesByCategory = async (categoryName: string): Promise<StoryDto[]> => {
    try {

        const stories = await Story.find({
            category: {
                $regex: categoryName,
                $options: 'i'
            }
        })
            .sort({ category: 1 })
            .lean();

        return stories as StoryDto[];

    } catch (error) {
        console.error('Error fetching stories by category:', error);
        throw new Error('Failed to fetch stories');
    }
};

export const updateStory = async (id : string , data : StoryDto) => {
    const story = await Story.findOneAndUpdate({id :id} , data , {new :true})
    if(!story){
        return null
    }
    return story
}



export const deleteStory = async (id : string) => {
    await Story.deleteOne({id :id});
    return true;
}



export const getStoryById = async (id : string): Promise<StoryDto | null> => {
    return Story.findOne({id :id});
}

export const validateStory = (story : StoryDto) => {
    if(  !story.name || !story.category || !story.author || !story.authorEmail || !story.content || !story.imageUrl || !story.createdAt){
        return "All fields are required !!"
    }
    return null;
}




export const getStoriesByAuthorEmail = async (authorEmail: string): Promise<StoryDto[]> => {
    try {
        const stories = await Story.find({
            authorEmail: {
                $regex: `^${authorEmail}$`,
                $options: 'i'
            }
        })
            .sort({ createdAt: -1 }) // Sort by newest first
            .lean();

        return stories as StoryDto[];

    } catch (error) {
        console.error('Error fetching stories by author email:', error);
        throw new Error('Failed to fetch user stories');
    }
};
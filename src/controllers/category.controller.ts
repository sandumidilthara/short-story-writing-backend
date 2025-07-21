import {Request, Response} from "express";
import * as categoryService from "../services/category.service"



export const getAllCategories = async (req: Request, res: Response) => {

    try {
        const categories = await categoryService.getAllCategories();
        res.status(200).json(categories)
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: 'Something went wrong'
        })
    }

}
export const saveCategory = async (req: Request, res: Response) => {

    try {
        const newCategory = req.body;
        const validationError = categoryService.validateCategory(newCategory);
        if (validationError) {
            res.status(400).json({
                error: validationError
            });
            return
        }
        const savedCategory = await categoryService.saveCategory(newCategory)
        res.status(201).json(savedCategory)

    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: 'Something went wrong'
        })
    }

}



export const getCategory = async (req: Request, res: Response) => {
    const categoryId =  req.params.id;
    const userIdPattern = /^CATEGORY_\d+_\d{3}$/; // USER_timestamp_randomnumber format

    if (!categoryId || !userIdPattern.test(categoryId)) {
        res.status(400).json({
            error: 'Invalid Category ID Format!!!!'
        });
        return;
    }
    const category = await categoryService.getCategoryById(categoryId)
    if(!category){
        res.status(404).json({
            error : 'Category not found!!'
        })
        return;
    }
    res.status(200).json(category)
}



export const updateCategory = async (req: Request, res: Response) => {

    const categoryId = req.params.id;
    const userIdPattern = /^CATEGORY_\d+_\d{3}$/; // USER_timestamp_randomnumber format

    if (!categoryId || !userIdPattern.test(categoryId)) {
        res.status(400).json({
            error: 'Invalid Category ID Format!!!!'
        });
        return;
    }

    const updatedData = req.body;
    const updatedCategory = await categoryService.updateCategory(categoryId , updatedData)
    if(!updatedCategory){
        res.status(404 ).json({
            error : 'Category not found!!'
        })
        return;
    }
    res.status(200).json(updatedCategory)

}
export const deleteCategory = async (req: Request, res: Response) => {

    const categoryId = req.params.id;
    const userIdPattern = /^CATEGORY_\d+_\d{3}$/; // USER_timestamp_randomnumber format

    if (!categoryId || !userIdPattern.test(categoryId)) {
        res.status(400).json({
            error: 'Invalid Category ID Format!!!!'
        });
        return;
    }
    const deletedCategory = await categoryService.deleteCategory(categoryId);
    if(!deletedCategory){
        res.status(404).json({
            error : 'Category not found!!'
        })
        return;
    }
    res.status(200).json({
        message : 'Category deleted successfully!! '
    })
}
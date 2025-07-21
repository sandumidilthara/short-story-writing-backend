import mongoose from "mongoose";

const storyModel =new mongoose.Schema(
    {
        "id": {
            type: String,
            unique: true,
            index: true,
            default: function() {

                const timestamp = Date.now().toString();
                const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
                return `STORY_${timestamp}_${random}`;
            }
        } ,
        "name" :{
            required:true,
            type :String
        } ,
        "category" :{
            required:true,
            type:String,
            index : true
        } ,
        "author" :{
            required:true,
            type:String
        } ,
        "authorEmail" :{
            required:true,
            type:String
        } ,
        "content" :{
            required:true,
            type:String
        } ,
        "imageUrl" : {
            required:true,
            type:String
        } ,
        "createdAt" : {
            required:true,
            type:Date
        }
    }
);

const Story = mongoose.model('Story' ,storyModel)
export default Story;
import express, {Express, Request, Response} from "express";

import cors  from 'cors';

import DBConnection from "./db/DBConnection";
import categoryRoutes from "./routes/category.routes";
import storyRoutes from "./routes/story.routes";
import userRoutes from "./routes/user.routes";

// 1. Initialize the express app
const  app:Express = express();


DBConnection().then(result => console.log(result));



// 2.define middlewares
//2.1 Instruct to parse the request payload data to be converted to JSON format
app.use(express.json());



app.use("/api/category", categoryRoutes )
app.use("/api/story", storyRoutes )
app.use("/api/user", userRoutes )
// // 3 . Define simple HTTP get request
app.get('/' ,(req : Request , res :Response) =>{
    console.log(req.body)
    res.send("Hello World!!!") });


export default app;


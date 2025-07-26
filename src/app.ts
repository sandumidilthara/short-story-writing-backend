import express, {Express, Request, Response} from "express";

import cors  from 'cors';

import DBConnection from "./db/DBConnection";
import categoryRoutes from "./routes/category.routes";
import storyRoutes from "./routes/story.routes";
import userRoutes from "./routes/user.routes";

import authRoutes from "./routes/auth.routes";
const  app:Express = express();


DBConnection().then(result => console.log(result));




app.use(express.json());


const allowedOrigins = [
    "http://localhost:5173"
];

const corsOptions = {
    origin : (origin : string | undefined , callback :(err : Error | null , allow?: boolean) => void) => {
        if(!origin ||allowedOrigins.includes(origin) ){
            callback(null ,true)
        } else{
            callback(new Error("Not allowed by CORS"))
        }
    }
}
app.use(cors(corsOptions));

app.use("/api/auth" ,authRoutes )
app.use("/api/category", categoryRoutes )
app.use("/api/story", storyRoutes )
app.use("/api/user", userRoutes )

app.get('/' ,(req : Request , res :Response) =>{
    console.log(req.body)
    res.send("Hello World!!!") });


export default app;


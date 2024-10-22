import express, { Express, Request, Response } from 'express';
import cookieParser from "cookie-parser";
import router from '../routes/authRoute.js';
import { connectDB } from "../helpers/dbController.js";
import { authverify } from '../middleware/authMiddleware.js';
import { config } from "dotenv";
const app: Express = express();

config();
app.use(express.json());
app.use(cookieParser());
app.use(router);
connectDB();

const port = 3000

app.get('/', authverify, (_req: Request, res: Response) => {
    res.send('Hello World!')
})
app.listen(port, () => console.log(`Auth Server port ${port}!`))
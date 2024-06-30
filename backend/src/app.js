import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

/* .use id the middleware */
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

/* takes json limit as per the limit bases */
app.use(express.json({limit: "16kb"}));
/* for encoding the url as takes any search engine */
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));
app.use(cookieParser());

export { app };
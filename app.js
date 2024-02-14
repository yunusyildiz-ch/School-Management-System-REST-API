import Express from "express";
import cors from "cors";
import Morgan from "morgan";

const app = Express();

app.use(cors());
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(Morgan("dev"));

export default app;

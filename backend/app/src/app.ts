
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import router from "./routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

// Обработчик ошибок
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack); // Выводит стек ошибки в консоль
    res.status(500).send('Something broke!');
});

export default app;

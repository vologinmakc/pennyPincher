import "reflect-metadata";
import { createConnection } from "typeorm";

import app from "./app";


createConnection().then(async connection => {
    app.listen(8000, () => {
        console.log("Server started on http://localhost:8000");
    });
}).catch(error => console.log(error));

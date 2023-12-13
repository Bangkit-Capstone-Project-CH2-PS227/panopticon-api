import express from "express";
import db from "./config/Database.js"
import router from "./routes/routes.js";
import dotenv from "dotenv";
// import Users from "./models/userModel.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();
const port = 5000;

try {
    await db.authenticate();
    console.log('Database Connected');
    //ketika tidak memiliki tabel di db, maka sequelize akan menggenerate secara auto
    // await Users.sync();
} catch (error) {
    console.error(error);
}

app.use(cors({credentials:true, origin:`http://localhost${port}`}));
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});

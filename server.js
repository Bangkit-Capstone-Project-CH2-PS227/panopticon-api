import express from "express";
import db from "./config/Database.js"
import router from "./routes/routes.js";
import dotenv from "dotenv";
// import Users from "./models/userModel.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import basicAuth from 'express-basic-auth';

dotenv.config();

const app = express();
const port = 5000;
const host = process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0';

const admin = {
    'admin': process.env.passwordAPI,
};

try {
    await db.authenticate();
    console.log('Database Connected');
    //ketika tidak memiliki tabel di db, maka sequelize akan menggenerate secara auto
    // await Users.sync();
} catch (error) {
    console.error(error);
}

app.use(basicAuth({
    users: admin,
    challenge: true, 
}));

//Ganti port buat testing api fetch
app.use(cors({credentials:true, origin:`http://${host}:3000`}));
app.use(cookieParser());
app.use(express.json());
app.use(router);


app.listen(port, () => {
    console.log(`Server started on http://${host}:${port}`);
});

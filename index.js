const express = require("express")
const router = require("./routes/routes.js")
const dotenv = require("dotenv")
// const Users = require("./models/userModel.js")
const cookieParser = require("cookie-parser")
const cors = require("cors")

dotenv.config();

const app = express();
const port = 5000;

try {
    // await db.authenticate();
    // console.log('Database Connected');
    //ketika tidak memiliki tabel di db, maka sequelize akan menggenerate secara auto
    // await Users.sync();
} catch (error) {
    console.error(error);
}

//Ganti port buat testing api fetch
app.use(cors({credentials:true, origin:`http://localhost:3000`}));
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});

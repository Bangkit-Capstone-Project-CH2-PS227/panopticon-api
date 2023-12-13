const db = require("./../models");
const generateRoom = ''
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { nanoid } = require("nanoid");

const getUsers = async (req, res) => {
    try {
        const users = await db.User.findAll({
            attributes: ['id', 'name', 'email']
        })
        res.json(users);
    } catch (error) {
        console.log(error)
    }
}

const register = async (req, res) => {
    const { name, email, password, confirmPass } = req.body;
    if (password !== confirmPass) {
        return res.status(400).json({
            msg: "Password dan Confirm password tidak cocok"
        })
    }
    const salt = await bcrypt.genSalt();
    const hashPass = await bcrypt.hash(password, salt);

    try {
        await db.User.create({
            name: name,
            email: email,
            password: hashPass
        })
        res.json({
            msg: "Register berhasil"
        })
    } catch (error) {
        console.log(error);
    }

}

const login = async (req, res) => {
    try {
        const user = await db.User.findAll({
            where: {
                email: req.body.email
            }
        })
        //ngambil index ke-nol karena single data
        const match = await bcrypt.compare(req.body.password, user[0].password)
        if (!match) {
            return res.status(400).json({
                msg: "Wrong Password"
            });
        }
        const userId = user[0].id;
        const name = user[0].name;
        const email = user[0].email;
        const accessToken = jwt.sign({
            userId, name, email
        }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '20s'
        });
        console.log(1)
        const refreshToken = jwt.sign({
            userId, name, email
        }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        });
        console.log(refreshToken)
        await db.User.update({
            refresh_token: refreshToken
        }, {
            where: {
                id: userId
            }
        })
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            // apabila mau jadi https 
            //secure: true
        })
        res.json({ accessToken })
    } catch (error) {
        console.log(error.message)
        res.status(404).json({
            msg: "Email tidak ditemukan"
        })
    }
}

const logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.sendStatus(204);
    }
    const user = await db.User.findAll({
        where: {
            refresh_token: refreshToken
        }
    });
    if (!user[0]) {
        return res.sendStatus(204);
    }
    const userId = user[0].id;
    await db.User.update({ refreshToken: null }, {
        where: {
            id: userId
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}

const createRoom = async (req, res) => {
    const { nameRoom } = req.body;
    const roomToken = nanoid(7);
    const refreshToken = req.cookies.refreshToken;
    const user = await db.User.findAll({
        where: {
            refresh_token: refreshToken
        }
    });
    const username = user[0].name;

    await db.User.findAll({
        where: {
            name: username
        }
    });

    try {
        await db.Room.create({
            name_room: nameRoom,
            tokenRoom: roomToken,
            username: username
        })
        console.log(nameRoom)
        res.json({
            msg: 'Berhasil membuat room'
        })
    } catch (error) {
        console.log(error)
    }
}

const landingPage = async (req, res) => {
    res.json({
        msg: 'Selamat datang di Panopticon'
    })
}

module.exports = {
    getUsers,
    register,
    login,
    logout,
    createRoom,
    landingPage
};
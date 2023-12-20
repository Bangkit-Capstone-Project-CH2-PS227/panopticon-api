import { generateRoom, Users } from "../models/userModel.js";
import bcyrptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";

export const getUsers = async(req, res) => {
    try {
        const users = await Users.findAll({
            attributes:['id', 'name', 'email']
        })
         res.json(users);
    } catch (error) {
        console.log(error)
    }
}

export const register = async(req, res) => {
    const { name, email, password} = req.body;
    // if(password !== confirmPass) {
    //     return res.status(400).json({
    //         msg: "Password dan Confirm password tidak cocok"
    //     })
    // }
    const salt = await bcyrptjs.genSalt();
    const hashPass = await bcyrptjs.hash(password, salt);
    try {    
        await Users.create({
            name: name,
            email: email,
            password: hashPass
        })
        res.json({
            msg: "Register berhasil"
        })
    } catch (error) {
        if(error.name === 'SequelizeUniqueConstraintError') {
            res.status(403); 
            res.send({
                message: "Nama sudah ada"
        })} else if (password.length < 8){
            res.send({
                message: "Password minimal 8 karakter"
        })}else if (password.length > 30){
            res.send({
                message: "Password maksimal 30 karakter"
        })} else {
            res.status(500)
            res.send({ message: "Something went wrong"});
        }
    }

}

export const login = async(req, res) => {
    try {
        const user = await Users.findAll({
            where:{
                email: req.body.email
            }
        })
         //ngambil index ke-nol karena single data
         const match = await bcyrptjs.compare(req.body.password, user[0].password)
         if(!match){
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
         const refreshToken = jwt.sign({
            userId, name, email
         }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
         });
         await Users.update({
            refresh_token: refreshToken
         }, {
            where:{
                id: userId
            }
         })
         res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            // apabila mau jadi https 
            //secure: true
         })
         res.json({accessToken})
    } catch (error) {
        res.status(404).json({
            msg:"Email tidak ditemukan"
        })
    }
}

export const logout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken){
        return res.sendStatus(204);
    }
    const user = await Users.findAll({
        where:{
            refresh_token: refreshToken
        }
    });
    if(!user[0]){
        return res.sendStatus(204);
    }
    const userId = user[0].id;
    await Users.update({refreshToken: null}, {
        where:{
            id: userId
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}

export const createRoom = async(req, res) => {
    const { nameRoom } = req.body;
    const roomToken = nanoid(7);
    const refreshToken = req.cookies.refreshToken;
    const user = await Users.findAll({
        where:{
            refresh_token: refreshToken
        }
    });
    const username = user[0].name;

    await Users.findAll( {
        where:{
            name: username
        }
    });
    
    try {
        await generateRoom.create({
            name_room: nameRoom,
            tokenRoom: roomToken,
            username: username
        })
        // console.log(nameRoom)
        res.json({
            msg: `berhasil membuat room`,
            username: username,
            name_room: nameRoom,
            token_room: roomToken,
        })
    } catch (error) {
        console.log(error)
    }
}

export const landingPage = async(req, res) => {
    res.json({
        msg: `Selamat datang di Panopticon! Effortless Protection Meets Intuitive Learning`
    })
}
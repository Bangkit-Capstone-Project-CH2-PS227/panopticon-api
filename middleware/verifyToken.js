import jwt from "jsonwebtoken";

export const verifyToken= (req, res, next) => {
    const authHeader = req.headers['authorization'];
    //Jika user tidak mengirimkan token, maka variabel token akan kosong
    //Jika user mengirimkan token, lakukan split dan ambil token
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null){
        return res.sendStatus(401);
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) =>{
        if(err){
            return res.sendStatus(403);
        }
        req.email = decoded.email;
        next();
    });
}
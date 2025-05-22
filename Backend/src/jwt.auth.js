import jwt from "jsonwebtoken";

const jwtAuth = (req, res, next) => {

    const token  = req.cookies.token;
    if(!token){
        res.status(400).send("Unauthorized Token, ACCESS DENIED");
    }
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.userID = payload.userID;
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }

    next();
}

export default jwtAuth;
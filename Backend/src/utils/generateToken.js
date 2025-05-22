import jwt from "jsonwebtoken"


export const generateToken = (res, userID) => {
    const token = jwt.sign({userID} , process.env.JWT_SECRET, {
        expiresIn : "2d"
    })

    res.cookie("token" ,token, {
        httpOnly : true,
        maxAge : 2 * 24 * 60 *60 *1000
    })
    return token
}
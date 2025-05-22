import bcryptjs from "bcryptjs";
import {User} from "../models/user.models.js"
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

export const signup = async (req, res) => {
    const {username , password, email} = req.body;

    try {
        if(!email || !username || !password){
            // toaster function
            throw new Error("All fields are required")
        }

        const alreadyExsist = await User.findOne({email})
        console.log("exsist usre ",alreadyExsist);
        
        if(alreadyExsist) {
            return res.status(400).json({success: false, message : "User exsists"});
        }

        const hashed = await bcrypt.hash(password, 12)
        const user = new User({email, password : hashed, username })

        await user.save()

        // jwt token
        const token = generateToken(res, user._id)

        res.status(201).json({succes : true, messsage : "User created"})

    } catch (error) {
        return res.status(400).json({success: false, message : error.message})
    }

}
export const login = async (req, res) => {
    const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ success: false, message: "Invalid credentials" });
		}
		const isPasswordValid = await bcryptjs.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(400).json({ success: false, message: "Invalid credentials" });
		}

		generateToken(res, user._id);

		await user.save();

		res.status(200).json({
			success: true,
			message: "Logged in successfully",
			user: {
				...user._doc,
				password: undefined,
			},
		});
	} catch (error) {
		console.log("Error in login ", error);
		res.status(400).json({ success: false, message: error.message });
	}

}
export const logout = async (req, res) => {
    res.clearCookie("token")
    res.status(200).json({succes : true, messsage : "Logged out"})

}
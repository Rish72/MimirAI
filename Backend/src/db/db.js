import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URL)
        console.log(
            "CONNECTED "
        );
        
    } catch (error) {
        console.log("cant conn",error);
        process.exit(1);
    }
}
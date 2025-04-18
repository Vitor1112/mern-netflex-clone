import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";



export const connectDB = async () => {
	try {
		
		const conn = await mongoose.connect(ENV_VARS.MONGO_URI);
		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (error) {
		console.log("Error connection to MongoDB: ", error.message);
		process.exit(1); // 1 is failure, 0 status code is success
	}
};

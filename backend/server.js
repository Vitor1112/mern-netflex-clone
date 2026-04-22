import express from "express";
import router from "./routes/routes.js";
import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";
import movieRouter from "./routes/movieRoutes.js";
import tvRouter from "./routes/tvRoutes.js";
import cookieParser from "cookie-parser";
import { protectRoute } from "./middleware/protectRoute.js";
import searchRouter from "./routes/serachRoutes.js";
import path from "path";

const __dirname = path.resolve();

const app = express();
const PORT = ENV_VARS.PORT;
app.use(express.json())
app.use(cookieParser())


app.use("/api/v1/auth",router) // rotas de autenticação de usuário
app.use("/api/v1/movie",protectRoute,movieRouter) // rotas de filmes
app.use("/api/v1/tv",protectRoute,tvRouter) // rotas de tv
app.use("/api/v1/search",protectRoute,searchRouter) // rotas de buscar

if (ENV_VARS.NODE_ENV === "production") {
	/* app.use(express.static(path.join(__dirname, "/frontend/dist"))); */
	app.use(express.static(path.join(__dirname, "frontend", "dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(PORT, () =>{
    console.log(`Server is running on http://localhost:${PORT} `);
    connectDB();
} )













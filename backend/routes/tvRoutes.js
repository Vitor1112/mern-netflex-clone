import express from "express";
import { getTrendingTv ,getTvTrailers ,getTvDetails,getSimilarTvs,getTvsByCategory  } from "../controllers/tvController.js";

const tvRouter = express.Router();

tvRouter.get('/trending',getTrendingTv) //  Mostra todos filmes que estão em alta
tvRouter.get('/trailers/:id',getTvTrailers )// filmes trailers por id
tvRouter.get('/details/:id',getTvDetails)// filmes detalhes por id
tvRouter.get('/similar/:id',getSimilarTvs)// filmes semelhantes por idgetMoviesByCategory
tvRouter.get('/:category',getTvsByCategory)// filmes por Popular    passa paremetro popular ou top_rated





export default tvRouter;
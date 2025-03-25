import express from "express";
import { getMovieTrailers, getTrendingMovies,getMovieDetails,getSimilarMovies,MoviesByCategory  } from "../controllers/movieController.js";

const movieRouter = express.Router();

movieRouter.get('/trending',getTrendingMovies) //  Mostra todos filmes que estão em alta
movieRouter.get('/trailers/:id',getMovieTrailers)// filmes trailers por id
movieRouter.get('/details/:id',getMovieDetails)// filmes detalhes por id
movieRouter.get('/similar/:id',getSimilarMovies)// filmes semelhantes por idgetMoviesByCategory
movieRouter.get('/:category',MoviesByCategory  )// filmes por Popular    passa paremetro popular ou top_rated

                      


export default movieRouter;
import express from "express";
import { getSearchHistory, removeItemFromSearchHistory, searchMovie, searchPerson, searchTv } from "../controllers/searchController.js";

const searchRouter = express.Router();

searchRouter.get("/person/:query",searchPerson) // pesquisar pessoas por nome
searchRouter.get("/movie/:query",searchMovie) // pesquisar filmes por nome
searchRouter.get("/tv/:query",searchTv) // pesquisar tv por nome

searchRouter.get("/history",getSearchHistory)// pesquisar no banco de dados o filme que foi buscado pelo usuário
searchRouter.delete("/history/:id",removeItemFromSearchHistory)// excluir do banco de dados o filme que foi buscado pelo usuário







export default searchRouter;
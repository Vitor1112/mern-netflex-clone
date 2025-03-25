import { fetchFromTmdb } from "../services/tmdbService.js"

// Filmes em alta
export const getTrendingMovies = async (req, res) => {
    try { 
        // ele vai trazer todos  os filme do dia
        const data = await fetchFromTmdb('https://api.themoviedb.org/3/trending/movie/day?language=pt-BR')
        
        // aqui vai trazer um filme aleatório do dia
       const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)] 
        // como trazer posição aleatória
       /* const randomIndex = Math.floor(Math.random() * data.results.length);
        const randomMovie = data.results[randomIndex];  para  trazer posição aleatória */

      

        res.json({sucess: true, content: randomMovie})

    } catch (error) {
        res.status(500).json({ sucess: false, message: "Internal Server Error", error});
        
    }
}

//Filmes Trailers por
export const getMovieTrailers = async (req, res) => {
    const {id} = req.params;
    try {
        const data = await fetchFromTmdb(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`)
        res.json({ success: true, trailers: data.results })
        
    } catch (error) {
        if(error.response.status === 404){
            res.status(404).send(null);
        }
        
        res.status(500).json({ sucess: false, message: "Internal Server Error", error});
    }

}

//Filmes detalhes por id
export const getMovieDetails = async (req, res) => {
    const {id} = req.params;
    try {
        const data = await fetchFromTmdb(`https://api.themoviedb.org/3/movie/${id}?language=pt-BR`)
        res.json({ success: true, content: data })
    } catch (error) {
        if(error.response.status === 404){
            res.status(404).send(null);
        }
        res.status(500).json({ sucess: false, message: "Internal Server Error", error});
    }
}
//Filmes semelhantes por id
export const getSimilarMovies = async (req, res) => {
    const {id} = req.params;
    try {
        const data = await fetchFromTmdb(`https://api.themoviedb.org/3/movie/${id}/similar?language=pt-BR&page=1`)
        res.status(200).json({ success: true, similar: data.results })
        
    } catch (error) {
     
        res.status(500).json({ sucess: false, message: "Internal Server Error", error});
        
    }
}

// Filmes por categoria
export const MoviesByCategory = async (req, res) => {
   
    const { category } = req.params;
	try {
		const data = await fetchFromTmdb(`https://api.themoviedb.org/3/movie/${category}?language=pt-BR&page=1`);
		res.status(200).json({ success: true, content: data.results });
	} catch (error) {
		res.status(500).json({ success: false, message: "Internal Server Error" ,error});
	}
}
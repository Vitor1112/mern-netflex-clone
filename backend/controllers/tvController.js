import { fetchFromTmdb } from "../services/tmdbService.js"

// tv em alta
export const getTrendingTv = async (req, res) => {
    try { 
        // ele vai trazer todos  programas de tv do dia
        const data = await fetchFromTmdb('https://api.themoviedb.org/3/trending/tv/day?language=pt-BR')
        
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

//tv Trailers por id 
export const getTvTrailers = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await fetchFromTmdb(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`);
        console.log("Resposta da API:", data); // <-- Veja a resposta completa
        res.json({ success: true, trailers: data.results });
    } catch (error) {
        if (error.response?.status === 404) {
            res.status(404).send(null);
        }
        res.status(500).json({ success: false, message: "Internal Server Error", error });
    }
};


// ver detalhes de um serie de TV por id
export const getTvDetails = async (req, res) => {
    const {id} = req.params;
    try {
        const data = await fetchFromTmdb(`https://api.themoviedb.org/3/tv/${id}?language=pt-BR`)
        res.json({ success: true, content: data })
    } catch (error) {
        if(error.response.status === 404){
            res.status(404).send(null);
        }
        res.status(500).json({ sucess: false, message: "Internal Server Error", error});
    }
}
//filtra  por programas de tv similares por id
export const getSimilarTvs = async (req, res) => {
    const {id} = req.params;
    try {
        const data = await fetchFromTmdb(`https://api.themoviedb.org/3/tv/${id}/similar?language=pt-BR&page=1`)
        res.status(200).json({ success: true, similar: data.results })
        
    } catch (error) {
     
        res.status(500).json({ sucess: false, message: "Internal Server Error", error});
        
    }
}

// Filtra por categoria de tv por id
export const getTvsByCategory = async (req, res) => {
   
    const { category } = req.params;
	try {
		const data = await fetchFromTmdb(`https://api.themoviedb.org/3/tv/${category}?language=pt-BR&page=1`);
		res.status(200).json({ success: true, content: data.results });
	} catch (error) {
		res.status(500).json({ success: false, message: "Internal Server Error" ,error});
	}
}
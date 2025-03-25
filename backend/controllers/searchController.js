import { User } from "../models/userModel.js";
import { fetchFromTmdb } from "../services/tmdbService.js";

// Buscar pessoas por nome
export const searchPerson = async (req, res) => {
  const { query } = req.params;
  try {
    const response = await fetchFromTmdb(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=pt-BR&page=1`);

    if (response.results.length === 0) {
      return res.status(404).send(null);

    }
     // Verificar se o histórico já contém a série (evitar duplicatas)
     const existingHistory = await User.findOne({
      _id: req.user._id,
      "searchHistory.id": response.results[0].id,
    });

    if (existingHistory) {
      return res.json({ success: true, content: response.results });
    }

    // Se não existir, adicionar ao histórico

    // Vai adicionar dentro do campo "searchHistory"  que foi criado no modelo User no banco de dados,e dentro dele existe um array , "e será salvo o objeto do filme que está sendo buscado pelo usuário" usando PUSH

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].profile_path,
          title: response.results[0].name,
          searchType: "person",
          createdAt: new Date(),

        },
      },
    });

    res.status(200).json({ sucess: true, content: response.results });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ sucess: false, message: "Internal Server Error", error });
  }
};
// Buscar filmes por nome
export const searchMovie = async (req, res) => {

  const { query } = req.params;
  try {
    const response = await fetchFromTmdb(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=pt-BR&page=1`);
    
    if (response.results.length === 0) {
        return res.status(404).send(null);
      }
          // Verificar se o histórico já contém a série (evitar duplicatas)
    const existingHistory = await User.findOne({
      _id: req.user._id, // Aqui vou buscar o usuário no banco de dados primeiro ,para não muda de outro usuário.

      // Depois disso , vou verificar se o histórico já contém a série (evitar duplicatas)
      "searchHistory.id": response.results[0].id,// verificar se o histórico já contém a série (evitar duplicatas) ""searchHistory.id" é chave que esta na mongodb
      // "response.results[0].id" é o id da série que está sendo buscado
    });

    if (existingHistory) {
      return res.json({ success: true, content: response.results });
    }
    // Se não existir, adicionar ao histórico
      await User.findByIdAndUpdate(req.user._id, {
        $push: {
          searchHistory: {
            id: response.results[0].id,
            image: response.results[0].poster_path,
            title: response.results[0].title,
            searchType: "movie",
            createdAt: new Date(),
  
          },
        },
      });
       res.status(200).json({ sucess: true, content: response.results });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ sucess: false, message: "Internal Server Error", error });
  }
};

// Buscar programas de TV por nome
export const searchTv = async (req, res) => {
  const { query } = req.params;
  try {
    const response = await fetchFromTmdb(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=pt-BR&page=1`);

    if (response.results.length === 0) {
        return res.status(404).send(null);
      }
       // Verificar se o histórico já contém a série (evitar duplicatas)
    const existingHistory = await User.findOne({
      _id: req.user._id,// para buscar usuário no banco de dados
      "searchHistory.id": response.results[0].id,// verificar se o histórico já contém a série (evitar duplicatas) ""searchHistory.id" é chave que esta na mongodb
      // "response.results[0].id" é o id da série que está sendo buscado
    });

    if (existingHistory) {
      return res.json({ success: true, content: response.results });
    }

    // Se não existir, adicionar ao histórico
      await User.findByIdAndUpdate(req.user._id, {
        $push: {
          searchHistory: {
            id: response.results[0].id,
            image: response.results[0].poster_path,
            title: response.results[0].name,
            searchType: "tv",
            createdAt: new Date(),
  
          },
        },
      });
      res.status(200).json({ sucess: true, content: response.results });


  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ sucess: false, message: "Internal Server Error", error });

  }
};

// Mostrar todos os filmes que foi buscado pelo usuário
export const getSearchHistory = async (req, res) => {
    try {
        //dentro middleware esta dados do usuario ,que será passado via "res" todos os dados do usuario para searchHistory ,então posso acessar todos os dados do usuario 

        res.status(200).json({ sucess: true, content: req.user.searchHistory });
    } catch (error) {
        res.status(500).json({ sucess: false, message: "Internal Server Error", error });
        
    }
}

// Excluir do banco de dado o filme que foi buscado pelo usuário por id
export const removeItemFromSearchHistory = async (req, res) => {

    //$pull  é um operador que  remover um item no array no mongoBD
    const id = Number(req.params.id);

    // Primeiro vou buscar o usuário no banco de dado
    /// Depois eu vou $pull remover item do array "searchHistory" passando o id do filme que foi buscado pelo usuário
    try {
        await User.findByIdAndUpdate(req.user._id,{
            $pull: {
                searchHistory: {
                    id,
                }
            }

        }) 

        res.status(200).json({success: true, message: "Item removed from search history"})
        
    } catch (error) {
        res.status(500).json({success: false, message: "Internal Server Error", error})
        
    }

}
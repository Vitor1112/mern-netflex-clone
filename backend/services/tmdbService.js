import { ENV_VARS } from "../config/envVars.js";
import axios from "axios";


export const fetchFromTmdb = async (url) => {
    const options = {/// removi get para post  pq estou passando ele no axios
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer '+ ENV_VARS.TMDB_API_KEY
        }
      };
    const response = await axios.get(url, options)
    if(response.status !== 200){
        throw new Error("failed to access TMDB API"+ response.statusText)
     }
    return response.data

}









/*  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer '+ ENV_VARS.TMDB_API_KEY
    }
  };
  
  fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.error(err));

 */
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Navebar from '../../components/Navebar';
import { SMALL_IMG_BASE_URL } from '../../../utils/constants';
import { formatDate } from '../../../utils/formatData';
import { Trash } from 'lucide-react';
import toast from 'react-hot-toast';

const SearchHistoryPage = () => {
  const [searchHistory, setSearchHistory] = useState([])

  const searchTypeMap = {
    movie: "Filme",
    tv: "Tv",
    person: "Pessoa"
  }

  useEffect(() => {
    const getSearchHistory = async () => {
      try {
        const res = await axios.get(`/api/v1/search/history`);
        setSearchHistory(res.data.content);
      } catch (error) {
        setSearchHistory([]);
      }
    };
    getSearchHistory();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/v1/search/history/${id}`);
      setSearchHistory(searchHistory.filter((item) => item.id !== id));
    } catch (error) {
      toast.error("Ocorreu um erro. Por favor, tente novamente mais tarde.");
    }
  }

  if (searchHistory?.length === 0) {
    return (
      <div className='bg-black min-h-screen text-white'>
        <Navebar />
        <div className='max-w-6xl mx-auto px-4 py-8'>
          <h1 className='text-3xl font-bold mb-8'>Histórico de buscas</h1>
          <div className='flex justify-center items-center h-96'>
            <p className='text-xl'>Nenhum histórico de busca encontrado</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-black text-white min-h-screen'>
      <Navebar />
      <div className='max-w-6xl mx-auto px-4 py-8'>
        <h1 className='text-3xl font-bold mb-8'>Histórico de buscas</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {searchHistory?.map((entry) => (
            <div key={entry.id} className='bg-gray-800 p-4 rounded flex items-start w-full'>
              <img src={SMALL_IMG_BASE_URL + entry.image} alt='History image' className='size-16 rounded-full object-cover mr-4' />
              <div className='flex flex-col'>
                <span className='text-white text-lg'>{entry.title}</span>
                <span className='text-gray-400 text-sm'>{formatDate(entry.createdAt)}</span>
              </div>
              <span className={`py-1 px-3 min-w-20 text-center rounded-full text-sm ml-auto ${entry.searchType === "movie" ? "bg-red-600" : entry.searchType === "tv" ? "bg-blue-600" : "bg-green-600"}`}>
                {searchTypeMap[entry.searchType] || entry.searchType[0].toUpperCase() + entry.searchType.slice(1)}
              </span>
              <Trash className='size-5 ml-4 cursor-pointer hover:fill-red-600 hover:text-red-600' onClick={() => handleDelete(entry.id)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SearchHistoryPage
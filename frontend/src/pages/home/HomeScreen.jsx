import React, { useState } from 'react'
import Navebar from '../../components/Navebar'
import { Link } from 'react-router-dom'
import { Info, Play } from 'lucide-react'
import useGetTrendingContent from '../../hooks/useGetTrendingContent'
import { MOVIE_CATEGORIES, ORIGINAL_IMG_BASE_URL, TV_CATEGORIES } from '../../../utils/constants'
import { useContentStore } from '../../store/context'
import MovieSlider from '../../components/MovieSlider'

const HomeScreen = () => {
  const { trendingContent } = useGetTrendingContent()
  const {contentType} = useContentStore()
  const [imgLoading, setImgLoading] = useState(true)


  // Se não houver conteúdo, vai mostrar tela de  loader com spiner  de carregamento
  if (!trendingContent) return (
  <div className='relative h-screen text-white'>
    <Navebar />
     <div className='absolute top-0 left-0 w-full h-full bg-black/70  flex items-center justify-center -z-10 shimmer'/>
  </div>
  
)
  return (
    <>
    <div className='relative h-screen text-white'>
      <Navebar />
      {/* looding para enquando a imagem carregar || assim que imagem carregar vai desligar a animação */}
				{imgLoading && (
					<div className='absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center shimmer -z-10' />
				)}

      <img src={ORIGINAL_IMG_BASE_URL + trendingContent?.backdrop_path} alt="extraction" className="absolute top-0 left-0 w-full h-full object-cover -z-50" onLoad={() => {	setImgLoading(false);}} />
      {/* "onLoad "fica monitorando a imagem carregou , sim ele vai ser torna false*
      //OnLoad ,Ele serve para "notificar" o momento exato em que o conteúdo foi carregado e está pronto para ser usado ou exibido
      /}

      {/* Div a baixo ficar por cima da foto de fundo dando background-color: rgba(0, 0, 0, 0.5); */}
      <div className='absolute top-0 left-0 w-full h-full bg-black/50 -z-50 'aria-hidden="true" />

      {/* main que vai conter o conteúdo*/}
      <main className='absolute top-0 left-0 w-full h-full flex flex-col  justify-center px-8 md:px-16 lg:px-32'>
        {/*Vai fica tão escuro vindo por cima da foto de fundo */}
        <div className='bg-gradient-to-b from-black via-transparent to-transparent absolute w-full h-full top-0 left-0 -z-10'/>
        {/* Título e parágrafo */}
        <div className='max-w-2xl'>
           <h1 className='mt-4 text-6xl font-extrabold text-balance'>{trendingContent?.title ||trendingContent?.name}</h1>
           <p className='mt-2 text-lg'>
              {/* 2025/13/03 vai pega a primeira posição 2025 */} 
                {trendingContent?.release_date?.split("-")[0] || trendingContent?.first_air_date.split("-")[0]} {" "} | {trendingContent?.adult ? "18+" :<span className='text-green-600'>Livre</span>}
           </p>
           <p className='mt-4 text-lg'>
           {trendingContent?.overview.length > 200
								? trendingContent?.overview.slice(0, 200) +  "..."
								: trendingContent?.overview}
           </p>
        </div>
         {/* Botão de assistir */}
        <div className='flex mt-8 '>
              <Link to={`/assistir/${trendingContent?.id}`} className='bg-white hover:bg-white/80 text-black font-bold py-2 px-4 rounded mr-4 flex items-center'>
               <Play className="size-6  mr-2 fill-black" />
               Assistir
              </Link>
              <Link to={`/assistir/${trendingContent?.id}`} className='bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded flex items-center'>
               < Info className="size-6  mr-2" />
               Mais Informações
              </Link>
        </div>
      </main>
      </div>
      {/* Proxima seção */}
      <div className=' flex flex-col gap-10 bg-black py-10'>
       {contentType === "movie" ?(MOVIE_CATEGORIES.map((category)=><MovieSlider key={category} category={category} />)):(TV_CATEGORIES.map((category)=><MovieSlider key={category} category={category} />))}
      </div>
      
    </>
  )
}

export default HomeScreen
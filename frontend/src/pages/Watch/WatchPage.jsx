import { useEffect, useRef, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useContentStore } from "../../store/context"
import axios from "axios"
import Navebar from "../../components/Navebar"
import { ChevronLeft, ChevronRight } from "lucide-react"
import ReactPlayer from 'react-player/youtube'
import { formatReleaseDate } from "../../../utils/dateFunction"
import { ORIGINAL_IMG_BASE_URL } from "../../../utils/constants"
import WatchPageSkeleton from "../../components/skeletons/WatchPageSkeleton"



const WatchPage = () => {
    
   const {id}= useParams()

   const [trailers, setTrailers] = useState([])
   const [currentTrailerIdx, setCurrentTrailerIdx] = useState(0); // Para mostra o indice que esta o trailer
   const [loading, setLoading] = useState(true);
   const [content, setContent] = useState({});// Detalhes do filme ou série
   const [similarContent, setSimilarContent] = useState([]);// contéudo similar
   const sliderRef = useRef(null);
   
   const { contentType } = useContentStore();

/// Pora exibir os trailers
   useEffect(() =>{
       const getTrailer = async () => {
           try {
               const response = await axios.get(`/api/v1/${contentType}/trailers/${id}`);
               setTrailers(response.data.trailers);

            
        } catch (error) {
          
            if (error.message.includes("404")) {
                setTrailers([]);
            }
        }

    }
    getTrailer();
   },[contentType,id] )

   // Pora exibir conteudo similares a filme ou série
   useEffect(() =>{
    const getSimilarContent = async () => {
        try {
            const response = await axios.get(`/api/v1/${contentType}/similar/${id}`);
            setSimilarContent(response.data.similar);

         
     } catch (error) {
       
         if (error.message.includes("404")) {
             setSimilarContent([]);
         }
     }

 }
 getSimilarContent ();
},[contentType,id] )

  // Pora exibir detalhe do filme ou série 
  useEffect(() =>{
    const getContentDetails = async () => {
        try {
            const response = await axios.get(`/api/v1/${contentType}/details/${id}`);
            setContent(response.data.content);

         
     } catch (error) {
       
         if (error.message.includes("404")) {
             setContent(null);
         }
     }finally{
       setLoading(false);
     }

 }
 getContentDetails ();
},[contentType,id] )

// função para passar para o próximo trailer
// o indice é possição  de cada trailer
const handleNext = () => {
    if(currentTrailerIdx < trailers.length - 1){
        setCurrentTrailerIdx(currentTrailerIdx + 1)
    }

}
//função para passar para o trailer anterior
const handlePrev = () => {
    if(currentTrailerIdx > 0){
        setCurrentTrailerIdx(currentTrailerIdx - 1)
    }

}

  // vai rolar para a esquerda
  const scrollToLeft = () => {
    if(sliderRef.current){
      sliderRef.current.scrollBy({left:-sliderRef.current.offsetWidth,behavior:"smooth"});
      
    }
       
  }
  // vai rolar para direta
  const scrollToRight = () => {
    sliderRef.current.scrollBy({left:sliderRef.current.offsetWidth,behavior:"smooth"});
    
  }
if(loading) return(
    <div className="min-h-screen bg-black p-10">
        <WatchPageSkeleton/>
    </div>
)
// Verifica se não existe conteúdo ,se não existir retorna uma mensagem abaixo
if (!content) {
	return (
		<div className='bg-black text-white h-screen'>
			<div className='max-w-6xl mx-auto'>
				{/* Componente de Navegação */}
				<Navebar/>
				<div className='text-center mx-auto px-4 py-8 h-full mt-40'>
					{/* Exibe a mensagem de erro quando o conteúdo não é encontrado */}
					<h2 className='text-2xl sm:text-5xl font-bold text-balance'>
						Conteúdo não encontrado 😥
					</h2>
				</div>
			</div>
		</div>
	);
}


  return (
    <div className="bg-black min-h-screen text-white">
      <div className=" mx-auto container px-4 py-8 h-full">
        <Navebar />
        {trailers.length > 0 && (
            <div className=" flex justify-between items-center mb-4">
                {/* se tiver btn na indice 0 vai mostrar opacidade 50 e vai desabilitar o btn*/}
                <button className={`bg-gray-500/70 text-white py-2 px-4 rounded 
                    ${currentTrailerIdx === 0 ? "opacity-50 cursor-not-allowed" :"" }`}
                    disabled={currentTrailerIdx === 0} >
                    <ChevronLeft size={24} onClick={handlePrev}/>
                </button>
                <button className={`bg-gray-500/70 text-white py-2 px-4 rounded 
                    ${currentTrailerIdx === trailers.length - 1 ? "opacity-50 cursor-not-allowed" :"" }`}
                    disabled={currentTrailerIdx === trailers.length - 1} >
                    <ChevronRight size={24} onClick={handleNext}/>
                </button>

            </div>
            
        )}
        <div className="aspect-video mb-8 p-2 sm:px-10 md:px-32">
            {/* key vem do trailer com numero de id do trailer*/}
           {trailers.length > 0 &&(
            <ReactPlayer controls={true} width={"100%"} height={"70vh"}
            className="mx-auto overflow-hidden rounded-lg "
            url={`https://www.youtube.com/watch?v=${trailers[currentTrailerIdx].key}`} />
           ) }
           {trailers?.length === 0 && (
             <h2 className='text-xl text-center mt-5'>
                 Não há trailers disponíveis para{" "}
          <span className='font-bold text-red-600'>{content?.title || content?.name}</span> 😥
             </h2>
            )}
        </div>
        {/*  Detalhes do filme ou série */}
        <div className="flex flex-col md:flex-row items-center justify-between  gap-20 max-w-6xl mx-auto">
            <div className=" mb-4 md:mb-0 ">
            <h2 className='text-5xl font-bold text-balance'>{content?.title || content?.name}</h2>
             <p className='mt-2 text-lg'>{
                formatReleaseDate(content?.release_date || content?.first_air_date)} |{" "}
                {content?.adult ? (
                    <span className='text-red-600'>18+</span>
                ) : (
                    <span className='text-green-600'>Livre</span>
                )}{" "}
                </p>
                <p>{content?.overview}</p>
            </div>
            <img src={ORIGINAL_IMG_BASE_URL + content?.poster_path} alt="imagem" className='max-h-[600px] rounded-md' />

        </div>
       {similarContent.length > 0 && (
        <div className="mt-12 max-w-5xl mx-auto relative">
            <h3 className='text-3xl font-bold mb-4'>Filmes/Séries Recomendados</h3>
            <div className="flex overflow-x-scroll scrollbar-hide gap-4 pb-4 group " ref={sliderRef}>
                {similarContent.map((content)=>{
                    if (!content.poster_path) return null; // Se não tiver imagem, não renderiza o item
                    return(
                    <Link key={content.id} to={`/assistir/${content.id}`} className="w-52 flex-none" >
                        <img src={ORIGINAL_IMG_BASE_URL + content.poster_path} alt="imagem" 
                        className="w-full h-auto rounded-md"/>
                        <h4 className="mt-2 text-lg font-semibold">{content.title || content.name}</h4>
                    </Link>
                    ) })}
               <ChevronLeft className="absolute top-1/2 -translate-y-1/2 left-2 w-8 h-8
               opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-red-600 text-white rounded-full" onClick={scrollToLeft}/>
               <ChevronRight className="absolute top-1/2 -translate-y-1/2 right-2 w-8 h-8
               opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-red-600 text-white rounded-full"onClick={scrollToRight}/>

            </div>
        </div>
       )} 
      </div>
    </div>
  )
}

export default WatchPage




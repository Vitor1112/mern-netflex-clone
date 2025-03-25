import { useEffect, useRef, useState } from "react";
import { useContentStore } from "../store/context";
import axios from "axios";
import { Link } from "react-router-dom";
import { SMALL_IMG_BASE_URL } from "../../utils/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";
 
const CATEGORY_TRANSLATIONS = {
  now_playing: "Em Cartaz",
  top_rated: "Mais Votados",
  popular: "Populares",
  upcoming: "Em Breve",
  airing_today: "Transmitindo Hoje",
  on_the_air: "No Ar",
};

const MovieSlider = ({ category }) => {

  const { contentType } = useContentStore(); // contém o tipo de conteúdo
  const [content, setContent] = useState([]); // contém o conteúdo
  const [showArrow, setShowArrow] = useState(false); // se vai mostrar ou não a seta

  // Obtém o nome traduzido ou usa o original caso não esteja no dicionário
  const translatedCategoryName = CATEGORY_TRANSLATIONS[category] || category.replaceAll("_", " ");
  const formattedContentType = contentType === "movie" ? "Filmes" : "Séries de TV"; // Formatar o tipo de conteúdo

  const sliderRef = useRef(null);

  useEffect(() => {
    const getContent = async () => {
      const response = await axios.get(`/api/v1/${contentType}/${category}`);
      setContent(response.data.content);
     /*  console.log(response.data.content); */
    };
    getContent();
  }, [contentType, category]);

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
  return (
    <div className="bg-black text-white relative px-5 md:px-20 "
     onMouseEnter={() => setShowArrow(true)}
     onMouseLeave={() => setShowArrow(false)}
    >
      <h2 className="mb-4 text-2xl font-bold">{`${translatedCategoryName}  ${formattedContentType}`}</h2>
     {/*  //"scrollbar-hide " é class que tenho que coloca esconde barra do scroll da minha pagina */}
     {/* overflow-x-scroll  é para ativa barra de rolagem */}
      <div className="flex space-x-4 overflow-x-scroll scrollbar-hide" ref={sliderRef}>{/*  overflow-x-scroll para ativa barra de rolagem para lado esquerdo passa os filmes*/}
        {content.map((item) => {
          if (!item.backdrop_path) return null; // Se não tiver imagem, não renderiza o null
          return (
            <Link to={`/assistir/${item.id}`} key={item.id} className="min-w-[250px] relative group">
              <div className="rounded-lg overflow-hidden">
                <img
                  src={SMALL_IMG_BASE_URL + item.backdrop_path}
                  alt="imagem do filme"
                  className=" transition-transform duration-300 ease-in-out group-hover:scale-125"
                />
              </div>
              <p className="mt-2 text-center">{item.title || item.name}</p>
            </Link>
          );
        })}
      </div>
      {/*  se  for "true" vai mostrar ou não a seta*/}
      {showArrow && (
        <>
        <button className="absolute top-1/2 -translate-y-1/2 left-5 md:left-24 flex items-center justify-center size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10"
        onClick={scrollToLeft}>
        <ChevronLeft className="size-5 cursor-pointer"/>
        </button>
        <button className="absolute top-1/2 -translate-y-1/2 right-5 md:right-24 flex items-center justify-center size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10"
        onClick={scrollToRight}>
        <ChevronRight className="size-5 cursor-pointer"/>
        </button>
        
        </>
      )}
    </div>
  );
};

export default MovieSlider;

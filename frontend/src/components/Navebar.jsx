import { useState } from "react";
import { Link } from "react-router-dom";
import { LogOut, Menu, Search } from "lucide-react";
import { useAuthStore } from "../store/authUser";
import { useContentStore } from "../store/context";


const Navebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // quando eu logar a user vai ter um objeto com valores
  const { user,logout } = useAuthStore();
  const{setContentType} = useContentStore();



  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20">
      {/* z-50 vai permitir fica por cima da foto de fundo */}
      <div className="flex items-center gap-10 z-50">
        <Link to="/">
          <img src="/netflix-logo.png" alt="netflix logo" className="w-32 sm:w-40" />
        </Link>
        {/* Desktop navbar items */}
        {/* A partir de 640px  para cima será mostrado meu menu */}
        <div className="hidden sm:flex gap-2 items-center">
          <Link to="/" className="hover:underline" onClick={()=>setContentType("movie")}>Filmes</Link>
          <Link to="/" className="hover:underline"onClick={()=>setContentType("tv")}>Séries de TV</Link>
          <Link to="/history" className="hover:underline">Histórico de pesquisa</Link>
        </div>
      </div>
      <div className="flex gap-2 items-center  z-50">
        <Link to={'/search'}><Search className="size-6 cursor-pointer" /></Link>
        <img src={user.image} alt="Avatar" className="h-8 rounded cursor-pointer" />
        <LogOut className="size-6 cursor-pointer" onClick={logout} />
         {/* sm:hidden  A partir de 640px  para cima será ocultado o menu hambúrguer */}
        <div className="sm:hidden">
          <Menu className="size-6 cursor-pointer" onClick={toggleMobileMenu} />
        </div>

      </div>
      {/* Mobile navbar items */}

      {isMobileMenuOpen && (
        <div className="w-full sm:hidden mt-4 z-50 bg-black border rounded border-gray-800 text-white">
          <Link to="/" className="block hover:underline p-2" onClick={toggleMobileMenu}>
            Filmes
          </Link>
          <Link to="/" className="block hover:underline p-2" onClick={toggleMobileMenu}>
            Séries de TV
          </Link>
          <Link to="/history" className="block hover:underline p-2" onClick={toggleMobileMenu}>
            Histórico de pesquisa
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navebar;

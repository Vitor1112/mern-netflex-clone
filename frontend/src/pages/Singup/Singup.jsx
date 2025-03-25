import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { useAuthStore } from '../../store/authUser'
import { toast } from 'react-hot-toast'


const Singup = () => {
  /* Resumo:
window.location.href: Obtém a URL completa da página.
new URL(window.location.href): Cria um objeto URL com base na URL da página.
searchParams: Obtém os parâmetros de consulta da URL é uma formar dele destruturado 
searchParams.get("email"): Extrai o valor do parâmetro de consulta email da URL (se existir). */

  const {searchParams} = new URL(window.location.href);
  const emailParam = searchParams.get("email");

  /// Pegar valores passa pelo User
  const [email, setEmail] = useState(emailParam ||"");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

  // Hook 
  const { signup,isSigningUp } = useAuthStore()



  const handleSingup = (e)=>{
    e.preventDefault();

    if (!email) {
      return toast.error("E-mail é obrigatório");
    }

    if (!username) {
      return toast.error("O nome de usuário é obrigatório");
    }
  
    if (password.length < 6) {
      return toast.error("A senha deve ter pelo menos 6 caracteres");
    }
  
    signup({ username, email, password });
 
  } 

  return (
    <div className="h-screen w-full hero-bg">{/* hero-bg é foto de fundo */}
      {/* Header */}
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link to={"/"}>
          <img src="/netflix-logo.png" alt="netflix logo" className="w-52" />
        </Link>
      </header>

      <div className="flex justify-center items-center mt-20 mx-3">
        <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md">
          <h1 className="text-center font-bold text-white text-2xl">
            Cadastra-se
          </h1>
          <form onSubmit={handleSingup} className="space-y-4">
            <div>
              <Input
                label="Email"
                id="email"
                type="text"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Input
                label="Nome"
                id="username"
                type="username"
                placeholder="Digite seu nome"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                
              />
            </div>
            <div>
              <Input
                label="Senha"
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button disabled={isSigningUp}>{isSigningUp ? "Loading..." : "Cadastrar"}</Button>
          </form>
          <div className="text-center text-gray-400">
            Já possui uma conta?{" "}
            <Link to={"/login"} className="text-red-500 hover:underline">
              Entrar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Singup

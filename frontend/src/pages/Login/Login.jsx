import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { useAuthStore } from '../../store/authUser'
import toast from 'react-hot-toast'



const Login = () => {
  const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
  const {login,isSigningUp}= useAuthStore()

  const handleLogin= (e)=>{
    e.preventDefault();
    if (!email) {
      return toast.error("E-mail é obrigatório");
    }
  
    if (password.length < 6) {
      return toast.error("A senha deve ter pelo menos 6 caracteres");
    }
  
    login({email,password});

  } 

  return (
    <div className="h-screen w-full hero-bg">
      {/* Header */}
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link to={"/"}>
          <img src="/netflix-logo.png" alt="netflix logo" className="w-52" />
        </Link>
      </header>

      <div className="flex justify-center items-center mt-20 mx-3">
        <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md">
          <h1 className="text-center font-bold text-white text-2xl">
            Login
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
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
                label="Senha"
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button disabled={isSigningUp}>{isSigningUp ? "Loading..." : "Entrar"}</Button>
          </form>
          <div className="text-center text-gray-400">
            Não tem uma conta?{" "}
            <Link to={"/cadastro"} className="text-red-500 hover:underline">
              Cadastra-se
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

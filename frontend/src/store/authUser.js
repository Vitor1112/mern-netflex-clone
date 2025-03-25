import axios from "axios";
import { create } from "zustand";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  // O estado global de mudança, onde  será recebido as mudanças, podendo compartilhar com outros componentes
  user: null,
  isSigningUp: false,
  isCheckingAuth: true,
  isLoggingOut: false,
  isLoggingIn: false,
  //
  signup: async (credentials) => {
    set({ isSigningUp: true });
    try {
      const response = await axios.post("/api/v1/auth/signup", credentials);
      set({ user: response.data.user, isSigningUp: false });
      toast.success('Conta criada com sucesso!');
    } catch (error) {
      // Verificar a mensagem de erro
      const errorMessage = error.response?.data?.message || 'Erro ao tentar cadastrar';
      
      // Personalizando a mensagem para português
      if (errorMessage === "E-mail already exist") {
        toast.error("E-mail já existe");
      } else if (errorMessage === "user already exist") {
        toast.error("Nome de usuário já existe");
      } else {
        toast.error(errorMessage);
      }
      
      set({ isSigningUp: false, user: null });
    }
  },
  
  login: async (credentials) => {
    set({ isLoggingIn: true });
    try {
      const response = await axios.post("/api/v1/auth/login", credentials);
      set({ user: response.data.user, isLoggingIn: false });
      toast.success("Logado com sucesso");
  
    } catch (error) {
      set({ isLoggingIn: false, user: null });
      const errorMessage = error.response?.data?.message || 'Login failed';
  
      // Verifica se a mensagem de erro corresponde a uma das mensagens específicas
      if (errorMessage === "invalid credentials" || errorMessage === "Invalid email or password") {
        toast.error("E-mail ou senha inválidos");
      } else {
        toast.error(errorMessage); // Exibe qualquer outra mensagem de erro
      }
    }
  },
  
  // Função de sair 
  logout: async () => {
    
    set({isLoggingOut:true})
    try {
      await axios.post("/api/v1/auth/logout");
      set({ user: null, isLoggingOut: false });
      toast.success("Desconectado com sucesso");
      
    } catch (error) {
      set({isLoggingOut:false})
      toast.error(error.response.data.message || "Logout failed");
    }

  },

  //Depois  de criar essa função, você terá chama ela no componente de App.jsx
  authCheck: async () => {
    set({ isCheckingAuth: true });
    try {
        const response = await axios.get("/api/v1/auth/authCheck");
        set({ user: response.data.user, isCheckingAuth: false });
    } catch (error) {
        // Verificar a mensagem de erro
        set({ isCheckingAuth: false, user: null });
    }
  },
}));

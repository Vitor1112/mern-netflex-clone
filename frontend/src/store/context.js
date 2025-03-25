import { create } from "zustand";
// Criar um contexto para armazenar o estado do conteúdo
// função  vai ser passada valores para o estado
export const useContentStore = create((set) => ({
    contentType: "movie",
    setContentType: (type) => set({ contentType: type }),
}));
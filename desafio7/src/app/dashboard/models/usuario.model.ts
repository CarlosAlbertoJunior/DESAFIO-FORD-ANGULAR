export interface Usuario {
  id: number;
  nome: string;
  senha?: string; // Senha é opcional aqui, pois não deve ser exposta do backend
  // Outros campos relevantes
}
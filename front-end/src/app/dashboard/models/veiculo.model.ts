// src/app/dashboard/models/veiculo.model.ts
export interface Veiculo {
  codigo: number | string;
  modelo: string;
  totalVendas: number;
  conectados: number;
  softwareAtualizado: number;
  imagem: string;
  ano?: number;
  cor?: string;
  preco?: number;
}

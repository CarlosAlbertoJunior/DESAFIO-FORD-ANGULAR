// src/app/dashboard/models/veiculo.model.ts
export interface Veiculo {
long: any;
lat: any;
status: any;
nivelCombustivel: any;
odometro: any;
  vin: any;
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

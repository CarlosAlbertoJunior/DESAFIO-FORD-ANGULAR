export interface Veiculos extends Array<Veiculo> { }

export interface Veiculo {
  imagem: any
  softwareAtualizado: number
  conectados: number
  totalVendas: number
  preco: string | number
  cor: any
  ano: any
  modelo: any
  codigo: any
  id: number | string
  vehicle: string
  volumetotal: number | string
  connected: number | string
  softwareUpdates: number | string
  img: string;
}

export interface VeiculosAPI {
  vehicles: Veiculos;
}

export interface Veiculo {
  codigo: any;
  nome: any;
  id: string; // Ex: '2FRHDUYS2Y63NHD22454' [cite: 80]
  modelo: string; // Ex: 'Ford Ranger' [cite: 73]
  ano: number;
  cor: string;
  preco: number;
  totalVendas?: number; // Para os cards de dados globais ou do modelo
  conectados?: number;
  softwareAtualizado?: number;
  imagem?: string; // Caminho da imagem (ex: 'assets/ranger.png')
  // ... outros campos que sua API possa fornecer
}

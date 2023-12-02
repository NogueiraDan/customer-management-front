export interface Schedule {
  cliente: {
    endereco: string;
    id: number;
    idade: number;
    nome: string;
    telefone: string;
  };
  data: string;
  id: number;
  hora: string;
  tipo: string;
}

export interface Customer {
  endereco: string;
  id: number;
  idade: number;
  nome: string;
  telefone: string;
}

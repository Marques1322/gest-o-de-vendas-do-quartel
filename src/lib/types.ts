// Domain types — mirror future database tables (militares, produtos, vendas, itens_venda, pagamentos).
export type FormaPagamento = "dinheiro" | "pix" | "cartao" | "fiado";
export type StatusVenda = "pago" | "pendente" | "parcial";

export interface Militar {
  id: string;
  nome: string;
  posto: string;
  companhia: string;
  telefone?: string;
  saldoDevedor: number;
}

export interface Produto {
  id: string;
  nome: string;
  categoria: "Salgados" | "Baguetes" | "Bebidas";
  precoVenda: number;
  custo: number;
  estoque: number;
  estoqueMinimo: number;
}

export interface ItemVenda {
  produtoId: string;
  quantidade: number;
  precoUnitario: number;
}

export interface Venda {
  id: string;
  data: string; // ISO
  militarId: string;
  itens: ItemVenda[];
  total: number;
  formaPagamento: FormaPagamento;
  status: StatusVenda;
}

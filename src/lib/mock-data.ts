// Demo data. Replace these exports with Lovable Cloud queries when the backend is connected.
import type { Militar, Produto, Venda } from "./types";

export const POSTOS = [
  "Soldado", "Cabo", "3º Sargento", "2º Sargento", "1º Sargento",
  "Subtenente", "Aspirante", "2º Tenente", "1º Tenente", "Capitão", "Major",
];
export const COMPANHIAS = ["1ª Cia", "2ª Cia", "3ª Cia", "CCSv", "Cia Cmdo"];

export const militares: Militar[] = [
  { id: "m1", nome: "Silva", posto: "Soldado", companhia: "1ª Cia", telefone: "(92) 99111-2233", saldoDevedor: 42.5 },
  { id: "m2", nome: "Oliveira", posto: "Cabo", companhia: "2ª Cia", telefone: "(92) 99222-3344", saldoDevedor: 0 },
  { id: "m3", nome: "Santos", posto: "3º Sargento", companhia: "CCSv", saldoDevedor: 78 },
  { id: "m4", nome: "Pereira", posto: "Soldado", companhia: "3ª Cia", saldoDevedor: 15 },
  { id: "m5", nome: "Costa", posto: "1º Tenente", companhia: "Cia Cmdo", saldoDevedor: 0 },
  { id: "m6", nome: "Almeida", posto: "Cabo", companhia: "1ª Cia", saldoDevedor: 31 },
  { id: "m7", nome: "Ferreira", posto: "2º Sargento", companhia: "2ª Cia", saldoDevedor: 0 },
  { id: "m8", nome: "Rodrigues", posto: "Soldado", companhia: "CCSv", saldoDevedor: 56.5 },
];

export const produtos: Produto[] = [
  { id: "p1", nome: "Coxinha de frango", categoria: "Salgados", precoVenda: 6, custo: 2.4, estoque: 34, estoqueMinimo: 15 },
  { id: "p2", nome: "Pastel de carne", categoria: "Salgados", precoVenda: 7, custo: 2.8, estoque: 8, estoqueMinimo: 12 },
  { id: "p3", nome: "Enroladinho de salsicha", categoria: "Salgados", precoVenda: 5, custo: 1.9, estoque: 22, estoqueMinimo: 10 },
  { id: "p4", nome: "Baguete de presunto e queijo", categoria: "Baguetes", precoVenda: 12, custo: 5.2, estoque: 14, estoqueMinimo: 8 },
  { id: "p5", nome: "Baguete de frango", categoria: "Baguetes", precoVenda: 13, custo: 5.8, estoque: 4, estoqueMinimo: 8 },
  { id: "p6", nome: "Coca-Cola lata 350ml", categoria: "Bebidas", precoVenda: 5, custo: 2.9, estoque: 48, estoqueMinimo: 24 },
  { id: "p7", nome: "Guaraná lata 350ml", categoria: "Bebidas", precoVenda: 5, custo: 2.6, estoque: 18, estoqueMinimo: 24 },
  { id: "p8", nome: "Água mineral 500ml", categoria: "Bebidas", precoVenda: 3, custo: 1, estoque: 40, estoqueMinimo: 20 },
];

const today = new Date();
const at = (daysAgo: number, h: number, m: number) => {
  const d = new Date(today);
  d.setDate(d.getDate() - daysAgo);
  d.setHours(h, m, 0, 0);
  return d.toISOString();
};

export const vendas: Venda[] = [
  { id: "V-1042", data: at(0, 9, 12), militarId: "m1", itens: [{ produtoId: "p1", quantidade: 2, precoUnitario: 6 }, { produtoId: "p6", quantidade: 1, precoUnitario: 5 }], total: 17, formaPagamento: "pix", status: "pago" },
  { id: "V-1043", data: at(0, 9, 40), militarId: "m3", itens: [{ produtoId: "p4", quantidade: 1, precoUnitario: 12 }, { produtoId: "p7", quantidade: 1, precoUnitario: 5 }], total: 17, formaPagamento: "fiado", status: "pendente" },
  { id: "V-1044", data: at(0, 10, 5), militarId: "m2", itens: [{ produtoId: "p2", quantidade: 3, precoUnitario: 7 }], total: 21, formaPagamento: "dinheiro", status: "pago" },
  { id: "V-1045", data: at(0, 10, 32), militarId: "m6", itens: [{ produtoId: "p5", quantidade: 1, precoUnitario: 13 }, { produtoId: "p8", quantidade: 1, precoUnitario: 3 }], total: 16, formaPagamento: "fiado", status: "pendente" },
  { id: "V-1046", data: at(0, 11, 50), militarId: "m5", itens: [{ produtoId: "p4", quantidade: 2, precoUnitario: 12 }, { produtoId: "p6", quantidade: 2, precoUnitario: 5 }], total: 34, formaPagamento: "cartao", status: "pago" },
  { id: "V-1047", data: at(0, 12, 15), militarId: "m8", itens: [{ produtoId: "p3", quantidade: 2, precoUnitario: 5 }, { produtoId: "p6", quantidade: 1, precoUnitario: 5 }], total: 15, formaPagamento: "fiado", status: "pendente" },
  { id: "V-1038", data: at(1, 15, 20), militarId: "m4", itens: [{ produtoId: "p1", quantidade: 2, precoUnitario: 6 }], total: 12, formaPagamento: "pix", status: "pago" },
  { id: "V-1036", data: at(1, 10, 2), militarId: "m7", itens: [{ produtoId: "p4", quantidade: 1, precoUnitario: 12 }], total: 12, formaPagamento: "dinheiro", status: "pago" },
  { id: "V-1031", data: at(2, 9, 45), militarId: "m1", itens: [{ produtoId: "p5", quantidade: 2, precoUnitario: 13 }], total: 26, formaPagamento: "fiado", status: "parcial" },
];

export const faturamentoSemana = [
  { dia: "Seg", vendido: 312, recebido: 248 },
  { dia: "Ter", vendido: 285, recebido: 230 },
  { dia: "Qua", vendido: 340, recebido: 298 },
  { dia: "Qui", vendido: 298, recebido: 251 },
  { dia: "Sex", vendido: 410, recebido: 322 },
  { dia: "Sáb", vendido: 168, recebido: 150 },
  { dia: "Hoje", vendido: 120, recebido: 72 },
];

export const vendasPorCategoria = [
  { categoria: "Salgados", valor: 980 },
  { categoria: "Baguetes", valor: 720 },
  { categoria: "Bebidas", valor: 515 },
];

export const getMilitar = (id: string) => militares.find((m) => m.id === id);
export const getProduto = (id: string) => produtos.find((p) => p.id === id);
export const estoqueBaixo = () => produtos.filter((p) => p.estoque <= p.estoqueMinimo);

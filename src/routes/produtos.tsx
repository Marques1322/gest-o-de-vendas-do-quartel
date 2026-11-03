import { createFileRoute } from "@tanstack/react-router";
import { Package, PackageX, Plus, Boxes } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { SectionCard } from "@/components/shared/section-card";
import { StatCard } from "@/components/shared/stat-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { DemoNote } from "@/components/shared/placeholder-note";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { estoqueBaixo, produtos } from "@/lib/mock-data";
import { formatBRL } from "@/lib/format";

export const Route = createFileRoute("/produtos")({
  head: () => ({
    meta: [
      { title: "Produtos e Estoque — Gestão de Vendas" },
      { name: "description", content: "Salgados, baguetes e bebidas com preço, custo e estoque." },
      { property: "og:title", content: "Produtos e Estoque — Gestão de Vendas" },
      { property: "og:description", content: "Salgados, baguetes e bebidas com preço, custo e estoque." },
    ],
  }),
  component: Produtos,
});

function Produtos() {
  const valorEstoque = produtos.reduce((s, p) => s + p.custo * p.estoque, 0);
  return (
    <>
      <PageHeader title="Produtos e Estoque" description="Catálogo e controle de quantidades." actions={<Button><Plus /> Novo produto</Button>} />
      <DemoNote />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Produtos cadastrados" value={String(produtos.length)} icon={Package} />
        <StatCard label="Valor em estoque (custo)" value={formatBRL(valorEstoque)} icon={Boxes} tone="neutral" />
        <StatCard label="Estoque baixo" value={String(estoqueBaixo().length)} icon={PackageX} tone="danger" />
      </div>
      <SectionCard title="Catálogo">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead className="hidden sm:table-cell">Categoria</TableHead>
                <TableHead className="text-right">Custo</TableHead>
                <TableHead className="text-right">Venda</TableHead>
                <TableHead className="hidden text-right md:table-cell">Margem</TableHead>
                <TableHead className="text-right">Estoque</TableHead>
                <TableHead>Situação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {produtos.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.nome}</TableCell>
                  <TableCell className="hidden sm:table-cell">{p.categoria}</TableCell>
                  <TableCell className="tabular text-right text-muted-foreground">{formatBRL(p.custo)}</TableCell>
                  <TableCell className="tabular text-right font-semibold">{formatBRL(p.precoVenda)}</TableCell>
                  <TableCell className="tabular hidden text-right md:table-cell">{Math.round(((p.precoVenda - p.custo) / p.precoVenda) * 100)}%</TableCell>
                  <TableCell className="tabular text-right">{p.estoque}</TableCell>
                  <TableCell><StatusBadge status={p.estoque <= p.estoqueMinimo ? "baixo" : "ok"} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </SectionCard>
    </>
  );
}

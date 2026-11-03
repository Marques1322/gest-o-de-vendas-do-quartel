import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Download, Search } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { SectionCard } from "@/components/shared/section-card";
import { SalesTable } from "@/components/shared/sales-table";
import { DemoNote } from "@/components/shared/placeholder-note";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getMilitar, vendas } from "@/lib/mock-data";

export const Route = createFileRoute("/historico")({
  head: () => ({
    meta: [
      { title: "Histórico de Vendas — Gestão de Vendas" },
      { name: "description", content: "Consulte todas as vendas registradas com filtros." },
      { property: "og:title", content: "Histórico de Vendas — Gestão de Vendas" },
      { property: "og:description", content: "Consulte todas as vendas registradas com filtros." },
    ],
  }),
  component: Historico,
});

function Historico() {
  const [busca, setBusca] = useState("");
  const [pag, setPag] = useState("todos");
  const lista = vendas
    .filter((v) => pag === "todos" || v.formaPagamento === pag)
    .filter((v) => (getMilitar(v.militarId)?.nome ?? "").toLowerCase().includes(busca.toLowerCase()) || v.id.includes(busca.toUpperCase()));

  return (
    <>
      <PageHeader title="Histórico de Vendas" description="Todas as vendas registradas." actions={<Button variant="outline"><Download /> Exportar</Button>} />
      <DemoNote />
      <SectionCard title={`${lista.length} vendas`}>
        <div className="mb-4 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Buscar por militar ou número da venda..." className="pl-9" value={busca} onChange={(e) => setBusca(e.target.value)} />
          </div>
          <Select value={pag} onValueChange={setPag}>
            <SelectTrigger className="sm:w-48"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os pagamentos</SelectItem>
              <SelectItem value="dinheiro">Dinheiro</SelectItem>
              <SelectItem value="pix">Pix</SelectItem>
              <SelectItem value="cartao">Cartão</SelectItem>
              <SelectItem value="fiado">Fiado</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <SalesTable vendas={lista} />
      </SectionCard>
    </>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Minus, Plus, Trash2, Search } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/layout/page-header";
import { SectionCard } from "@/components/shared/section-card";
import { DemoNote } from "@/components/shared/placeholder-note";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { militares, produtos } from "@/lib/mock-data";
import { formatBRL } from "@/lib/format";
import type { FormaPagamento } from "@/lib/types";

export const Route = createFileRoute("/nova-venda")({
  head: () => ({
    meta: [
      { title: "Nova Venda — Gestão de Vendas" },
      { name: "description", content: "Registrar uma venda para um militar, à vista ou fiado." },
      { property: "og:title", content: "Nova Venda — Gestão de Vendas" },
      { property: "og:description", content: "Registrar uma venda para um militar, à vista ou fiado." },
    ],
  }),
  component: NovaVenda,
});

function NovaVenda() {
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("Todos");
  const [carrinho, setCarrinho] = useState<Record<string, number>>({});
  const [militarId, setMilitarId] = useState("");
  const [pagamento, setPagamento] = useState<FormaPagamento>("dinheiro");

  const lista = produtos.filter(
    (p) => (categoria === "Todos" || p.categoria === categoria) && p.nome.toLowerCase().includes(busca.toLowerCase()),
  );
  const itens = Object.entries(carrinho).map(([id, q]) => ({ p: produtos.find((x) => x.id === id)!, q }));
  const total = useMemo(() => itens.reduce((s, i) => s + i.p.precoVenda * i.q, 0), [itens]);

  const alterar = (id: string, d: number) =>
    setCarrinho((c) => {
      const q = (c[id] ?? 0) + d;
      const n = { ...c };
      if (q <= 0) delete n[id];
      else n[id] = q;
      return n;
    });

  const finalizar = () => {
    if (!militarId) { toast.error("Selecione o militar."); return; }
    if (!itens.length) { toast.error("Adicione ao menos um produto."); return; }
    toast.success(`Venda de ${formatBRL(total)} registrada${pagamento === "fiado" ? " como fiado" : ""}.`);
    setCarrinho({});
    setMilitarId("");
  };

  return (
    <>
      <PageHeader title="Nova Venda" description="Selecione os produtos, o militar e a forma de pagamento." />
      <DemoNote />
      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <SectionCard title="Produtos">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Buscar produto..." className="pl-9" value={busca} onChange={(e) => setBusca(e.target.value)} />
            </div>
            <Tabs value={categoria} onValueChange={setCategoria}>
              <TabsList>
                {["Todos", "Salgados", "Baguetes", "Bebidas"].map((c) => <TabsTrigger key={c} value={c}>{c}</TabsTrigger>)}
              </TabsList>
            </Tabs>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {lista.map((p) => (
              <button
                key={p.id}
                onClick={() => alterar(p.id, 1)}
                className="rounded-lg border bg-card p-4 text-left transition-colors hover:border-primary hover:bg-primary-soft"
              >
                <p className="text-xs text-muted-foreground">{p.categoria}</p>
                <p className="mt-1 font-semibold leading-tight">{p.nome}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="tabular font-bold text-primary">{formatBRL(p.precoVenda)}</span>
                  <span className="text-xs text-muted-foreground">{p.estoque} un.</span>
                </div>
              </button>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Resumo da venda" className="h-fit lg:sticky lg:top-20">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Militar</Label>
              <Select value={militarId} onValueChange={setMilitarId}>
                <SelectTrigger className="w-full"><SelectValue placeholder="Selecionar militar" /></SelectTrigger>
                <SelectContent>
                  {militares.map((m) => (
                    <SelectItem key={m.id} value={m.id}>{m.posto} {m.nome} — {m.companhia}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="divide-y rounded-lg border">
              {itens.length === 0 && <p className="p-4 text-center text-sm text-muted-foreground">Nenhum item adicionado.</p>}
              {itens.map(({ p, q }) => (
                <div key={p.id} className="flex items-center gap-2 p-3">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{p.nome}</p>
                    <p className="tabular text-xs text-muted-foreground">{formatBRL(p.precoVenda * q)}</p>
                  </div>
                  <Button size="icon" variant="outline" className="size-7" onClick={() => alterar(p.id, -1)}><Minus /></Button>
                  <span className="tabular w-6 text-center text-sm font-semibold">{q}</span>
                  <Button size="icon" variant="outline" className="size-7" onClick={() => alterar(p.id, 1)}><Plus /></Button>
                  <Button size="icon" variant="ghost" className="size-7 text-muted-foreground" onClick={() => alterar(p.id, -q)}><Trash2 /></Button>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <Label>Forma de pagamento</Label>
              <div className="grid grid-cols-2 gap-2">
                {(["dinheiro", "pix", "cartao", "fiado"] as FormaPagamento[]).map((f) => (
                  <Button key={f} variant={pagamento === f ? "default" : "outline"} onClick={() => setPagamento(f)}>
                    {{ dinheiro: "Dinheiro", pix: "Pix", cartao: "Cartão", fiado: "Fiado" }[f]}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between border-t pt-4">
              <span className="text-muted-foreground">Total</span>
              <span className="tabular text-2xl font-bold">{formatBRL(total)}</span>
            </div>
            <Button size="lg" className="w-full" onClick={finalizar}>Finalizar venda</Button>
          </div>
        </SectionCard>
      </div>
    </>
  );
}

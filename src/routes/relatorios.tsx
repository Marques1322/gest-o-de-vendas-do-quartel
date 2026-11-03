import { createFileRoute } from "@tanstack/react-router";
import { Download, FileText } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { PageHeader } from "@/components/layout/page-header";
import { SectionCard } from "@/components/shared/section-card";
import { DemoNote } from "@/components/shared/placeholder-note";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { produtos } from "@/lib/mock-data";

export const Route = createFileRoute("/relatorios")({
  head: () => ({
    meta: [
      { title: "Relatórios — Gestão de Vendas" },
      { name: "description", content: "Relatórios de vendas, produtos, companhias e fiado." },
      { property: "og:title", content: "Relatórios — Gestão de Vendas" },
      { property: "og:description", content: "Relatórios de vendas, produtos, companhias e fiado." },
    ],
  }),
  component: Relatorios,
});

const maisVendidos = produtos.slice(0, 6).map((p, i) => ({ nome: p.nome.split(" ").slice(0, 2).join(" "), qtd: [142, 96, 88, 74, 61, 120][i] }));
const config = { qtd: { label: "Unidades", color: "var(--chart-1)" } } satisfies ChartConfig;

const relatorios = [
  { t: "Vendas por período", d: "Faturamento diário, semanal e mensal." },
  { t: "Vendas por companhia", d: "Consumo agrupado por companhia." },
  { t: "Produtos mais vendidos", d: "Ranking por quantidade e valor." },
  { t: "Relatório de fiado", d: "Devedores e histórico de pagamentos." },
  { t: "Lucro por produto", d: "Margem e lucro estimado." },
  { t: "Movimento de estoque", d: "Entradas, saídas e perdas." },
];

function Relatorios() {
  return (
    <>
      <PageHeader title="Relatórios" description="Análises para tomar decisões." />
      <DemoNote />
      <SectionCard title="Produtos mais vendidos" description="Últimos 30 dias" className="mb-6">
        <ChartContainer config={config} className="h-72 w-full">
          <BarChart data={maisVendidos} layout="vertical" margin={{ left: 24 }}>
            <CartesianGrid horizontal={false} />
            <XAxis type="number" tickLine={false} axisLine={false} />
            <YAxis dataKey="nome" type="category" tickLine={false} axisLine={false} width={110} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="qtd" fill="var(--color-qtd)" radius={6} />
          </BarChart>
        </ChartContainer>
      </SectionCard>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {relatorios.map((r) => (
          <div key={r.t} className="flex flex-col rounded-xl border bg-card p-5">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary-soft text-primary"><FileText className="size-5" /></div>
            <p className="mt-4 font-semibold">{r.t}</p>
            <p className="mt-1 flex-1 text-sm text-muted-foreground">{r.d}</p>
            <Button variant="outline" size="sm" className="mt-4 w-fit"><Download /> Gerar</Button>
          </div>
        ))}
      </div>
    </>
  );
}

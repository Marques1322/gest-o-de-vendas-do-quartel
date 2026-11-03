import { createFileRoute } from "@tanstack/react-router";
import { ArrowDownCircle, ArrowUpCircle, Plus, Wallet } from "lucide-react";
import { Cell, Pie, PieChart } from "recharts";
import { PageHeader } from "@/components/layout/page-header";
import { SectionCard } from "@/components/shared/section-card";
import { StatCard } from "@/components/shared/stat-card";
import { DemoNote } from "@/components/shared/placeholder-note";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { formatBRL } from "@/lib/format";

export const Route = createFileRoute("/financeiro")({
  head: () => ({
    meta: [
      { title: "Financeiro — Gestão de Vendas" },
      { name: "description", content: "Entradas, saídas e saldo do caixa." },
      { property: "og:title", content: "Financeiro — Gestão de Vendas" },
      { property: "og:description", content: "Entradas, saídas e saldo do caixa." },
    ],
  }),
  component: Financeiro,
});

const formas = [
  { forma: "dinheiro", valor: 640 },
  { forma: "pix", valor: 980 },
  { forma: "cartao", valor: 310 },
];
const config = {
  dinheiro: { label: "Dinheiro", color: "var(--chart-1)" },
  pix: { label: "Pix", color: "var(--chart-2)" },
  cartao: { label: "Cartão", color: "var(--chart-3)" },
} satisfies ChartConfig;

const movimentos = [
  { desc: "Compra de refrigerantes", tipo: "saida", valor: 186, data: "Hoje" },
  { desc: "Recebimento fiado — Cb Almeida", tipo: "entrada", valor: 25, data: "Hoje" },
  { desc: "Ingredientes para salgados", tipo: "saida", valor: 142.3, data: "Ontem" },
  { desc: "Vendas do dia", tipo: "entrada", valor: 298, data: "Ontem" },
];

function Financeiro() {
  return (
    <>
      <PageHeader title="Financeiro" description="Movimento do caixa no mês." actions={<Button><Plus /> Lançar despesa</Button>} />
      <DemoNote />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Entradas do mês" value={formatBRL(1930)} icon={ArrowUpCircle} tone="success" />
        <StatCard label="Saídas do mês" value={formatBRL(1024.6)} icon={ArrowDownCircle} tone="danger" />
        <StatCard label="Saldo" value={formatBRL(905.4)} icon={Wallet} />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Recebido por forma de pagamento">
          <ChartContainer config={config} className="mx-auto h-64 w-full">
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent nameKey="forma" hideLabel />} />
              <Pie data={formas} dataKey="valor" nameKey="forma" innerRadius={55} strokeWidth={4}>
                {formas.map((f) => <Cell key={f.forma} fill={`var(--color-${f.forma})`} />)}
              </Pie>
              <ChartLegend content={<ChartLegendContent nameKey="forma" />} />
            </PieChart>
          </ChartContainer>
        </SectionCard>
        <SectionCard title="Últimos lançamentos">
          <ul className="divide-y">
            {movimentos.map((m, i) => (
              <li key={i} className="flex items-center justify-between gap-3 py-3">
                <div>
                  <p className="text-sm font-medium">{m.desc}</p>
                  <p className="text-xs text-muted-foreground">{m.data}</p>
                </div>
                <span className={`tabular font-semibold ${m.tipo === "entrada" ? "text-success" : "text-destructive"}`}>
                  {m.tipo === "entrada" ? "+" : "−"} {formatBRL(m.valor)}
                </span>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>
    </>
  );
}

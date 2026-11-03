import { createFileRoute, Link } from "@tanstack/react-router";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  DollarSign, CheckCircle2, HandCoins, AlertCircle, TrendingUp, Receipt, PackageX, ArrowRight,
} from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { SectionCard } from "@/components/shared/section-card";
import { SalesTable } from "@/components/shared/sales-table";
import { DemoNote } from "@/components/shared/placeholder-note";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { estoqueBaixo, faturamentoSemana, getProduto, militares, vendas, vendasPorCategoria } from "@/lib/mock-data";
import { formatBRL } from "@/lib/format";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Gestão de Vendas" },
      { name: "description", content: "Resumo do dia: faturamento, recebimentos, fiado e estoque." },
      { property: "og:title", content: "Dashboard — Gestão de Vendas" },
      { property: "og:description", content: "Resumo do dia: faturamento, recebimentos, fiado e estoque." },
    ],
  }),
  component: Dashboard,
});

const semanaConfig = {
  vendido: { label: "Vendido", color: "var(--chart-1)" },
  recebido: { label: "Recebido", color: "var(--chart-3)" },
} satisfies ChartConfig;
const catConfig = { valor: { label: "Valor", color: "var(--chart-2)" } } satisfies ChartConfig;

function Dashboard() {
  const hoje = new Date().toDateString();
  const vendasHoje = vendas.filter((v) => new Date(v.data).toDateString() === hoje);
  const faturamento = vendasHoje.reduce((s, v) => s + v.total, 0);
  const recebido = vendasHoje.filter((v) => v.status === "pago").reduce((s, v) => s + v.total, 0);
  const fiado = vendasHoje.filter((v) => v.formaPagamento === "fiado").reduce((s, v) => s + v.total, 0);
  const dividas = militares.reduce((s, m) => s + m.saldoDevedor, 0);
  const lucro = vendasHoje.reduce(
    (s, v) => s + v.itens.reduce((a, i) => a + (i.precoUnitario - (getProduto(i.produtoId)?.custo ?? 0)) * i.quantidade, 0),
    0,
  );
  const baixo = estoqueBaixo();

  return (
    <>
      <PageHeader title="Dashboard" description="Visão geral das vendas de hoje." />
      <DemoNote />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Faturamento do dia" value={formatBRL(faturamento)} icon={DollarSign} hint="Total vendido hoje" />
        <StatCard label="Total recebido" value={formatBRL(recebido)} icon={CheckCircle2} tone="success" hint="À vista, Pix e cartão" />
        <StatCard label="Vendido fiado" value={formatBRL(fiado)} icon={HandCoins} tone="warning" hint="Hoje" />
        <StatCard label="Dívidas pendentes" value={formatBRL(dividas)} icon={AlertCircle} tone="danger" hint={`${militares.filter((m) => m.saldoDevedor > 0).length} militares devendo`} />
        <StatCard label="Lucro estimado" value={formatBRL(lucro)} icon={TrendingUp} tone="success" hint="Venda menos custo" />
        <StatCard label="Quantidade de vendas" value={String(vendasHoje.length)} icon={Receipt} tone="neutral" hint="Hoje" />
        <StatCard label="Estoque baixo" value={`${baixo.length} produtos`} icon={PackageX} tone="danger" hint="Abaixo do mínimo" className="sm:col-span-2" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <SectionCard title="Faturamento da semana" description="Vendido x recebido" className="lg:col-span-2">
          <ChartContainer config={semanaConfig} className="h-64 w-full">
            <AreaChart data={faturamentoSemana} margin={{ left: -16, right: 8 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="dia" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area dataKey="vendido" type="monotone" stroke="var(--color-vendido)" fill="var(--color-vendido)" fillOpacity={0.12} strokeWidth={2} />
              <Area dataKey="recebido" type="monotone" stroke="var(--color-recebido)" fill="var(--color-recebido)" fillOpacity={0.2} strokeWidth={2} />
            </AreaChart>
          </ChartContainer>
        </SectionCard>

        <SectionCard title="Vendas por categoria" description="Últimos 30 dias">
          <ChartContainer config={catConfig} className="h-64 w-full">
            <BarChart data={vendasPorCategoria} margin={{ left: -16 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="categoria" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="valor" fill="var(--color-valor)" radius={6} />
            </BarChart>
          </ChartContainer>
        </SectionCard>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <SectionCard
          title="Últimas vendas"
          className="lg:col-span-2"
          action={<Button asChild variant="ghost" size="sm"><Link to="/historico">Ver todas <ArrowRight /></Link></Button>}
        >
          <SalesTable vendas={vendasHoje.slice().reverse().slice(0, 6)} />
        </SectionCard>

        <SectionCard
          title="Estoque baixo"
          action={<Button asChild variant="ghost" size="sm"><Link to="/produtos">Estoque <ArrowRight /></Link></Button>}
        >
          <ul className="space-y-4">
            {baixo.map((p) => (
              <li key={p.id}>
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{p.nome}</span>
                  <span className="tabular text-muted-foreground">{p.estoque}/{p.estoqueMinimo}</span>
                </div>
                <Progress value={(p.estoque / p.estoqueMinimo) * 100} className="mt-2 h-1.5" />
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>
    </>
  );
}

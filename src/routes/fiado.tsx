import { createFileRoute } from "@tanstack/react-router";
import { AlertCircle, HandCoins, Users } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/layout/page-header";
import { SectionCard } from "@/components/shared/section-card";
import { StatCard } from "@/components/shared/stat-card";
import { DemoNote } from "@/components/shared/placeholder-note";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { militares, vendas } from "@/lib/mock-data";
import { formatBRL } from "@/lib/format";

export const Route = createFileRoute("/fiado")({
  head: () => ({
    meta: [
      { title: "Fiado / Contas a Receber — Gestão de Vendas" },
      { name: "description", content: "Acompanhe dívidas dos militares e registre pagamentos." },
      { property: "og:title", content: "Fiado / Contas a Receber — Gestão de Vendas" },
      { property: "og:description", content: "Acompanhe dívidas dos militares e registre pagamentos." },
    ],
  }),
  component: Fiado,
});

function Fiado() {
  const devedores = militares.filter((m) => m.saldoDevedor > 0).sort((a, b) => b.saldoDevedor - a.saldoDevedor);
  const total = devedores.reduce((s, m) => s + m.saldoDevedor, 0);
  const pendentes = vendas.filter((v) => v.status !== "pago").length;

  return (
    <>
      <PageHeader title="Fiado / Contas a Receber" description="Quem está devendo e quanto." />
      <DemoNote />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Total a receber" value={formatBRL(total)} icon={HandCoins} tone="warning" />
        <StatCard label="Militares devendo" value={String(devedores.length)} icon={Users} tone="neutral" />
        <StatCard label="Vendas em aberto" value={String(pendentes)} icon={AlertCircle} tone="danger" />
      </div>
      <SectionCard title="Devedores">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Militar</TableHead>
                <TableHead className="hidden sm:table-cell">Companhia</TableHead>
                <TableHead className="text-right">Saldo devedor</TableHead>
                <TableHead className="text-right">Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {devedores.map((m) => (
                <TableRow key={m.id}>
                  <TableCell>
                    <p className="font-medium">{m.nome}</p>
                    <p className="text-xs text-muted-foreground">{m.posto}</p>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{m.companhia}</TableCell>
                  <TableCell className="tabular text-right font-semibold text-destructive">{formatBRL(m.saldoDevedor)}</TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline" onClick={() => toast.success(`Pagamento de ${m.nome} registrado.`)}>
                      Receber
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </SectionCard>
    </>
  );
}

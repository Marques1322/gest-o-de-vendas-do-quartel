import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { PageHeader } from "@/components/layout/page-header";
import { SectionCard } from "@/components/shared/section-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/configuracoes")({
  head: () => ({
    meta: [
      { title: "Configurações — Gestão de Vendas" },
      { name: "description", content: "Dados do negócio, preferências e alertas." },
      { property: "og:title", content: "Configurações — Gestão de Vendas" },
      { property: "og:description", content: "Dados do negócio, preferências e alertas." },
    ],
  }),
  component: Configuracoes,
});

function Pref({ label, desc, on }: { label: string; desc: string; on?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div><p className="text-sm font-medium">{label}</p><p className="text-xs text-muted-foreground">{desc}</p></div>
      <Switch defaultChecked={on ?? false} />
    </div>
  );
}

function Configuracoes() {
  return (
    <>
      <PageHeader title="Configurações" description="Ajustes gerais do sistema." />
      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Dados do negócio">
          <div className="grid gap-4">
            <div className="space-y-2"><Label>Nome do negócio</Label><Input defaultValue="Cantina do Quartel" /></div>
            <div className="space-y-2"><Label>Responsável</Label><Input placeholder="Seu nome" /></div>
            <div className="space-y-2"><Label>Chave Pix</Label><Input placeholder="CPF, e-mail ou telefone" /></div>
            <Button className="w-fit" onClick={() => toast.success("Configurações salvas.")}>Salvar</Button>
          </div>
        </SectionCard>
        <SectionCard title="Preferências">
          <div className="divide-y">
            <Pref label="Alerta de estoque baixo" desc="Avisar quando um produto atingir o mínimo." on />
            <Pref label="Permitir vendas fiado" desc="Exibir a opção Fiado na tela de venda." on />
            <Pref label="Limite de fiado por militar" desc="Bloquear novas vendas acima do limite." />
            <Pref label="Lembrete de cobrança" desc="Lembrar dívidas com mais de 30 dias." />
          </div>
        </SectionCard>
      </div>
    </>
  );
}

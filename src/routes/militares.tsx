import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/layout/page-header";
import { SectionCard } from "@/components/shared/section-card";
import { DemoNote } from "@/components/shared/placeholder-note";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { COMPANHIAS, POSTOS, militares } from "@/lib/mock-data";
import { formatBRL } from "@/lib/format";

export const Route = createFileRoute("/militares")({
  head: () => ({
    meta: [
      { title: "Militares — Gestão de Vendas" },
      { name: "description", content: "Cadastro de militares com posto, graduação e companhia." },
      { property: "og:title", content: "Militares — Gestão de Vendas" },
      { property: "og:description", content: "Cadastro de militares com posto, graduação e companhia." },
    ],
  }),
  component: Militares,
});

function NovoMilitarDialog() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild><Button><Plus /> Novo militar</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>Cadastrar militar</DialogTitle></DialogHeader>
        <div className="grid gap-4">
          <div className="space-y-2"><Label>Nome de guerra</Label><Input placeholder="Ex.: Silva" /></div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Posto / Graduação</Label>
              <Select><SelectTrigger className="w-full"><SelectValue placeholder="Selecionar" /></SelectTrigger>
                <SelectContent>{POSTOS.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Companhia</Label>
              <Select><SelectTrigger className="w-full"><SelectValue placeholder="Selecionar" /></SelectTrigger>
                <SelectContent>{COMPANHIAS.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2"><Label>Telefone (opcional)</Label><Input placeholder="(92) 90000-0000" /></div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={() => { setOpen(false); toast.success("Militar cadastrado."); }}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Militares() {
  const [busca, setBusca] = useState("");
  const lista = militares.filter((m) => `${m.nome} ${m.posto} ${m.companhia}`.toLowerCase().includes(busca.toLowerCase()));
  return (
    <>
      <PageHeader title="Militares" description="Clientes cadastrados por posto e companhia." actions={<NovoMilitarDialog />} />
      <DemoNote />
      <SectionCard title={`${lista.length} militares`}>
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Buscar por nome, posto ou companhia..." className="pl-9" value={busca} onChange={(e) => setBusca(e.target.value)} />
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Posto / Grad.</TableHead>
                <TableHead>Companhia</TableHead>
                <TableHead className="hidden md:table-cell">Telefone</TableHead>
                <TableHead className="text-right">Saldo devedor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lista.map((m) => (
                <TableRow key={m.id}>
                  <TableCell className="font-medium">{m.nome}</TableCell>
                  <TableCell>{m.posto}</TableCell>
                  <TableCell>{m.companhia}</TableCell>
                  <TableCell className="hidden text-muted-foreground md:table-cell">{m.telefone ?? "—"}</TableCell>
                  <TableCell className={`tabular text-right font-semibold ${m.saldoDevedor > 0 ? "text-destructive" : "text-muted-foreground"}`}>
                    {formatBRL(m.saldoDevedor)}
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

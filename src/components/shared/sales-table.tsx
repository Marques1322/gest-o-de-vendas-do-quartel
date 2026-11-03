import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "./status-badge";
import { formatBRL, formatDateTime, pagamentoLabel } from "@/lib/format";
import { getMilitar } from "@/lib/mock-data";
import type { Venda } from "@/lib/types";

export function SalesTable({ vendas }: { vendas: Venda[] }) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Venda</TableHead>
            <TableHead>Militar</TableHead>
            <TableHead className="hidden md:table-cell">Companhia</TableHead>
            <TableHead className="hidden sm:table-cell">Pagamento</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vendas.map((v) => {
            const m = getMilitar(v.militarId);
            return (
              <TableRow key={v.id}>
                <TableCell>
                  <p className="font-mono text-xs font-medium">{v.id}</p>
                  <p className="text-xs text-muted-foreground">{formatDateTime(v.data)}</p>
                </TableCell>
                <TableCell>
                  <p className="font-medium">{m?.nome}</p>
                  <p className="text-xs text-muted-foreground">{m?.posto}</p>
                </TableCell>
                <TableCell className="hidden md:table-cell">{m?.companhia}</TableCell>
                <TableCell className="hidden sm:table-cell">{pagamentoLabel[v.formaPagamento]}</TableCell>
                <TableCell><StatusBadge status={v.status} /></TableCell>
                <TableCell className="tabular text-right font-semibold">{formatBRL(v.total)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

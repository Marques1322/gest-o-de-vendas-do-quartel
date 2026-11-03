import { Info } from "lucide-react";

export function DemoNote() {
  return (
    <div className="mb-6 flex items-center gap-2 rounded-lg border border-dashed bg-card px-4 py-2.5 text-xs text-muted-foreground">
      <Info className="size-4 shrink-0 text-primary" />
      Dados de demonstração. As informações serão salvas de verdade após conectar o banco de dados.
    </div>
  );
}

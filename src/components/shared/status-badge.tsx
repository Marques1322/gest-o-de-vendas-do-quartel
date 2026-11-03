import { cn } from "@/lib/utils";

const styles = {
  pago: "bg-success-soft text-success",
  pendente: "bg-warning-soft text-warning",
  parcial: "bg-danger-soft text-destructive",
  ok: "bg-success-soft text-success",
  baixo: "bg-danger-soft text-destructive",
} as const;

const labels: Record<keyof typeof styles, string> = {
  pago: "Pago", pendente: "Pendente", parcial: "Parcial", ok: "Normal", baixo: "Estoque baixo",
};

export function StatusBadge({ status }: { status: keyof typeof styles }) {
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold", styles[status])}>
      {labels[status]}
    </span>
  );
}

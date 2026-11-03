import type { LucideIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const iconVariants = cva("flex size-10 items-center justify-center rounded-lg", {
  variants: {
    tone: {
      primary: "bg-primary-soft text-primary",
      success: "bg-success-soft text-success",
      warning: "bg-warning-soft text-warning",
      danger: "bg-danger-soft text-destructive",
      neutral: "bg-muted text-muted-foreground",
    },
  },
  defaultVariants: { tone: "primary" },
});

interface StatCardProps extends VariantProps<typeof iconVariants> {
  label: string;
  value: string;
  hint?: string;
  icon: LucideIcon;
  className?: string;
}

export function StatCard({ label, value, hint, icon: Icon, tone, className }: StatCardProps) {
  return (
    <Card className={cn("gap-0 p-5 shadow-none", className)}>
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <div className={iconVariants({ tone })}>
          <Icon className="size-5" />
        </div>
      </div>
      <p className="tabular mt-2 text-2xl font-bold tracking-tight">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </Card>
  );
}

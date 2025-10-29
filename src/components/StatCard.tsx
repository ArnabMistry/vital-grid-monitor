import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  variant?: "primary" | "danger" | "warning" | "success";
  trend?: {
    value: string;
    positive: boolean;
  };
  subtitle?: string;
  className?: string;
  children?: ReactNode;
}

const variantStyles = {
  primary: "border-l-primary",
  danger: "border-l-danger",
  warning: "border-l-warning",
  success: "border-l-success",
};

const iconVariantStyles = {
  primary: "bg-primary/10 text-primary",
  danger: "bg-danger/10 text-danger",
  warning: "bg-warning/10 text-warning",
  success: "bg-success/10 text-success",
};

export const StatCard = ({
  title,
  value,
  icon: Icon,
  variant = "primary",
  trend,
  subtitle,
  className,
  children,
}: StatCardProps) => {
  return (
    <div
      className={cn(
        "glass-card hover-lift rounded-xl border-l-4 p-6 transition-smooth",
        variantStyles[variant],
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground opacity-65">
            {title}
          </p>
          <p className="mt-3 text-4xl font-bold stat-number text-foreground">{value}</p>
          {subtitle && (
            <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          )}
          {trend && (
            <p className={cn("mt-2 text-sm font-medium", trend.positive ? "text-success" : "text-danger")}>
              {trend.positive ? "↑" : "↓"} {trend.value}
            </p>
          )}
          {children}
        </div>
        <div className={cn("rounded-lg p-3", iconVariantStyles[variant])}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
};

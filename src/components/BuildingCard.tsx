import { Building2, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface BuildingCardProps {
  id: string;
  name: string;
  type: string;
  consumption: number;
  status: "normal" | "warning" | "critical";
  trend: number;
  sparklineData?: number[];
}

const statusConfig = {
  normal: {
    badge: "bg-success/10 text-success",
    text: "Normal",
  },
  warning: {
    badge: "bg-warning/10 text-warning",
    text: "Warning",
  },
  critical: {
    badge: "bg-danger/10 text-danger",
    text: "Critical",
  },
};

export const BuildingCard = ({
  id,
  name,
  type,
  consumption,
  status,
  trend,
}: BuildingCardProps) => {
  const config = statusConfig[status];
  
  return (
    <Link to={`/buildings/${id}`}>
      <div className="glass-card hover-lift group rounded-xl border-l-4 border-l-primary p-5 transition-smooth">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{name}</h3>
              <p className="text-xs text-muted-foreground">{type}</p>
            </div>
          </div>
          <span className={cn("rounded-full px-3 py-1 text-xs font-medium", config.badge)}>
            {config.text}
          </span>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-3xl font-bold stat-number text-foreground">{consumption}</p>
            <p className="text-xs text-muted-foreground">kWh current usage</p>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className={cn("flex items-center gap-1", trend > 0 ? "text-danger" : "text-success")}>
              {trend > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              <span className="font-medium">{Math.abs(trend)}%</span>
            </div>
            <span className="text-xs text-muted-foreground">vs yesterday</span>
          </div>

          {/* Progress bar */}
          <div className="h-2 w-full rounded-full bg-muted">
            <div
              className={cn(
                "h-full rounded-full transition-all",
                status === "normal" && "bg-success",
                status === "warning" && "bg-warning",
                status === "critical" && "bg-danger"
              )}
              style={{ width: `${Math.min((consumption / 1000) * 100, 100)}%` }}
            />
          </div>

          <p className="text-xs text-primary opacity-0 transition-opacity group-hover:opacity-100">
            View Details →
          </p>
        </div>
      </div>
    </Link>
  );
};

import { AlertTriangle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface AlertCardProps {
  severity: "critical" | "warning" | "info";
  title: string;
  timestamp: string;
  building: string;
  currentValue: number;
  normalValue: number;
  variance: number;
  estimatedWaste?: string;
  onViewDetails?: () => void;
  onResolve?: () => void;
}

const severityConfig = {
  critical: {
    badge: "bg-danger text-danger-foreground animate-pulse-glow",
    icon: "🔴",
    text: "CRITICAL",
    border: "border-l-danger",
  },
  warning: {
    badge: "bg-warning text-warning-foreground",
    icon: "🟡",
    text: "WARNING",
    border: "border-l-warning",
  },
  info: {
    badge: "bg-secondary text-secondary-foreground",
    icon: "🔵",
    text: "INFO",
    border: "border-l-secondary",
  },
};

export const AlertCard = ({
  severity,
  title,
  timestamp,
  building,
  currentValue,
  normalValue,
  variance,
  estimatedWaste,
  onViewDetails,
  onResolve,
}: AlertCardProps) => {
  const config = severityConfig[severity];

  return (
    <div className={cn("glass-card rounded-xl border-l-4 p-6", config.border)}>
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className={cn("rounded-lg px-3 py-1 text-xs font-bold uppercase", config.badge)}>
            {config.icon} {config.text}
          </span>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            {timestamp}
          </div>
        </div>
      </div>

      <h3 className="mb-4 text-xl font-bold text-foreground">{title}</h3>

      <div className="mb-4 grid grid-cols-2 gap-4 rounded-lg bg-background-secondary p-4">
        <div>
          <p className="text-sm text-muted-foreground">Current Value</p>
          <p className="mt-1 text-2xl font-bold stat-number text-foreground">{currentValue} kWh</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Normal Baseline</p>
          <p className="mt-1 text-2xl font-bold stat-number text-muted-foreground">{normalValue} kWh</p>
        </div>
      </div>

      <div className="mb-4 space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Location:</span>
          <span className="font-medium text-foreground">{building}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Variance:</span>
          <span className={cn("font-bold", severity === "critical" ? "text-danger" : "text-warning")}>
            +{variance}% above normal
          </span>
        </div>
        {estimatedWaste && (
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Estimated Waste:</span>
            <span className="font-bold text-danger">{estimatedWaste}</span>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        {onViewDetails && (
          <Button onClick={onViewDetails} className="flex-1">
            View Details
          </Button>
        )}
        {onResolve && (
          <Button onClick={onResolve} variant="outline" className="flex-1">
            Mark Resolved
          </Button>
        )}
      </div>
    </div>
  );
};

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ChartCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  actions?: ReactNode;
  className?: string;
}

export const ChartCard = ({
  title,
  description,
  children,
  actions,
  className,
}: ChartCardProps) => {
  return (
    <div className={cn("glass-card rounded-xl p-6", className)}>
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold text-foreground">{title}</h3>
          {description && (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        {actions && <div className="flex gap-2">{actions}</div>}
      </div>
      {children}
    </div>
  );
};

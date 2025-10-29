import { AlertTriangle, Clock, CheckCircle } from "lucide-react";
import { AlertCard } from "@/components/AlertCard";
import { ChartCard } from "@/components/ChartCard";
import { Button } from "@/components/ui/button";

const Anomalies = () => {
  const activeAlerts = [
    {
      severity: "critical" as const,
      title: "Lab Complex B - Unusual Consumption Spike Detected",
      timestamp: "2 hours ago",
      building: "Lab Complex B, HVAC Zone 3",
      currentValue: 2850,
      normalValue: 1050,
      variance: 180,
      estimatedWaste: "₹3,200",
    },
    {
      severity: "warning" as const,
      title: "Residential Hall A - Above Average Night Usage",
      timestamp: "5 hours ago",
      building: "Residential Hall A, Common Areas",
      currentValue: 580,
      normalValue: 420,
      variance: 38,
      estimatedWaste: "₹450",
    },
    {
      severity: "warning" as const,
      title: "Library - Lighting System Overrun",
      timestamp: "8 hours ago",
      building: "Library, 2nd Floor",
      currentValue: 340,
      normalValue: 245,
      variance: 39,
    },
  ];

  const statistics = [
    { label: "Detection Accuracy", value: "89%", trend: "+2.3% this week", color: "text-success" },
    { label: "Avg Response Time", value: "1.2h", trend: "-15min improvement", color: "text-primary" },
    { label: "Total Savings", value: "₹45,000", trend: "this month", color: "text-warning" },
  ];

  const historyData = [
    {
      status: "resolved",
      severity: "critical",
      building: "Academic Block C",
      type: "Consumption Spike",
      detected: "2024-01-14 14:30",
      resolved: "2024-01-14 16:45",
    },
    {
      status: "resolved",
      severity: "warning",
      building: "Admin Building",
      type: "Equipment Malfunction",
      detected: "2024-01-13 09:15",
      resolved: "2024-01-13 11:20",
    },
    {
      status: "resolved",
      severity: "warning",
      building: "Lab Complex B",
      type: "Pattern Change",
      detected: "2024-01-12 18:00",
      resolved: "2024-01-12 19:30",
    },
    {
      status: "active",
      severity: "warning",
      building: "Residential Hall A",
      type: "Above Baseline",
      detected: "2024-01-15 03:00",
      resolved: "Active",
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Dashboard</span>
          <span>/</span>
          <span className="text-foreground">Anomalies</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Anomaly Detection & Alerts</h1>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-success animate-pulse-glow" />
                <span className="text-sm text-success font-medium">System Monitoring Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid gap-6 md:grid-cols-3">
        {statistics.map((stat, i) => (
          <div key={i} className="glass-card rounded-xl p-6">
            <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              {stat.label}
            </p>
            <p className={`mt-3 text-4xl font-bold stat-number ${stat.color}`}>{stat.value}</p>
            <p className="mt-2 text-sm text-muted-foreground">{stat.trend}</p>
          </div>
        ))}
      </div>

      {/* Active Alerts */}
      <div>
        <div className="mb-6 flex items-center gap-3">
          <AlertTriangle className="h-6 w-6 text-danger" />
          <h2 className="text-2xl font-bold text-foreground">
            Active Alerts
            <span className="ml-3 rounded-full bg-danger px-3 py-1 text-sm font-bold text-danger-foreground">
              {activeAlerts.length}
            </span>
          </h2>
        </div>
        <div className="space-y-6">
          {activeAlerts.map((alert, i) => (
            <AlertCard key={i} {...alert} />
          ))}
        </div>
      </div>

      {/* Anomaly Timeline Visualization */}
      <ChartCard
        title="Anomaly Detection Timeline"
        description="Last 7 days - Scatter plot of consumption with detected anomalies"
      >
        <div className="relative h-80">
          <div className="absolute inset-0 flex items-end justify-between gap-1">
            {/* Background grid */}
            {Array.from({ length: 7 }).map((_, day) => (
              <div key={day} className="flex-1 relative">
                <div className="absolute bottom-0 w-full border-r border-muted/30 h-full" />
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">
                  Day {day + 1}
                </span>

                {/* Data points for each day */}
                {Array.from({ length: 24 }).map((_, hour) => {
                  const isAnomaly = Math.random() > 0.92;
                  const yPos = Math.random() * 80 + 10;

                  return (
                    <div
                      key={hour}
                      className={`absolute w-2 h-2 rounded-full transition-all hover:scale-150 ${
                        isAnomaly
                          ? "bg-danger animate-pulse-glow cursor-pointer"
                          : "bg-success/30 hover:bg-success/50"
                      }`}
                      style={{
                        bottom: `${yPos}%`,
                        left: `${(hour / 24) * 100}%`,
                      }}
                      title={isAnomaly ? `Anomaly detected: ${hour}:00` : `Normal: ${hour}:00`}
                    />
                  );
                })}
              </div>
            ))}
          </div>

          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 flex h-full flex-col justify-between text-xs text-muted-foreground">
            <span>3000</span>
            <span>2000</span>
            <span>1000</span>
            <span>0 kWh</span>
          </div>

          {/* Legend */}
          <div className="absolute right-4 top-0 space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-success/30" />
              <span className="text-muted-foreground">Normal Data</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-danger animate-pulse-glow" />
              <span className="text-muted-foreground">Detected Anomaly</span>
            </div>
          </div>
        </div>
      </ChartCard>

      {/* Historical Alerts Table */}
      <div className="glass-card rounded-xl p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">Alert History</h2>
          <Button variant="outline" size="sm">
            Export Selected
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Severity</th>
                <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Building</th>
                <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Type</th>
                <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Detected</th>
                <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Resolved</th>
                <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {historyData.map((row, i) => (
                <tr key={i} className="border-b border-border/50 transition-colors hover:bg-muted/50">
                  <td className="py-3">
                    {row.status === "resolved" ? (
                      <CheckCircle className="h-5 w-5 text-success" />
                    ) : (
                      <Clock className="h-5 w-5 text-warning" />
                    )}
                  </td>
                  <td className="py-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        row.severity === "critical"
                          ? "bg-danger/10 text-danger"
                          : "bg-warning/10 text-warning"
                      }`}
                    >
                      {row.severity}
                    </span>
                  </td>
                  <td className="py-3 text-sm text-foreground">{row.building}</td>
                  <td className="py-3 text-sm text-foreground">{row.type}</td>
                  <td className="py-3 text-sm text-muted-foreground">{row.detected}</td>
                  <td
                    className={`py-3 text-sm ${
                      row.status === "resolved" ? "text-success" : "text-warning font-medium"
                    }`}
                  >
                    {row.resolved}
                  </td>
                  <td className="py-3">
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Anomalies;

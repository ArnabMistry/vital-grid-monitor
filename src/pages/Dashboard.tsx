import { Zap, AlertTriangle, DollarSign, Download, Lightbulb, Target } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { ChartCard } from "@/components/ChartCard";
import { BuildingCard } from "@/components/BuildingCard";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  // Mock data
  const buildings = [
    { id: "1", name: "Academic Block C", type: "Academic", consumption: 850, status: "normal" as const, trend: -5 },
    { id: "2", name: "Residential Hall A", type: "Residential", consumption: 920, status: "warning" as const, trend: 12 },
    { id: "3", name: "Lab Complex B", type: "Laboratory", consumption: 1150, status: "critical" as const, trend: 40 },
    { id: "4", name: "Library", type: "Academic", consumption: 420, status: "normal" as const, trend: -2 },
    { id: "5", name: "Admin Building", type: "Administrative", consumption: 310, status: "normal" as const, trend: 3 },
  ];

  const insights = [
    { icon: "⚡", text: "Peak usage detected at 2:15 PM (3,200 kWh)" },
    { icon: "🏢", text: "Lab Complex B consuming 40% above baseline" },
    { icon: "💰", text: "Potential savings of ₹4,500 identified today" },
    { icon: "🌡️", text: "HVAC efficiency down 15% due to high outdoor temp" },
  ];

  const recommendations = [
    {
      priority: "High",
      title: "Pre-cool buildings before afternoon peak",
      savings: "Save ₹1,200/day",
    },
    {
      priority: "Critical",
      title: "Investigate Lab Complex B HVAC system",
      savings: "Prevent ₹3,200/day waste",
    },
    {
      priority: "Medium",
      title: "Shift non-critical loads to off-peak hours",
      savings: "Save ₹800/day",
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Hero Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        <StatCard
          title="Current Usage"
          value="2,450"
          icon={Zap}
          variant="primary"
          subtitle="kWh - Real-time Campus Consumption"
          trend={{ value: "8% from yesterday", positive: false }}
        />
        <StatCard
          title="Active Alerts"
          value="3"
          icon={AlertTriangle}
          variant="danger"
          subtitle="Anomalies Detected"
        >
          <Button variant="link" className="mt-2 h-auto p-0 text-primary">
            View Details →
          </Button>
        </StatCard>
        <StatCard
          title="Cost Today"
          value="₹18,400"
          icon={DollarSign}
          variant="warning"
          subtitle="Projected monthly: ₹5.2L"
        />
      </div>

      {/* Energy Trends Chart */}
      <ChartCard
        title="Energy Consumption Trends"
        description="Real-time and AI-predicted consumption patterns"
        actions={
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        }
      >
        <div className="relative h-80">
          {/* Simulated chart area */}
          <div className="flex h-full items-end justify-between gap-2">
            {Array.from({ length: 24 }).map((_, i) => {
              const height = Math.random() * 60 + 20;
              const isPrediction = i > 18;
              return (
                <div key={i} className="relative flex-1">
                  <div
                    className={`w-full rounded-t-md transition-all hover:opacity-80 ${
                      isPrediction
                        ? "bg-success/50 border-2 border-dashed border-success"
                        : "bg-secondary"
                    }`}
                    style={{ height: `${height}%` }}
                  />
                  {i % 4 === 0 && (
                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">
                      {i}:00
                    </span>
                  )}
                </div>
              );
            })}
          </div>
          <div className="absolute bottom-0 right-4 flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded bg-secondary" />
              <span className="text-muted-foreground">Actual</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded border-2 border-dashed border-success bg-success/50" />
              <span className="text-muted-foreground">Predicted</span>
            </div>
          </div>
        </div>
      </ChartCard>

      {/* Building Breakdown */}
      <div>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Building-wise Energy Status</h2>
            <p className="text-sm text-muted-foreground">Real-time consumption across campus facilities</p>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {buildings.map((building) => (
            <BuildingCard key={building.id} {...building} />
          ))}
        </div>
      </div>

      {/* Quick Insights & Recommendations */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Insights */}
        <div className="glass-card rounded-xl p-6">
          <div className="mb-6 flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-warning" />
            <h2 className="text-xl font-bold text-foreground">Today's Insights</h2>
          </div>
          <div className="space-y-4">
            {insights.map((insight, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-lg bg-background-secondary p-4 transition-smooth hover:bg-muted"
              >
                <span className="text-2xl">{insight.icon}</span>
                <p className="flex-1 text-sm text-foreground">{insight.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="glass-card rounded-xl p-6">
          <div className="mb-6 flex items-center gap-2">
            <Target className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Recommended Actions</h2>
          </div>
          <div className="space-y-4">
            {recommendations.map((rec, i) => (
              <div key={i} className="rounded-lg border border-border p-4 transition-smooth hover:border-primary">
                <div className="mb-2 flex items-center justify-between">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      rec.priority === "Critical"
                        ? "bg-danger/10 text-danger"
                        : rec.priority === "High"
                        ? "bg-warning/10 text-warning"
                        : "bg-secondary/10 text-secondary"
                    }`}
                  >
                    {rec.priority}
                  </span>
                  <span className="text-sm font-semibold text-success">{rec.savings}</span>
                </div>
                <p className="mb-3 font-medium text-foreground">{rec.title}</p>
                <Button variant="link" className="h-auto p-0 text-sm text-primary">
                  Learn More →
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

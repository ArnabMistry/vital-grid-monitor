import { useParams } from "react-router-dom";
import { Building2, Zap, DollarSign, Leaf, Download, Settings } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { ChartCard } from "@/components/ChartCard";
import { Button } from "@/components/ui/button";

const BuildingDetail = () => {
  const { id } = useParams();

  // Mock building data
  const building = {
    name: "Lab Complex B",
    type: "Laboratory",
    consumption: 1150,
    status: "critical" as const,
    cost: 8625,
    carbon: 942,
  };

  const breakdown = [
    { category: "HVAC", percentage: 45, value: 518, color: "bg-secondary" },
    { category: "Lighting", percentage: 25, value: 288, color: "bg-warning" },
    { category: "Equipment", percentage: 20, value: 230, color: "bg-primary" },
    { category: "Others", percentage: 10, value: 115, color: "bg-muted" },
  ];

  const opportunities = [
    {
      icon: "🌡️",
      title: "HVAC Optimization",
      issue: "HVAC runs at 60% capacity during unoccupied hours (6 PM - 6 AM)",
      savings: "120 kWh/day = ₹900/day = ₹27,000/month",
      efficiency: 65,
      recommendation: "Install occupancy sensors + schedule optimization",
    },
    {
      icon: "💡",
      title: "Lighting Efficiency",
      issue: "23% of lighting remains on after 10 PM with no occupancy detected",
      savings: "45 kWh/day = ₹340/day = ₹10,200/month",
      efficiency: 77,
      recommendation: "Deploy motion sensors and automated scheduling",
    },
    {
      icon: "🔌",
      title: "Equipment Standby Power",
      issue: "Estimated 85 kWh/day wasted on standby devices",
      savings: "85 kWh/day = ₹640/day = ₹19,200/month",
      efficiency: 60,
      recommendation: "Install smart power strips with auto-off",
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Dashboard</span>
          <span>/</span>
          <span>Buildings</span>
          <span>/</span>
          <span className="text-foreground">{building.name}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary">
              <Building2 className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground">{building.name}</h1>
              <p className="text-muted-foreground">{building.type}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </Button>
            <Button variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              Configure Alerts
            </Button>
          </div>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-6 md:grid-cols-4">
        <StatCard
          title="Current Usage"
          value={`${building.consumption}`}
          icon={Zap}
          variant="primary"
          subtitle="kWh real-time"
        />
        <StatCard
          title="Status"
          value="Critical"
          icon={Building2}
          variant="danger"
          subtitle="40% above baseline"
        />
        <StatCard
          title="Today's Cost"
          value={`₹${building.cost.toLocaleString()}`}
          icon={DollarSign}
          variant="warning"
          subtitle="vs ₹6,150 yesterday"
        />
        <StatCard
          title="Carbon Footprint"
          value={`${building.carbon}`}
          icon={Leaf}
          variant="success"
          subtitle="kg CO₂ | ~47 trees"
        />
      </div>

      {/* Consumption Breakdown */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Donut Chart */}
        <ChartCard title="Energy Breakdown by Category" description="Today's consumption distribution">
          <div className="flex items-center justify-center py-8">
            <div className="relative h-64 w-64">
              {/* Simulated donut chart */}
              <svg className="h-full w-full -rotate-90 transform">
                {breakdown.map((item, i) => {
                  const total = breakdown.reduce((acc, curr) => acc + curr.percentage, 0);
                  const offset = breakdown
                    .slice(0, i)
                    .reduce((acc, curr) => acc + curr.percentage, 0);
                  const circumference = 2 * Math.PI * 90;
                  const strokeDasharray = `${(item.percentage / total) * circumference} ${circumference}`;
                  const strokeDashoffset = -((offset / total) * circumference);

                  return (
                    <circle
                      key={i}
                      cx="128"
                      cy="128"
                      r="90"
                      fill="none"
                      stroke={`hsl(var(--${
                        item.category === "HVAC"
                          ? "secondary"
                          : item.category === "Lighting"
                          ? "warning"
                          : item.category === "Equipment"
                          ? "primary"
                          : "muted"
                      }))`}
                      strokeWidth="40"
                      strokeDasharray={strokeDasharray}
                      strokeDashoffset={strokeDashoffset}
                    />
                  );
                })}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-3xl font-bold stat-number text-foreground">{building.consumption}</p>
                <p className="text-sm text-muted-foreground">kWh Total</p>
              </div>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {breakdown.map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`h-3 w-3 rounded ${item.color}`} />
                  <span className="text-sm text-foreground">{item.category}</span>
                </div>
                <span className="text-sm font-medium text-foreground">
                  {item.value} kWh ({item.percentage}%)
                </span>
              </div>
            ))}
          </div>
        </ChartCard>

        {/* Top Consumers */}
        <ChartCard title="Top Energy Consumers" description="Ranked by consumption">
          <div className="space-y-4">
            {breakdown.map((item, i) => (
              <div key={i}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">{item.category}</span>
                  <span className="stat-number text-foreground">{item.value} kWh</span>
                </div>
                <div className="h-3 w-full rounded-full bg-muted">
                  <div
                    className={`h-full rounded-full ${item.color} transition-all`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <Button variant="link" className="mt-1 h-auto p-0 text-xs text-primary">
                  Details →
                </Button>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* 24-Hour Profile */}
      <ChartCard
        title="24-Hour Consumption Profile"
        description="Today's hourly energy usage with peak/off-peak zones"
      >
        <div className="relative h-80">
          <div className="flex h-full items-end justify-between gap-1">
            {Array.from({ length: 24 }).map((_, i) => {
              const isPeak = i >= 9 && i <= 17;
              const height = 20 + Math.sin(i * 0.5) * 30 + Math.random() * 20;

              return (
                <div key={i} className="relative flex-1">
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      background: isPeak
                        ? "hsl(var(--danger))"
                        : "hsl(var(--success))",
                    }}
                  />
                  <div
                    className="w-full rounded-t-md bg-secondary transition-all hover:bg-secondary/80"
                    style={{ height: `${height}%` }}
                  />
                  {i % 3 === 0 && (
                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">
                      {i}:00
                    </span>
                  )}
                </div>
              );
            })}
          </div>
          <div className="absolute right-4 top-0 space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="h-3 w-8 bg-danger/20" />
              <span className="text-muted-foreground">Peak Hours (9 AM - 5 PM)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-8 bg-success/20" />
              <span className="text-muted-foreground">Off-Peak (6 PM - 8 AM)</span>
            </div>
          </div>
        </div>
      </ChartCard>

      {/* Optimization Opportunities */}
      <div className="glass-card rounded-xl border-l-4 border-l-secondary p-6">
        <h2 className="mb-6 text-2xl font-bold text-foreground">💡 Identified Savings Opportunities</h2>
        <div className="space-y-6">
          {opportunities.map((opp, i) => (
            <div key={i} className="rounded-xl border border-border p-6 transition-smooth hover:border-primary">
              <div className="mb-4 flex items-start gap-4">
                <span className="text-4xl">{opp.icon}</span>
                <div className="flex-1">
                  <h3 className="mb-2 text-xl font-bold text-foreground">{opp.title}</h3>
                  <p className="mb-3 text-sm text-muted-foreground">{opp.issue}</p>
                  <p className="mb-4 text-lg font-bold text-success">{opp.savings}</p>

                  <div className="mb-4">
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Current Efficiency</span>
                      <span className="font-medium text-foreground">{opp.efficiency}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-warning"
                        style={{ width: `${opp.efficiency}%` }}
                      />
                    </div>
                  </div>

                  <div className="rounded-lg bg-background-secondary p-4">
                    <p className="text-sm font-medium text-foreground">
                      <strong>Recommendation:</strong> {opp.recommendation}
                    </p>
                  </div>

                  <Button className="mt-4">Schedule Assessment</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Building Metadata */}
      <div className="glass-card rounded-xl p-6">
        <h2 className="mb-6 text-xl font-bold text-foreground">Building Information</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex justify-between border-b border-border pb-2">
              <span className="text-muted-foreground">Type</span>
              <span className="font-medium text-foreground">Laboratory</span>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <span className="text-muted-foreground">Area</span>
              <span className="font-medium text-foreground">15,000 sq ft</span>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <span className="text-muted-foreground">Floors</span>
              <span className="font-medium text-foreground">4</span>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <span className="text-muted-foreground">Occupancy</span>
              <span className="font-medium text-foreground">~500 students</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between border-b border-border pb-2">
              <span className="text-muted-foreground">Operating Hours</span>
              <span className="font-medium text-foreground">7 AM - 10 PM</span>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <span className="text-muted-foreground">HVAC Units</span>
              <span className="font-medium text-foreground">4 units</span>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <span className="text-muted-foreground">LED Fixtures</span>
              <span className="font-medium text-foreground">200+</span>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <span className="text-muted-foreground">Lab Equipment</span>
              <span className="font-medium text-foreground">50+ devices</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildingDetail;

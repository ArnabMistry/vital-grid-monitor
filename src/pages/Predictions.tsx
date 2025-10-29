import { TrendingUp, Download, CheckCircle, Info, Target } from "lucide-react";
import { ChartCard } from "@/components/ChartCard";
import { Button } from "@/components/ui/button";

const Predictions = () => {
  const recommendations = [
    {
      priority: "High",
      title: "Pre-cool buildings starting at 1:00 PM",
      savings: "Save up to ₹1,200/day (160 kWh)",
      difficulty: "Easy",
      stars: 2,
      reason: "Peak demand forecasted at 2:00 PM with 38°C outdoor temperature. Pre-cooling reduces peak load by 15%.",
    },
    {
      priority: "Critical",
      title: "Schedule high-load equipment maintenance",
      savings: "Prevent ₹3,200/day waste (420 kWh)",
      difficulty: "Moderate",
      stars: 3,
      reason: "Lab Complex B showing 40% above baseline pattern. Preventive maintenance can avoid emergency repairs.",
    },
    {
      priority: "Medium",
      title: "Shift washing machines to 10 PM - 6 AM",
      savings: "Save up to ₹900/day (120 kWh)",
      difficulty: "Easy",
      stars: 1,
      reason: "Off-peak electricity rates 30% lower. Residential Hall A can save significantly with load shifting.",
    },
  ];

  const forecastHighlights = [
    { icon: "🔴", text: "Peak usage expected at 2:00 PM (3,200 kWh) - 15% higher than typical Wednesday" },
    { icon: "🟡", text: "HVAC demand surge predicted due to high temperature forecast (38°C)" },
    { icon: "🟢", text: "Off-peak savings opportunity: Shift 400 kWh to 10 PM - 6 AM window" },
    { icon: "🌤️", text: "Weather-adjusted prediction: Clear skies reduce lighting needs by 8%" },
  ];

  const accuracyHistory = [
    { date: "2024-01-15", predicted: 2450, actual: 2398, variance: 52, accuracy: 97.9 },
    { date: "2024-01-14", predicted: 2380, actual: 2401, variance: 21, accuracy: 99.1 },
    { date: "2024-01-13", predicted: 2510, actual: 2465, variance: 45, accuracy: 98.2 },
    { date: "2024-01-12", predicted: 2420, actual: 2388, variance: 32, accuracy: 98.7 },
    { date: "2024-01-11", predicted: 2390, actual: 2410, variance: 20, accuracy: 99.2 },
  ];

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Dashboard</span>
          <span>/</span>
          <span className="text-foreground">Predictions</span>
        </div>
        <h1 className="text-4xl font-bold text-foreground">AI-Powered Energy Predictions</h1>
        <p className="flex items-center gap-2 text-muted-foreground">
          <span className="text-lg">🤖</span>
          Using LSTM neural networks trained on 2+ years of campus data
        </p>
      </div>

      {/* Model Performance Metrics */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="glass-card rounded-xl p-6 text-center">
          <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center">
            <div className="relative h-full w-full">
              <svg className="h-full w-full -rotate-90 transform">
                <circle cx="48" cy="48" r="40" stroke="hsl(var(--muted))" strokeWidth="8" fill="none" />
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="hsl(var(--success))"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  strokeDashoffset={`${2 * Math.PI * 40 * (1 - 0.947)}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-success">94.7%</span>
              </div>
            </div>
          </div>
          <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Accuracy</h3>
          <p className="mt-2 flex items-center justify-center gap-1 text-xs text-success">
            <CheckCircle className="h-4 w-4" />
            Excellent Performance
          </p>
        </div>

        <div className="glass-card rounded-xl p-6 text-center">
          <div className="mb-4">
            <p className="text-5xl font-bold stat-number text-secondary">45</p>
            <p className="text-sm text-muted-foreground">kWh</p>
          </div>
          <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Mean Absolute Error
          </h3>
          <button className="mt-2 flex items-center gap-1 text-xs text-primary hover:underline">
            <Info className="h-3 w-3" />
            How is this calculated?
          </button>
        </div>

        <div className="glass-card rounded-xl p-6 text-center">
          <div className="mb-4">
            <p className="text-5xl font-bold stat-number text-primary">0.947</p>
            <div className="mx-auto mt-3 h-2 w-full rounded-full bg-muted">
              <div className="h-full w-[94.7%] rounded-full bg-primary" />
            </div>
          </div>
          <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">R² Score</h3>
          <p className="mt-2 text-xs text-muted-foreground">0 (poor) to 1 (perfect)</p>
        </div>
      </div>

      {/* Main Forecast Chart */}
      <ChartCard
        title="Energy Consumption Forecast - Next 24 Hours"
        description="Historical actual vs AI-predicted consumption with 95% confidence interval"
        actions={
          <>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              Fullscreen
            </Button>
          </>
        }
      >
        <div className="relative h-96">
          <div className="flex h-full items-end justify-between gap-1">
            {Array.from({ length: 48 }).map((_, i) => {
              const isHistorical = i < 24;
              const height = 30 + Math.sin(i * 0.3) * 20 + Math.random() * 10;
              const confidenceRange = isHistorical ? 0 : Math.random() * 10;

              return (
                <div key={i} className="relative flex flex-1 flex-col items-center">
                  {!isHistorical && confidenceRange > 0 && (
                    <div
                      className="absolute bottom-0 w-full rounded-t-sm bg-success/20"
                      style={{ height: `${height + confidenceRange}%` }}
                    />
                  )}
                  <div
                    className={`w-full rounded-t-md transition-all hover:opacity-80 ${
                      isHistorical ? "bg-secondary" : "bg-success border-t-2 border-dashed border-success"
                    }`}
                    style={{ height: `${height}%` }}
                  />
                  {i === 23 && (
                    <div className="absolute bottom-0 left-0 h-full w-px bg-foreground/20">
                      <span className="absolute -top-6 left-2 rounded bg-foreground/90 px-2 py-1 text-xs text-background">
                        Now
                      </span>
                    </div>
                  )}
                  {i % 6 === 0 && (
                    <span className="absolute -bottom-8 text-xs text-muted-foreground">
                      {i < 24 ? `${i}h ago` : `+${i - 24}h`}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          <div className="absolute right-4 top-0 space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded bg-secondary" />
              <span className="text-muted-foreground">Historical Actual</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded border-t-2 border-dashed border-success bg-success" />
              <span className="text-muted-foreground">AI Predicted</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded bg-success/20" />
              <span className="text-muted-foreground">Confidence Interval</span>
            </div>
          </div>
        </div>
      </ChartCard>

      {/* Forecast Highlights */}
      <div className="glass-card rounded-xl p-6">
        <div className="mb-6 flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-bold text-foreground">Forecast Highlights</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {forecastHighlights.map((highlight, i) => (
            <div key={i} className="flex items-start gap-3 rounded-lg bg-background-secondary p-4">
              <span className="text-2xl">{highlight.icon}</span>
              <p className="flex-1 text-sm text-foreground">{highlight.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations Engine */}
      <div className="glass-card rounded-xl p-6">
        <div className="mb-6 flex items-center gap-2">
          <Target className="h-6 w-6 text-warning" />
          <h2 className="text-xl font-bold text-foreground">Optimization Recommendations</h2>
        </div>
        <div className="space-y-4">
          {recommendations.map((rec, i) => (
            <div key={i} className="rounded-xl border border-border p-6 transition-smooth hover:border-primary">
              <div className="mb-4 flex items-start justify-between">
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
                <div className="text-right">
                  <p className="text-sm font-medium text-muted-foreground">Difficulty</p>
                  <div className="mt-1 flex gap-1">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <div
                        key={j}
                        className={`h-2 w-2 rounded-full ${
                          j < rec.stars ? "bg-warning" : "bg-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{rec.difficulty}</p>
                </div>
              </div>

              <h3 className="mb-2 text-lg font-bold text-foreground">{rec.title}</h3>
              <p className="mb-4 text-sm font-semibold text-success">{rec.savings}</p>

              <details className="group">
                <summary className="cursor-pointer text-sm text-primary hover:underline">
                  Why this works ▼
                </summary>
                <p className="mt-3 rounded-lg bg-background-secondary p-4 text-sm text-muted-foreground">
                  {rec.reason}
                </p>
              </details>

              <div className="mt-4 flex gap-3">
                <Button className="flex-1">Implement</Button>
                <Button variant="outline" className="flex-1">
                  Learn More
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prediction History */}
      <div className="glass-card rounded-xl p-6">
        <h2 className="mb-6 text-xl font-bold text-foreground">Prediction Accuracy History</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Date</th>
                <th className="pb-3 text-right text-sm font-medium text-muted-foreground">Predicted (kWh)</th>
                <th className="pb-3 text-right text-sm font-medium text-muted-foreground">Actual (kWh)</th>
                <th className="pb-3 text-right text-sm font-medium text-muted-foreground">Variance</th>
                <th className="pb-3 text-right text-sm font-medium text-muted-foreground">Accuracy</th>
              </tr>
            </thead>
            <tbody>
              {accuracyHistory.map((row, i) => (
                <tr key={i} className="border-b border-border/50 transition-colors hover:bg-muted/50">
                  <td className="py-3 text-sm text-foreground">{row.date}</td>
                  <td className="py-3 text-right text-sm stat-number text-foreground">{row.predicted}</td>
                  <td className="py-3 text-right text-sm stat-number text-foreground">{row.actual}</td>
                  <td
                    className={`py-3 text-right text-sm font-medium ${
                      row.variance < 30 ? "text-success" : row.variance < 50 ? "text-warning" : "text-danger"
                    }`}
                  >
                    ±{row.variance}
                  </td>
                  <td className="py-3 text-right text-sm font-bold text-success">{row.accuracy}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-end">
          <Button variant="outline" size="sm">
            Export as CSV
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Predictions;

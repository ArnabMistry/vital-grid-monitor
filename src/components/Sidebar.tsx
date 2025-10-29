import { NavLink } from "react-router-dom";
import { Home, TrendingUp, AlertTriangle, Building2, Settings, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { title: "Dashboard", path: "/", icon: Home },
  { title: "Predictions", path: "/predictions", icon: TrendingUp },
  { title: "Anomalies", path: "/anomalies", icon: AlertTriangle },
  // { title: "Buildings", path: "/buildings", icon: Building2 },
  { title: "Settings", path: "/settings", icon: Settings },
];

export const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-sidebar-border bg-sidebar z-40 hidden lg:block">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Zap className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-sidebar-foreground">EnergiQ</h1>
            <p className="text-xs text-muted-foreground">Monitor</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-smooth",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )
              }
            >
              <item.icon className="h-5 w-5" />
              {item.title}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-sidebar-border p-4">
          <div className="rounded-lg bg-sidebar-accent p-3">
            <p className="text-xs font-medium text-sidebar-accent-foreground">🌱 Impact Today</p>
            <p className="mt-1 text-lg font-bold text-sidebar-accent-foreground stat-number">-1.2 tons CO₂</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

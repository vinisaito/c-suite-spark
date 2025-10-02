import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  icon: LucideIcon;
}

export const MetricCard = ({ title, value, change, trend, icon: Icon }: MetricCardProps) => {
  const trendColor = {
    up: "text-success",
    down: "text-destructive",
    neutral: "text-muted-foreground",
  };

  return (
    <Card className="p-6 bg-card border-border hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-foreground mb-2">{value}</h3>
          <p className={`text-sm font-medium ${trendColor[trend]}`}>
            {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"} {change}
          </p>
        </div>
        <div className="bg-primary/10 p-3 rounded-xl">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </div>
    </Card>
  );
};

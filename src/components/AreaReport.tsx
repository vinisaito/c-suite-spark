import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface AreaReportProps {
  area: string;
  manager: string;
  performance: number;
  revenue: string;
  status: "excellent" | "good" | "attention" | "critical";
}

export const AreaReport = ({ area, manager, performance, revenue, status }: AreaReportProps) => {
  const statusConfig = {
    excellent: { color: "bg-success", text: "Excelente", textColor: "text-success" },
    good: { color: "bg-primary", text: "Bom", textColor: "text-primary" },
    attention: { color: "bg-warning", text: "Atenção", textColor: "text-warning" },
    critical: { color: "bg-destructive", text: "Crítico", textColor: "text-destructive" },
  };

  const config = statusConfig[status];

  return (
    <Card className="p-6 bg-card border-border hover:shadow-lg transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-foreground mb-1">{area}</h3>
          <p className="text-sm text-muted-foreground">Gestor: {manager}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${config.textColor} bg-${status === 'excellent' ? 'success' : status === 'good' ? 'primary' : status === 'attention' ? 'warning' : 'destructive'}/10`}>
          {config.text}
        </span>
      </div>
      
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Performance</span>
            <span className="font-semibold text-foreground">{performance}%</span>
          </div>
          <Progress value={performance} className="h-2" />
        </div>
        
        <div className="pt-2 border-t border-border">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Receita</span>
            <span className="text-lg font-bold text-primary">{revenue}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

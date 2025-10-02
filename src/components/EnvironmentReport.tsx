import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Clock } from "lucide-react";

interface EnvironmentReportProps {
  environment: string;
  totalChanges: number;
  successful: number;
  failed: number;
  status: "excellent" | "good" | "attention" | "critical";
  lastChange: string;
}

export const EnvironmentReport = ({ 
  environment, 
  totalChanges, 
  successful, 
  failed, 
  status,
  lastChange 
}: EnvironmentReportProps) => {
  const statusConfig = {
    excellent: { color: "bg-success/10 text-success border-success/20", text: "Excelente" },
    good: { color: "bg-primary/10 text-primary border-primary/20", text: "Bom" },
    attention: { color: "bg-warning/10 text-warning border-warning/20", text: "Atenção" },
    critical: { color: "bg-destructive/10 text-destructive border-destructive/20", text: "Crítico" },
  };

  const config = statusConfig[status];
  const successRate = ((successful / totalChanges) * 100).toFixed(1);

  return (
    <Card className="p-6 bg-card border-border hover:shadow-lg transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-foreground mb-1">{environment}</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>Última mudança: {lastChange}</span>
          </div>
        </div>
        <Badge className={`${config.color} border`}>
          {config.text}
        </Badge>
      </div>
      
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-3 pt-3 border-t border-border">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Total</p>
            <p className="text-2xl font-bold text-foreground">{totalChanges}</p>
          </div>
          <div>
            <div className="flex items-center gap-1 mb-1">
              <CheckCircle2 className="h-3 w-3 text-success" />
              <p className="text-xs text-muted-foreground">Sucesso</p>
            </div>
            <p className="text-2xl font-bold text-success">{successful}</p>
          </div>
          <div>
            <div className="flex items-center gap-1 mb-1">
              <XCircle className="h-3 w-3 text-destructive" />
              <p className="text-xs text-muted-foreground">Falhas</p>
            </div>
            <p className="text-2xl font-bold text-destructive">{failed}</p>
          </div>
        </div>
        
        <div className="pt-3 border-t border-border">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Taxa de Sucesso</span>
            <span className="text-lg font-bold text-primary">{successRate}%</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

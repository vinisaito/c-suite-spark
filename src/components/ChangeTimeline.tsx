import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Clock } from "lucide-react";

interface ChangeRequest {
  id: string;
  title: string;
  environment: string;
  status: "success" | "failed" | "pending";
  timestamp: string;
  duration: string;
  requester: string;
}

interface ChangeTimelineProps {
  changes: ChangeRequest[];
}

export const ChangeTimeline = ({ changes }: ChangeTimelineProps) => {
  const getEnvironmentColor = (env: string) => {
    switch (env) {
      case "Produção":
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "Homologação":
        return "bg-warning/10 text-warning border-warning/20";
      case "Desenvolvimento":
        return "bg-primary/10 text-primary border-primary/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <Card className="p-6 bg-card border-border">
      <div className="space-y-4">
        {changes.map((change, index) => (
          <div 
            key={change.id} 
            className="relative pl-8 pb-6 last:pb-0 border-l-2 border-border last:border-l-0"
          >
            {/* Timeline dot */}
            <div className="absolute left-0 top-0 -translate-x-[9px] w-4 h-4 rounded-full bg-background border-2 border-primary" />
            
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-start gap-3 mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-muted-foreground">{change.id}</span>
                      {change.status === "success" ? (
                        <CheckCircle2 className="h-4 w-4 text-success" />
                      ) : (
                        <XCircle className="h-4 w-4 text-destructive" />
                      )}
                    </div>
                    <h4 className="text-base font-semibold text-foreground mb-1">
                      {change.title}
                    </h4>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span>Por: {change.requester}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {change.duration}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 sm:flex-col sm:items-end">
                <Badge className={`${getEnvironmentColor(change.environment)} border text-xs`}>
                  {change.environment}
                </Badge>
                <span className="text-sm font-semibold text-foreground">{change.timestamp}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

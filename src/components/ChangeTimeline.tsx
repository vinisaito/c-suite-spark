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
    <Card className="p-8 bg-card border-border overflow-x-auto">
      <div className="relative min-w-max">
        {/* Horizontal line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />
        
        {/* Timeline items */}
        <div className="relative flex items-center justify-start gap-16 px-8">
          {changes.map((change, index) => {
            const isTop = index % 2 === 0;
            
            return (
              <div key={change.id} className="relative flex flex-col items-center w-64">
                {/* Card positioned above or below */}
                <div className={`${isTop ? 'order-1 mb-8' : 'order-3 mt-8'} w-full`}>
                  <Card className="p-4 bg-background border-border shadow-md hover:shadow-lg transition-all duration-300 animate-fade-in">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-muted-foreground">{change.id}</span>
                          {change.status === "success" ? (
                            <CheckCircle2 className="h-4 w-4 text-success" />
                          ) : (
                            <XCircle className="h-4 w-4 text-destructive" />
                          )}
                        </div>
                        <Badge className={`${getEnvironmentColor(change.environment)} border text-xs shrink-0`}>
                          {change.environment}
                        </Badge>
                      </div>
                      
                      <h4 className="text-sm font-semibold text-foreground leading-tight">
                        {change.title}
                      </h4>
                      
                      <div className="space-y-1 text-xs text-muted-foreground">
                        <div className="flex items-center justify-between">
                          <span>Por: {change.requester}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {change.duration}
                          </span>
                          <span className="font-semibold text-foreground">{change.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
                
                {/* Center dot on timeline */}
                <div className="order-2 w-5 h-5 rounded-full bg-primary border-4 border-background shadow-md z-10" />
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};

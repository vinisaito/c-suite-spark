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
      <div className="relative">
        {/* Snake path using SVG */}
        <svg className="absolute top-0 left-0 w-full h-full" style={{ zIndex: 0 }}>
          <path
            d={`M 80 120 ${changes.map((_, i) => {
              const x = 80 + (i * (100 / (changes.length - 1)) * 0.01 * (typeof window !== 'undefined' ? Math.min(window.innerWidth * 0.8, 1200) - 160 : 1040));
              const y = i % 2 === 0 ? 60 : 180;
              return `L ${x} ${y}`;
            }).join(' ')}`}
            stroke="hsl(var(--border))"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Timeline items */}
        <div className="relative grid gap-4" style={{ 
          gridTemplateColumns: `repeat(${changes.length}, 1fr)`,
          minHeight: '240px'
        }}>
          {changes.map((change, index) => {
            const isTop = index % 2 === 0;
            
            return (
              <div 
                key={change.id} 
                className={`flex flex-col items-center justify-center ${isTop ? 'pt-0 pb-24' : 'pt-24 pb-0'}`}
                style={{ zIndex: 10 }}
              >
                {/* Card */}
                <Card className={`p-3 bg-background border-border shadow-md hover:shadow-lg transition-all duration-300 animate-fade-in w-full ${isTop ? 'mb-2' : 'mt-2'}`}>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      {change.status === "success" ? (
                        <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                      ) : (
                        <XCircle className="h-4 w-4 text-destructive shrink-0" />
                      )}
                      <span className="text-xs font-mono text-muted-foreground truncate">{change.id}</span>
                    </div>
                    
                    <Badge className={`${getEnvironmentColor(change.environment)} border text-xs w-full justify-center`}>
                      {change.environment}
                    </Badge>
                    
                    <div className="text-xs font-semibold text-foreground text-center">
                      {change.timestamp}
                    </div>
                  </div>
                </Card>
                
                {/* Dot on timeline */}
                <div className={`w-4 h-4 rounded-full bg-primary border-4 border-background shadow-md ${isTop ? 'mt-auto' : 'mb-auto'}`} />
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};

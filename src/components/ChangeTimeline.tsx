import { CheckCircle2, XCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface Change {
  id: string;
  title: string;
  environment: "Produção" | "Homologação" | "Desenvolvimento";
  status: "success" | "failed" | "pending";
  timestamp: string;
}

interface ChangeTimelineProps {
  changes: Change[];
}

export const ChangeTimeline = ({ changes }: ChangeTimelineProps) => {
  const itemsPerRow = 6;
  const rows = Math.ceil(changes.length / itemsPerRow);

  const getStatusIcon = (status: Change["status"]) => {
    switch (status) {
      case "success":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "failed":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getEnvironmentColor = (env: Change["environment"]) => {
    switch (env) {
      case "Produção":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      case "Homologação":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "Desenvolvimento":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    }
  };

  return (
    <div className="w-full overflow-hidden py-8">
      <div className="relative" style={{ height: `${rows * 180}px` }}>
        {/* SVG for the snake path */}
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          
          {changes.map((_, index) => {
            if (index === changes.length - 1) return null;
            
            const currentRow = Math.floor(index / itemsPerRow);
            const currentCol = index % itemsPerRow;
            const nextRow = Math.floor((index + 1) / itemsPerRow);
            const nextCol = (index + 1) % itemsPerRow;
            
            const isLeftToRight = currentRow % 2 === 0;
            const itemWidth = 100 / itemsPerRow;
            
            const x1 = isLeftToRight ? (currentCol + 0.5) * itemWidth : (itemsPerRow - currentCol - 0.5) * itemWidth;
            const x2 = isLeftToRight ? (nextCol + 0.5) * itemWidth : (itemsPerRow - nextCol - 0.5) * itemWidth;
            const y1 = currentRow * 180 + 90;
            const y2 = nextRow * 180 + 90;
            
            // If moving to next row, create a curve
            if (currentRow !== nextRow) {
              const curveRadius = 40;
              const path = isLeftToRight
                ? `M ${x1}% ${y1} L ${100}% ${y1} Q ${100}% ${y1 + curveRadius}, ${100 - curveRadius * 0.5}% ${y1 + curveRadius} L ${x2}% ${y2}`
                : `M ${x1}% ${y1} L 0% ${y1} Q 0% ${y1 + curveRadius}, ${curveRadius * 0.5}% ${y1 + curveRadius} L ${x2}% ${y2}`;
              
              return (
                <path
                  key={index}
                  d={path}
                  stroke="url(#lineGradient)"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="8,4"
                />
              );
            } else {
              return (
                <line
                  key={index}
                  x1={`${x1}%`}
                  y1={y1}
                  x2={`${x2}%`}
                  y2={y2}
                  stroke="url(#lineGradient)"
                  strokeWidth="2"
                  strokeDasharray="8,4"
                />
              );
            }
          })}
        </svg>

        {/* Timeline items */}
        {changes.map((change, index) => {
          const row = Math.floor(index / itemsPerRow);
          const col = index % itemsPerRow;
          const isLeftToRight = row % 2 === 0;
          const actualCol = isLeftToRight ? col : itemsPerRow - col - 1;
          const itemWidth = 100 / itemsPerRow;
          
          return (
            <div
              key={change.id}
              className="absolute"
              style={{
                left: `${actualCol * itemWidth}%`,
                top: `${row * 180 + 90}px`,
                width: `${itemWidth}%`,
                transform: 'translateY(-50%)',
                zIndex: 10,
              }}
            >
              <div className="flex flex-col items-center px-2">
                {/* Card above the dot */}
                <Card className="w-full mb-2 p-3 bg-card/80 backdrop-blur border-border/50 hover:bg-card/90 transition-all hover:shadow-lg">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-foreground truncate">{change.id}</span>
                      {getStatusIcon(change.status)}
                    </div>
                    <Badge variant="outline" className={`text-xs ${getEnvironmentColor(change.environment)}`}>
                      {change.environment}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{change.timestamp}</span>
                  </div>
                </Card>
                
                {/* Dot on the line */}
                <div className="relative flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-primary border-4 border-background shadow-lg" />
                  <div className="absolute w-6 h-6 rounded-full bg-primary/20 animate-pulse" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

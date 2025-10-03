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
          
          {/* Draw continuous path through all points */}
          <path
            d={(() => {
              let pathData = '';
              changes.forEach((_, index) => {
                const row = Math.floor(index / itemsPerRow);
                const col = index % itemsPerRow;
                const isLeftToRight = row % 2 === 0;
                const itemWidth = 100 / itemsPerRow;
                
                const x = isLeftToRight ? (col + 0.5) * itemWidth : (itemsPerRow - col - 0.5) * itemWidth;
                const y = row * 180 + 90;
                
                if (index === 0) {
                  pathData = `M ${x}% ${y}`;
                } else {
                  const prevRow = Math.floor((index - 1) / itemsPerRow);
                  const prevCol = (index - 1) % itemsPerRow;
                  const prevIsLeftToRight = prevRow % 2 === 0;
                  
                  // Moving to next row
                  if (row !== prevRow) {
                    const curveRadius = 40;
                    if (prevIsLeftToRight) {
                      pathData += ` L 100% ${prevRow * 180 + 90} Q 100% ${prevRow * 180 + 90 + curveRadius}, ${100 - curveRadius * 0.5}% ${prevRow * 180 + 90 + curveRadius} L ${x}% ${y}`;
                    } else {
                      pathData += ` L 0% ${prevRow * 180 + 90} Q 0% ${prevRow * 180 + 90 + curveRadius}, ${curveRadius * 0.5}% ${prevRow * 180 + 90 + curveRadius} L ${x}% ${y}`;
                    }
                  } else {
                    pathData += ` L ${x}% ${y}`;
                  }
                }
              });
              return pathData;
            })()}
            stroke="hsl(var(--primary))"
            strokeWidth="3"
            fill="none"
          />
          
          {/* Draw circles on each point */}
          {changes.map((_, index) => {
            const row = Math.floor(index / itemsPerRow);
            const col = index % itemsPerRow;
            const isLeftToRight = row % 2 === 0;
            const itemWidth = 100 / itemsPerRow;
            
            const x = isLeftToRight ? (col + 0.5) * itemWidth : (itemsPerRow - col - 0.5) * itemWidth;
            const y = row * 180 + 90;
            
            return (
              <g key={index}>
                <circle cx={`${x}%`} cy={y} r="8" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="3" />
                <circle cx={`${x}%`} cy={y} r="4" fill="hsl(var(--primary))" />
              </g>
            );
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
                
                {/* Invisible placeholder to maintain spacing */}
                <div className="w-4 h-4" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

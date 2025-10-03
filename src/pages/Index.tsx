import { MetricCard } from "@/components/MetricCard";
import { AreaReport } from "@/components/AreaReport";
import { ChangeTimeline } from "@/components/ChangeTimeline";
import { TrendingUp, Users, DollarSign, Target, BarChart3, GitBranch, CheckCircle2, XCircle, Clock } from "lucide-react";

const Index = () => {
  const metrics = [
    {
      title: "Mudanças Executadas",
      value: "18",
      change: "Últimas 24 horas",
      trend: "up" as const,
      icon: GitBranch,
    },
    {
      title: "Taxa de Sucesso",
      value: "83.3%",
      change: "+5.2% vs período anterior",
      trend: "up" as const,
      icon: CheckCircle2,
    },
    {
      title: "Mudanças Falhadas",
      value: "3",
      change: "-1 vs período anterior",
      trend: "down" as const,
      icon: XCircle,
    },
    {
      title: "Tempo Médio",
      value: "12min",
      change: "-3min vs período anterior",
      trend: "down" as const,
      icon: Clock,
    },
  ];

  const changes = [
    { id: "CHG-001", title: "Deploy Frontend", environment: "Produção" as const, status: "success" as const, timestamp: "14:30" },
    { id: "CHG-002", title: "Update Database", environment: "Produção" as const, status: "success" as const, timestamp: "14:45" },
    { id: "CHG-003", title: "API Hotfix", environment: "Produção" as const, status: "failed" as const, timestamp: "15:20" },
    { id: "CHG-004", title: "Security Patch", environment: "Homologação" as const, status: "success" as const, timestamp: "16:00" },
    { id: "CHG-005", title: "New Feature", environment: "Homologação" as const, status: "success" as const, timestamp: "16:30" },
    { id: "CHG-006", title: "Bug Fix", environment: "Desenvolvimento" as const, status: "success" as const, timestamp: "17:00" },
    { id: "CHG-007", title: "Config Update", environment: "Desenvolvimento" as const, status: "success" as const, timestamp: "17:15" },
    { id: "CHG-008", title: "Library Update", environment: "Homologação" as const, status: "success" as const, timestamp: "18:00" },
    { id: "CHG-009", title: "Performance Fix", environment: "Produção" as const, status: "success" as const, timestamp: "18:30" },
    { id: "CHG-010", title: "UI Enhancement", environment: "Desenvolvimento" as const, status: "pending" as const, timestamp: "19:00" },
    { id: "CHG-011", title: "API Extension", environment: "Homologação" as const, status: "success" as const, timestamp: "19:30" },
    { id: "CHG-012", title: "Cache Update", environment: "Produção" as const, status: "failed" as const, timestamp: "20:00" },
    { id: "CHG-013", title: "Deploy Backend", environment: "Desenvolvimento" as const, status: "success" as const, timestamp: "20:30" },
    { id: "CHG-014", title: "Schema Update", environment: "Homologação" as const, status: "success" as const, timestamp: "21:00" },
    { id: "CHG-015", title: "Monitoring Fix", environment: "Produção" as const, status: "success" as const, timestamp: "21:30" },
    { id: "CHG-016", title: "Integration Test", environment: "Desenvolvimento" as const, status: "success" as const, timestamp: "22:00" },
    { id: "CHG-017", title: "Rollback Fix", environment: "Produção" as const, status: "failed" as const, timestamp: "22:30" },
    { id: "CHG-018", title: "Final Deploy", environment: "Homologação" as const, status: "success" as const, timestamp: "23:00" },
  ];

  const areaReports = [
    {
      area: "Porto Seguro",
      manager: "Ana Silva",
      performance: 92,
      revenue: "R$ 12.5M",
      status: "excellent" as const,
    },
    {
      area: "Porto Serviço",
      manager: "Carlos Oliveira",
      performance: 85,
      revenue: "R$ 10.8M",
      status: "good" as const,
    },
    {
      area: "Porto Bank",
      manager: "Mariana Costa",
      performance: 88,
      revenue: "R$ 15.2M",
      status: "excellent" as const,
    },
    {
      area: "Porto Saúde",
      manager: "Roberto Santos",
      performance: 72,
      revenue: "R$ 6.7M",
      status: "attention" as const,
    },
    {
      area: "Desenvolvimento Digital",
      manager: "Juliana Mendes",
      performance: 95,
      revenue: "R$ 8.4M",
      status: "excellent" as const,
    },
    {
      area: "Atendimento ao Cliente",
      manager: "Fernando Lima",
      performance: 68,
      revenue: "R$ 5.1M",
      status: "attention" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-secondary text-primary-foreground py-8 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="h-8 w-8" />
            <h1 className="text-3xl font-bold">Dashboard Executivo</h1>
          </div>
          <p className="text-primary-foreground/90">Mudanças de Ambiente - Últimas 24 Horas</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Metrics Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-6">Indicadores Principais</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <MetricCard key={index} {...metric} />
            ))}
          </div>
        </section>

        {/* Timeline Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-6">Timeline de Mudanças</h2>
          <div className="bg-card/50 rounded-lg border border-border p-6">
            <ChangeTimeline changes={changes} />
          </div>
        </section>

        {/* Area Reports Section */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Performance por Área</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {areaReports.map((report, index) => (
              <AreaReport key={index} {...report} />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-12 py-6 px-6 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">
          <p>Última atualização: {new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

import { MetricCard } from "@/components/MetricCard";
import { AreaReport } from "@/components/AreaReport";
import { TrendingUp, Users, DollarSign, Target, BarChart3 } from "lucide-react";

const Index = () => {
  const metrics = [
    {
      title: "Receita Total",
      value: "R$ 45.2M",
      change: "+12.5% vs mês anterior",
      trend: "up" as const,
      icon: DollarSign,
    },
    {
      title: "Clientes Ativos",
      value: "32.4K",
      change: "+8.2% vs mês anterior",
      trend: "up" as const,
      icon: Users,
    },
    {
      title: "Taxa de Conversão",
      value: "24.8%",
      change: "+2.1% vs mês anterior",
      trend: "up" as const,
      icon: Target,
    },
    {
      title: "Performance Geral",
      value: "87.3%",
      change: "-1.2% vs mês anterior",
      trend: "down" as const,
      icon: TrendingUp,
    },
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
          <p className="text-primary-foreground/90">Relatório de Performance das Áreas</p>
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

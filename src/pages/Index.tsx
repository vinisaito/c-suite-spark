import { MetricCard } from "@/components/MetricCard";
import { EnvironmentReport } from "@/components/EnvironmentReport";
import { ChangeTimeline } from "@/components/ChangeTimeline";
import { CheckCircle2, XCircle, Clock, GitBranch, BarChart3 } from "lucide-react";

const Index = () => {
  const metrics = [
    {
      title: "Mudanças Executadas",
      value: "47",
      change: "Últimas 24 horas",
      trend: "neutral" as const,
      icon: GitBranch,
    },
    {
      title: "Taxa de Sucesso",
      value: "89.4%",
      change: "+5.2% vs dia anterior",
      trend: "up" as const,
      icon: CheckCircle2,
    },
    {
      title: "Mudanças Falhas",
      value: "5",
      change: "3 em produção",
      trend: "down" as const,
      icon: XCircle,
    },
    {
      title: "Tempo Médio",
      value: "12min",
      change: "-3min vs média",
      trend: "up" as const,
      icon: Clock,
    },
  ];

  const environmentReports = [
    {
      environment: "Produção",
      totalChanges: 15,
      successful: 12,
      failed: 3,
      status: "attention" as const,
      lastChange: "14:32",
    },
    {
      environment: "Homologação",
      totalChanges: 18,
      successful: 18,
      failed: 0,
      status: "excellent" as const,
      lastChange: "15:45",
    },
    {
      environment: "Desenvolvimento",
      totalChanges: 14,
      successful: 12,
      failed: 2,
      status: "good" as const,
      lastChange: "16:20",
    },
  ];

  const changeRequests = [
    {
      id: "CR-2024-156",
      title: "Deploy API Gateway v2.3.1",
      environment: "Produção",
      status: "success" as const,
      timestamp: "16:20",
      duration: "8min",
      requester: "Ana Silva",
    },
    {
      id: "CR-2024-155",
      title: "Atualização certificados SSL",
      environment: "Produção",
      status: "success" as const,
      timestamp: "15:45",
      duration: "15min",
      requester: "Carlos Oliveira",
    },
    {
      id: "CR-2024-154",
      title: "Rollback versão frontend",
      environment: "Produção",
      status: "failed" as const,
      timestamp: "14:32",
      duration: "22min",
      requester: "Mariana Costa",
    },
    {
      id: "CR-2024-153",
      title: "Deploy microserviço pagamentos",
      environment: "Homologação",
      status: "success" as const,
      timestamp: "14:10",
      duration: "11min",
      requester: "Roberto Santos",
    },
    {
      id: "CR-2024-152",
      title: "Configuração load balancer",
      environment: "Produção",
      status: "success" as const,
      timestamp: "13:55",
      duration: "9min",
      requester: "Juliana Mendes",
    },
    {
      id: "CR-2024-151",
      title: "Patch segurança banco de dados",
      environment: "Desenvolvimento",
      status: "failed" as const,
      timestamp: "13:20",
      duration: "18min",
      requester: "Fernando Lima",
    },
    {
      id: "CR-2024-150",
      title: "Deploy portal cliente v3.0",
      environment: "Homologação",
      status: "success" as const,
      timestamp: "12:40",
      duration: "14min",
      requester: "Ana Silva",
    },
    {
      id: "CR-2024-149",
      title: "Integração API terceiros",
      environment: "Desenvolvimento",
      status: "success" as const,
      timestamp: "11:55",
      duration: "7min",
      requester: "Carlos Oliveira",
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

        {/* Environment Reports Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-6">Status dos Ambientes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {environmentReports.map((report, index) => (
              <EnvironmentReport key={index} {...report} />
            ))}
          </div>
        </section>

        {/* Timeline Section */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Timeline de Mudanças</h2>
          <ChangeTimeline changes={changeRequests} />
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

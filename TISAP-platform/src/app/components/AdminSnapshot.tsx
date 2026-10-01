import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import TISAPHeader from "./TISAPHeader";
import { useState } from "react";
import { 
  Shield,
  Users,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Download,
  Plus,
  Mail,
  Monitor,
  Globe,
  ChevronLeft,
  Calendar,
  Target,
  Award
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

interface AdminSnapshotProps {
  onBack: () => void;
}

type Role = 'employee' | 'hr' | 'admin';

export default function AdminSnapshot({ onBack }: AdminSnapshotProps) {
  const [currentRole, setCurrentRole] = useState<Role>('admin');
  
  const teamStats = {
    totalEmployees: 247,
    activeParticipants: 198,
    averageRiskScore: 76,
    riskTrend: "up",
    campaignsActive: 3,
    completionRate: 82
  };

  const departmentData = [
    { department: "Engineering", employees: 68, avgScore: 84, risk: "low", trend: "up" },
    { department: "Sales", employees: 45, avgScore: 72, risk: "medium", trend: "up" },
    { department: "Marketing", employees: 32, avgScore: 69, risk: "medium", trend: "down" },
    { department: "Finance", employees: 28, avgScore: 88, risk: "low", trend: "up" },
    { department: "HR", employees: 24, avgScore: 76, risk: "low", trend: "stable" },
    { department: "Operations", employees: 50, avgScore: 65, risk: "high", trend: "down" }
  ];

  const recentCampaigns = [
    { name: "Q4 Phishing Simulation", type: "Email", status: "Active", participants: 198, completion: 82 },
    { name: "Browser Security Training", type: "Browser", status: "Scheduled", participants: 0, completion: 0 },
    { name: "Ransomware Awareness", type: "Windows", status: "Completed", participants: 235, completion: 95 }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low": return "text-tisap-success";
      case "medium": return "text-tisap-warning";
      case "high": return "text-tisap-error";
      default: return "text-tisap-grey-600";
    }
  };

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "low": return "bg-tisap-success text-white";
      case "medium": return "bg-tisap-warning text-white";
      case "high": return "bg-tisap-error text-white";
      default: return "bg-tisap-grey-400 text-white";
    }
  };

  return (
    <div className="min-h-screen bg-background circuit-bg">
      {/* Header */}
      <TISAPHeader 
        title="Admin Dashboard" 
        showRoleSwitcher={true}
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
      />

      <main className="max-w-[1440px] mx-auto px-6 py-8">
        {/* Quick Actions Bar */}
        <div className="flex items-center justify-between mb-8 fade-in">
          <div>
            <h2 className="text-foreground mb-2">Organization Security Overview</h2>
            <p className="text-muted-foreground">Monitor and manage security training across all departments</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              variant="outline"
              className="border-border hover-glow"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button 
              className="bg-tisap-teal hover:bg-tisap-teal-dark text-white hover-glow"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Campaign
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 glass-panel hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer hover-glow slide-up">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-tisap-blue/10 dark:bg-tisap-blue/20 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-tisap-blue" />
              </div>
              <Badge className="bg-tisap-blue text-white">
                {Math.round((teamStats.activeParticipants / teamStats.totalEmployees) * 100)}%
              </Badge>
            </div>
            <h3 className="text-card-foreground mb-1">Total Employees</h3>
            <p className="text-3xl text-card-foreground mb-2">{teamStats.totalEmployees}</p>
            <p className="text-sm text-muted-foreground">
              {teamStats.activeParticipants} active participants
            </p>
          </Card>

          <Card className="p-6 glass-panel hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer hover-glow slide-up">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-tisap-teal/10 dark:bg-tisap-teal/20 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-tisap-teal" />
              </div>
              <div className="flex items-center gap-1 text-tisap-success">
                <TrendingUp className="w-4 h-4" />
                <span className="text-xs">+8%</span>
              </div>
            </div>
            <h3 className="text-card-foreground mb-1">Avg Risk Score</h3>
            <p className="text-3xl text-card-foreground mb-2">{teamStats.averageRiskScore}/100</p>
            <Progress value={teamStats.averageRiskScore} className="h-2" />
          </Card>

          <Card className="p-6 glass-panel hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer hover-glow slide-up">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-tisap-warning/10 dark:bg-tisap-warning/20 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-tisap-warning" />
              </div>
              <Badge className="bg-tisap-warning text-white">Active</Badge>
            </div>
            <h3 className="text-card-foreground mb-1">Active Campaigns</h3>
            <p className="text-3xl text-card-foreground mb-2">{teamStats.campaignsActive}</p>
            <p className="text-sm text-muted-foreground">2 scheduled</p>
          </Card>

          <Card className="p-6 glass-panel hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer hover-glow slide-up">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-tisap-success/10 dark:bg-tisap-success/20 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-tisap-success" />
              </div>
              <Badge className="bg-tisap-success text-white">Good</Badge>
            </div>
            <h3 className="text-card-foreground mb-1">Completion Rate</h3>
            <p className="text-3xl text-card-foreground mb-2">{teamStats.completionRate}%</p>
            <Progress value={teamStats.completionRate} className="h-2" />
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Department Risk Heatmap */}
          <Card className="p-6 glass-panel">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-card-foreground">Department Risk Summary</h3>
              <Button variant="ghost" className="text-tisap-teal hover:text-tisap-teal-dark">
                View Details
              </Button>
            </div>

            <div className="space-y-3">
              {departmentData.map((dept, index) => (
                <div 
                  key={index}
                  className="p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <h4 className="text-card-foreground">{dept.department}</h4>
                      <Badge className={getRiskBadge(dept.risk)}>
                        {dept.risk.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      {dept.trend === "up" && <TrendingUp className="w-4 h-4 text-tisap-success" />}
                      {dept.trend === "down" && <TrendingDown className="w-4 h-4 text-tisap-error" />}
                      <span className={getRiskColor(dept.risk)}>{dept.avgScore}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                    <span>{dept.employees} employees</span>
                  </div>
                  <Progress value={dept.avgScore} className="h-2" />
                </div>
              ))}
            </div>
          </Card>

          {/* Visual Heatmap */}
          <Card className="p-6 glass-panel">
            <h3 className="text-card-foreground mb-6">Threat Detection Heatmap</h3>
            
            <div className="grid grid-cols-7 gap-2 mb-4">
              {Array.from({ length: 35 }, (_, i) => {
                const value = Math.floor(Math.random() * 100);
                const intensity = 
                  value < 30 ? 'bg-tisap-success/20' :
                  value < 60 ? 'bg-tisap-warning/40' :
                  'bg-tisap-error/60';
                
                return (
                  <div
                    key={i}
                    className={`aspect-square rounded ${intensity} hover:ring-2 ring-tisap-teal transition-all cursor-pointer`}
                    title={`Day ${i + 1}: ${value} incidents`}
                  />
                );
              })}
            </div>

            <div className="flex items-center justify-between text-xs text-tisap-grey-500 mb-4">
              <span>5 weeks ago</span>
              <span>Today</span>
            </div>

            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-tisap-success/20 rounded"></div>
                <span className="text-tisap-grey-600">Low</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-tisap-warning/40 rounded"></div>
                <span className="text-tisap-grey-600">Medium</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-tisap-error/60 rounded"></div>
                <span className="text-tisap-grey-600">High</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Campaign Management */}
        <Card className="p-6 border-tisap-grey-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-tisap-grey-900">Campaign Management</h3>
            <Button className="bg-tisap-teal hover:bg-tisap-teal-dark text-white">
              <Plus className="w-4 h-4 mr-2" />
              New Campaign
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Participants</TableHead>
                <TableHead>Completion</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentCampaigns.map((campaign, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {campaign.type === "Email" && <Mail className="w-4 h-4 text-tisap-teal" />}
                      {campaign.type === "Browser" && <Globe className="w-4 h-4 text-tisap-warning" />}
                      {campaign.type === "Windows" && <Monitor className="w-4 h-4 text-tisap-blue" />}
                      <span className="text-tisap-grey-900">{campaign.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-tisap-grey-300">
                      {campaign.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={
                      campaign.status === "Active" ? "bg-tisap-success text-white" :
                      campaign.status === "Scheduled" ? "bg-tisap-blue text-white" :
                      "bg-tisap-grey-400 text-white"
                    }>
                      {campaign.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-tisap-grey-900">
                    {campaign.participants}/{teamStats.totalEmployees}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={campaign.completion} className="w-20 h-2" />
                      <span className="text-sm text-tisap-grey-600">{campaign.completion}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" className="h-8 text-tisap-teal hover:text-tisap-teal-dark">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <Card className="p-6 border-tisap-grey-200 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-tisap-teal/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Calendar className="w-6 h-6 text-tisap-teal" />
              </div>
              <div>
                <h4 className="text-tisap-grey-900 mb-1">Schedule Training</h4>
                <p className="text-sm text-tisap-grey-600">
                  Set up automated training campaigns for your team
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-tisap-grey-200 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-tisap-blue/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-tisap-blue" />
              </div>
              <div>
                <h4 className="text-tisap-grey-900 mb-1">Risk Assessment</h4>
                <p className="text-sm text-tisap-grey-600">
                  Review detailed risk analysis and recommendations
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-tisap-grey-200 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-tisap-warning/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Download className="w-6 h-6 text-tisap-warning" />
              </div>
              <div>
                <h4 className="text-tisap-grey-900 mb-1">Export Data</h4>
                <p className="text-sm text-tisap-grey-600">
                  Generate comprehensive reports and analytics
                </p>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
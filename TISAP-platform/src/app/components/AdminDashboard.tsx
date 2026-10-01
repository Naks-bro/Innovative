import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner@2.0.3";
import { 
  Shield, 
  Activity,
  Users,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Database,
  Server,
  Eye,
  Settings,
  Play,
  Pause,
  Terminal,
  FileText,
  BarChart3,
  PieChart,
  Mail,
  Globe,
  Lock,
  Unlock,
  CheckCircle,
  XCircle,
  Clock,
  Zap,
  Target,
  Flag,
  AlertCircle,
  Filter,
  Search,
  Download,
  RefreshCw,
  MoreVertical,
  Plus,
  Edit,
  Trash,
  Send,
  UserPlus,
  X
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RePieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

interface Simulation {
  id: number;
  name: string;
  type: string;
  targets: number;
  clicks: number;
  reports: number;
  status: "running" | "paused" | "completed";
}

interface Alert {
  id: number;
  type: "critical" | "high" | "medium" | "low";
  title: string;
  target: string;
  time: string;
  status: "active" | "investigating" | "resolved";
}

export default function AdminDashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState<"24h" | "7d" | "30d" | "90d">("7d");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [selectedSimulation, setSelectedSimulation] = useState<Simulation | null>(null);
  const [showNewCampaignDialog, setShowNewCampaignDialog] = useState(false);
  const [showUserManagementDialog, setShowUserManagementDialog] = useState(false);
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "resolved">("all");
  
  // Campaign form state
  const [newCampaign, setNewCampaign] = useState({
    name: "",
    type: "email",
    targets: "",
    description: ""
  });

  // Mock data
  const [simulations, setSimulations] = useState<Simulation[]>([
    { id: 1, name: "Q4 Phishing Campaign", type: "Email", targets: 245, clicks: 34, reports: 189, status: "running" },
    { id: 2, name: "USB Drop Test", type: "Physical", targets: 50, clicks: 12, reports: 28, status: "running" },
    { id: 3, name: "Browser Security Check", type: "Web", targets: 180, clicks: 45, reports: 98, status: "paused" }
  ]);

  const [alerts, setAlerts] = useState<Alert[]>([
    { id: 1, type: "critical", title: "Phishing Campaign Detected", target: "Finance Dept.", time: "2 min ago", status: "active" },
    { id: 2, type: "high", title: "Suspicious Login Attempt", target: "Admin Panel", time: "15 min ago", status: "investigating" },
    { id: 3, type: "medium", title: "Malware Quarantined", target: "HR - Desktop 12", time: "1 hr ago", status: "resolved" },
    { id: 4, type: "low", title: "Policy Violation", target: "Sales Team", time: "3 hrs ago", status: "resolved" }
  ]);

  const [systemStatus, setSystemStatus] = useState({
    apiGateway: "operational" as const,
    database: "operational" as const,
    securityEngine: "operational" as const,
    monitoring: "degraded" as const
  });

  const threatData = [
    { date: "Mon", phishing: 45, malware: 12, ransomware: 3, social: 28 },
    { date: "Tue", phishing: 52, malware: 18, ransomware: 5, social: 34 },
    { date: "Wed", phishing: 38, malware: 15, ransomware: 2, social: 25 },
    { date: "Thu", phishing: 61, malware: 22, ransomware: 7, social: 42 },
    { date: "Fri", phishing: 55, malware: 19, ransomware: 4, social: 38 },
    { date: "Sat", phishing: 28, malware: 8, ransomware: 1, social: 18 },
    { date: "Sun", phishing: 31, malware: 10, ransomware: 2, social: 20 }
  ];

  const responseTimeData = [
    { hour: "00:00", time: 12 },
    { hour: "04:00", time: 8 },
    { hour: "08:00", time: 45 },
    { hour: "12:00", time: 62 },
    { hour: "16:00", time: 38 },
    { hour: "20:00", time: 22 }
  ];

  const riskDistribution = [
    { name: "Critical", value: 12, color: "#ef4444" },
    { name: "High", value: 34, color: "#f97316" },
    { name: "Medium", value: 58, color: "#f59e0b" },
    { name: "Low", value: 96, color: "#84cc16" }
  ];

  // Interactive functions
  const handleToggleSimulation = (id: number) => {
    setSimulations(sims => sims.map(sim => 
      sim.id === id 
        ? { ...sim, status: sim.status === "running" ? "paused" : "running" }
        : sim
    ));
    const sim = simulations.find(s => s.id === id);
    toast.success(`Campaign ${sim?.status === "running" ? "paused" : "resumed"}: ${sim?.name}`);
  };

  const handleDeleteSimulation = (id: number) => {
    const sim = simulations.find(s => s.id === id);
    setSimulations(sims => sims.filter(s => s.id !== id));
    toast.success(`Campaign deleted: ${sim?.name}`);
  };

  const handleResolveAlert = (id: number) => {
    setAlerts(alerts => alerts.map(alert => 
      alert.id === id ? { ...alert, status: "resolved" } : alert
    ));
    toast.success("Alert marked as resolved");
  };

  const handleCreateCampaign = () => {
    if (!newCampaign.name || !newCampaign.targets) {
      toast.error("Please fill in all required fields");
      return;
    }

    const campaign: Simulation = {
      id: simulations.length + 1,
      name: newCampaign.name,
      type: newCampaign.type.charAt(0).toUpperCase() + newCampaign.type.slice(1),
      targets: parseInt(newCampaign.targets),
      clicks: 0,
      reports: 0,
      status: "running"
    };

    setSimulations([campaign, ...simulations]);
    setNewCampaign({ name: "", type: "email", targets: "", description: "" });
    setShowNewCampaignDialog(false);
    toast.success(`Campaign created: ${campaign.name}`);
  };

  const handleRunSecurityScan = () => {
    toast.loading("Running security scan...");
    setTimeout(() => {
      toast.success("Security scan completed! No threats detected.");
    }, 2000);
  };

  const handleExportReport = () => {
    toast.loading("Generating report...");
    setTimeout(() => {
      toast.success("Report exported successfully!");
    }, 1500);
  };

  const handleRefreshData = () => {
    toast.loading("Refreshing data...");
    setTimeout(() => {
      toast.success("Data updated!");
    }, 1000);
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         alert.target.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || alert.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const activeThreats = alerts.filter(a => a.status === "active").length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin / SOC Dashboard</h1>
          <p className="text-slate-400">Complete platform oversight and management</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-2 bg-slate-800/50 rounded-lg p-1 border border-slate-700">
            {["24h", "7d", "30d", "90d"].map((period) => (
              <Button
                key={period}
                onClick={() => setSelectedTimeframe(period as any)}
                variant={selectedTimeframe === period ? "default" : "ghost"}
                size="sm"
                className={selectedTimeframe === period ? "bg-purple-600 hover:bg-purple-700" : ""}
              >
                {period}
              </Button>
            ))}
          </div>
          <Button onClick={handleRefreshData} variant="outline" className="border-slate-700">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={handleExportReport} className="bg-purple-600 hover:bg-purple-700">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Active Threats"
          value={activeThreats.toString()}
          change="-23%"
          trend="down"
          icon={<AlertTriangle className="w-5 h-5" />}
          color="red"
          onClick={() => setFilterStatus("active")}
        />
        <MetricCard
          title="Users Monitored"
          value="1,247"
          change="+12%"
          trend="up"
          icon={<Users className="w-5 h-5" />}
          color="blue"
          onClick={() => setShowUserManagementDialog(true)}
        />
        <MetricCard
          title="Simulations Running"
          value={simulations.filter(s => s.status === "running").length.toString()}
          change="0%"
          trend="same"
          icon={<Target className="w-5 h-5" />}
          color="purple"
          onClick={() => {}}
        />
        <MetricCard
          title="Avg Response Time"
          value="8.2m"
          change="-15%"
          trend="down"
          icon={<Clock className="w-5 h-5" />}
          color="green"
          onClick={() => {}}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* Threat Analytics Chart */}
          <Card className="bg-slate-900/50 border-purple-500/20 backdrop-blur-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-white">Threat Analytics</h3>
                <p className="text-sm text-slate-400">Attack patterns over time</p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  <Filter className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={handleRefreshData}>
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={threatData}>
                <defs>
                  <linearGradient id="colorPhishing" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorMalware" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorRansomware" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSocial" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: '1px solid #475569',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Area type="monotone" dataKey="phishing" stackId="1" stroke="#ef4444" fill="url(#colorPhishing)" />
                <Area type="monotone" dataKey="malware" stackId="1" stroke="#f97316" fill="url(#colorMalware)" />
                <Area type="monotone" dataKey="ransomware" stackId="1" stroke="#a855f7" fill="url(#colorRansomware)" />
                <Area type="monotone" dataKey="social" stackId="1" stroke="#3b82f6" fill="url(#colorSocial)" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          {/* Active Simulations */}
          <Card className="bg-slate-900/50 border-purple-500/20 backdrop-blur-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-white">Active Simulations</h3>
                <p className="text-sm text-slate-400">Campaign monitoring & control</p>
              </div>
              <Dialog open={showNewCampaignDialog} onOpenChange={setShowNewCampaignDialog}>
                <DialogTrigger asChild>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Plus className="w-4 h-4 mr-2" />
                    New Campaign
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-slate-900 border-purple-500/30">
                  <DialogHeader>
                    <DialogTitle className="text-white">Create New Campaign</DialogTitle>
                    <DialogDescription className="text-slate-400">
                      Set up a new security awareness simulation campaign
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div>
                      <Label className="text-slate-300">Campaign Name *</Label>
                      <Input
                        placeholder="Q1 Phishing Test"
                        value={newCampaign.name}
                        onChange={(e) => setNewCampaign({...newCampaign, name: e.target.value})}
                        className="bg-slate-800 border-slate-700 text-white mt-2"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-300">Type *</Label>
                      <Select value={newCampaign.type} onValueChange={(v) => setNewCampaign({...newCampaign, type: v})}>
                        <SelectTrigger className="bg-slate-800 border-slate-700 text-white mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          <SelectItem value="email">Email Phishing</SelectItem>
                          <SelectItem value="physical">Physical Security</SelectItem>
                          <SelectItem value="web">Web Browser</SelectItem>
                          <SelectItem value="social">Social Engineering</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-slate-300">Target Users *</Label>
                      <Input
                        type="number"
                        placeholder="100"
                        value={newCampaign.targets}
                        onChange={(e) => setNewCampaign({...newCampaign, targets: e.target.value})}
                        className="bg-slate-800 border-slate-700 text-white mt-2"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-300">Description</Label>
                      <Textarea
                        placeholder="Campaign objectives and details..."
                        value={newCampaign.description}
                        onChange={(e) => setNewCampaign({...newCampaign, description: e.target.value})}
                        className="bg-slate-800 border-slate-700 text-white mt-2"
                        rows={3}
                      />
                    </div>
                    <div className="flex gap-3 pt-4">
                      <Button onClick={handleCreateCampaign} className="flex-1 bg-purple-600 hover:bg-purple-700">
                        <Play className="w-4 h-4 mr-2" />
                        Launch Campaign
                      </Button>
                      <Button onClick={() => setShowNewCampaignDialog(false)} variant="outline" className="border-slate-700">
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="space-y-3">
              {simulations.map((sim) => (
                <motion.div
                  key={sim.id}
                  whileHover={{ scale: 1.01, x: 5 }}
                  className="p-4 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-purple-500/50 transition-all cursor-pointer"
                  onClick={() => setSelectedSimulation(sim)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-purple-600/20 border border-purple-500/30 flex items-center justify-center">
                        <Mail className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{sim.name}</h4>
                        <p className="text-sm text-slate-400">{sim.type} Simulation</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={sim.status === "running" ? "bg-green-600" : sim.status === "paused" ? "bg-yellow-600" : "bg-slate-600"}>
                        {sim.status}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleSimulation(sim.id);
                        }}
                      >
                        {sim.status === "running" ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteSimulation(sim.id);
                        }}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-xs text-slate-400 mb-1">Targets</div>
                      <div className="font-semibold text-white">{sim.targets}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 mb-1">Clicked</div>
                      <div className="font-semibold text-red-400">{sim.clicks}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 mb-1">Reported</div>
                      <div className="font-semibold text-green-400">{sim.reports}</div>
                    </div>
                  </div>
                  <Progress 
                    value={(sim.reports / sim.targets) * 100} 
                    className="mt-3 h-2"
                  />
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Response Time Trend */}
          <Card className="bg-slate-900/50 border-purple-500/20 backdrop-blur-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-white">Response Time Trend</h3>
                <p className="text-sm text-slate-400">Average incident response metrics</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={responseTimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="hour" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: '1px solid #475569',
                    borderRadius: '8px'
                  }}
                />
                <Line type="monotone" dataKey="time" stroke="#a855f7" strokeWidth={3} dot={{ fill: '#a855f7', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Right Column - 1/3 width */}
        <div className="space-y-6">
          {/* Risk Distribution */}
          <Card className="bg-slate-900/50 border-purple-500/20 backdrop-blur-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Risk Distribution</h3>
            <ResponsiveContainer width="100%" height={200}>
              <RePieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RePieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {riskDistribution.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-slate-300">{item.name}</span>
                  </div>
                  <span className="font-semibold text-white">{item.value}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Alerts */}
          <Card className="bg-slate-900/50 border-purple-500/20 backdrop-blur-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Recent Alerts</h3>
              <div className="flex gap-2">
                <Select value={filterStatus} onValueChange={(v: any) => setFilterStatus(v)}>
                  <SelectTrigger className="w-[120px] h-8 bg-slate-800 border-slate-700 text-white text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mb-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search alerts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-slate-800 border-slate-700 text-white text-sm h-9"
                />
              </div>
            </div>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredAlerts.map((alert) => (
                <motion.div
                  key={alert.id}
                  whileHover={{ scale: 1.02, x: 3 }}
                  className="p-3 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-purple-500/50 transition-all cursor-pointer"
                  onClick={() => setSelectedAlert(alert)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-1.5 ${
                      alert.type === "critical" ? "bg-red-500" :
                      alert.type === "high" ? "bg-orange-500" :
                      alert.type === "medium" ? "bg-yellow-500" :
                      "bg-blue-500"
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{alert.title}</p>
                      <p className="text-xs text-slate-400 mt-1">{alert.target}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-slate-500">{alert.time}</span>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            alert.status === "active" ? "border-red-500 text-red-400" :
                            alert.status === "investigating" ? "border-yellow-500 text-yellow-400" :
                            "border-green-500 text-green-400"
                          }`}
                        >
                          {alert.status}
                        </Badge>
                      </div>
                      {alert.status !== "resolved" && (
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleResolveAlert(alert.id);
                          }}
                          className="mt-2 h-7 text-xs bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Resolve
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* System Status */}
          <Card className="bg-slate-900/50 border-purple-500/20 backdrop-blur-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">System Status</h3>
            <div className="space-y-3">
              <StatusItem 
                icon={<Server />} 
                label="API Gateway" 
                status={systemStatus.apiGateway}
                onToggle={() => setSystemStatus({...systemStatus, apiGateway: systemStatus.apiGateway === "operational" ? "down" : "operational"})}
              />
              <StatusItem 
                icon={<Database />} 
                label="Database" 
                status={systemStatus.database}
                onToggle={() => setSystemStatus({...systemStatus, database: systemStatus.database === "operational" ? "down" : "operational"})}
              />
              <StatusItem 
                icon={<Shield />} 
                label="Security Engine" 
                status={systemStatus.securityEngine}
                onToggle={() => setSystemStatus({...systemStatus, securityEngine: systemStatus.securityEngine === "operational" ? "down" : "operational"})}
              />
              <StatusItem 
                icon={<Activity />} 
                label="Monitoring" 
                status={systemStatus.monitoring}
                onToggle={() => setSystemStatus({...systemStatus, monitoring: systemStatus.monitoring === "operational" ? "degraded" : "operational"})}
              />
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-slate-900/50 border-purple-500/20 backdrop-blur-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Button 
                onClick={handleRunSecurityScan}
                className="w-full justify-start bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30"
              >
                <Terminal className="w-4 h-4 mr-2" />
                Run Security Scan
              </Button>
              <Button 
                onClick={handleExportReport}
                className="w-full justify-start bg-slate-800 hover:bg-slate-700"
              >
                <FileText className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full justify-start bg-slate-800 hover:bg-slate-700">
                    <Settings className="w-4 h-4 mr-2" />
                    Configure Alerts
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-slate-900 border-purple-500/30">
                  <DialogHeader>
                    <DialogTitle className="text-white">Alert Configuration</DialogTitle>
                    <DialogDescription className="text-slate-400">
                      Customize alert thresholds and notifications
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div>
                      <Label className="text-slate-300">Critical Threat Threshold</Label>
                      <Input type="number" defaultValue="10" className="bg-slate-800 border-slate-700 text-white mt-2" />
                    </div>
                    <div>
                      <Label className="text-slate-300">Email Notifications</Label>
                      <Input placeholder="admin@company.com" className="bg-slate-800 border-slate-700 text-white mt-2" />
                    </div>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      Save Configuration
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Dialog open={showUserManagementDialog} onOpenChange={setShowUserManagementDialog}>
                <DialogTrigger asChild>
                  <Button className="w-full justify-start bg-slate-800 hover:bg-slate-700">
                    <Users className="w-4 h-4 mr-2" />
                    Manage Users
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-slate-900 border-purple-500/30 max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-white">User Management</DialogTitle>
                    <DialogDescription className="text-slate-400">
                      Add, edit, or remove platform users
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div className="flex gap-2">
                      <Input placeholder="Search users..." className="bg-slate-800 border-slate-700 text-white" />
                      <Button className="bg-purple-600 hover:bg-purple-700">
                        <UserPlus className="w-4 h-4 mr-2" />
                        Add User
                      </Button>
                    </div>
                    <div className="text-sm text-slate-400">
                      Total Users: 1,247 | Active: 1,189 | Inactive: 58
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </Card>
        </div>
      </div>

      {/* Alert Detail Modal */}
      <Dialog open={!!selectedAlert} onOpenChange={() => setSelectedAlert(null)}>
        <DialogContent className="bg-slate-900 border-purple-500/30">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              Alert Details
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Review and take action on this security alert
            </DialogDescription>
          </DialogHeader>
          {selectedAlert && (
            <div className="space-y-4 mt-4">
              <div>
                <Label className="text-slate-400 text-xs">Title</Label>
                <p className="text-white font-medium">{selectedAlert.title}</p>
              </div>
              <div>
                <Label className="text-slate-400 text-xs">Target</Label>
                <p className="text-white">{selectedAlert.target}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-400 text-xs">Severity</Label>
                  <Badge className={`mt-1 ${
                    selectedAlert.type === "critical" ? "bg-red-600" :
                    selectedAlert.type === "high" ? "bg-orange-600" :
                    selectedAlert.type === "medium" ? "bg-yellow-600" :
                    "bg-blue-600"
                  }`}>
                    {selectedAlert.type.toUpperCase()}
                  </Badge>
                </div>
                <div>
                  <Label className="text-slate-400 text-xs">Time</Label>
                  <p className="text-white">{selectedAlert.time}</p>
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <Button 
                  onClick={() => {
                    handleResolveAlert(selectedAlert.id);
                    setSelectedAlert(null);
                  }}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Resolve
                </Button>
                <Button onClick={() => setSelectedAlert(null)} variant="outline" className="border-slate-700">
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Simulation Detail Modal */}
      <Dialog open={!!selectedSimulation} onOpenChange={() => setSelectedSimulation(null)}>
        <DialogContent className="bg-slate-900 border-purple-500/30">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-400" />
              Campaign Details
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Detailed metrics and controls for this campaign
            </DialogDescription>
          </DialogHeader>
          {selectedSimulation && (
            <div className="space-y-4 mt-4">
              <div>
                <Label className="text-slate-400 text-xs">Campaign Name</Label>
                <p className="text-white font-medium text-lg">{selectedSimulation.name}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-400 text-xs">Type</Label>
                  <p className="text-white">{selectedSimulation.type}</p>
                </div>
                <div>
                  <Label className="text-slate-400 text-xs">Status</Label>
                  <Badge className={selectedSimulation.status === "running" ? "bg-green-600" : "bg-yellow-600"}>
                    {selectedSimulation.status}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-slate-800/50 rounded-lg">
                  <div className="text-2xl font-bold text-white">{selectedSimulation.targets}</div>
                  <div className="text-xs text-slate-400">Targets</div>
                </div>
                <div className="text-center p-3 bg-slate-800/50 rounded-lg">
                  <div className="text-2xl font-bold text-red-400">{selectedSimulation.clicks}</div>
                  <div className="text-xs text-slate-400">Clicked</div>
                </div>
                <div className="text-center p-3 bg-slate-800/50 rounded-lg">
                  <div className="text-2xl font-bold text-green-400">{selectedSimulation.reports}</div>
                  <div className="text-xs text-slate-400">Reported</div>
                </div>
              </div>
              <div>
                <Label className="text-slate-400 text-xs mb-2 block">Success Rate</Label>
                <Progress value={(selectedSimulation.reports / selectedSimulation.targets) * 100} className="h-3" />
                <p className="text-xs text-slate-400 mt-1">{Math.round((selectedSimulation.reports / selectedSimulation.targets) * 100)}% of users correctly identified the threat</p>
              </div>
              <div className="flex gap-3 pt-4">
                <Button 
                  onClick={() => {
                    handleToggleSimulation(selectedSimulation.id);
                    setSelectedSimulation(null);
                  }}
                  className="flex-1 bg-purple-600 hover:bg-purple-700"
                >
                  {selectedSimulation.status === "running" ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                  {selectedSimulation.status === "running" ? "Pause" : "Resume"}
                </Button>
                <Button 
                  onClick={() => {
                    handleDeleteSimulation(selectedSimulation.id);
                    setSelectedSimulation(null);
                  }}
                  variant="outline" 
                  className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                >
                  <Trash className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}

function MetricCard({ 
  title, 
  value, 
  change, 
  trend, 
  icon, 
  color,
  onClick
}: { 
  title: string; 
  value: string; 
  change: string; 
  trend: "up" | "down" | "same"; 
  icon: React.ReactNode; 
  color: string;
  onClick: () => void;
}) {
  const colorClasses = {
    red: "from-red-600/20 to-red-900/20 border-red-500/30",
    blue: "from-blue-600/20 to-blue-900/20 border-blue-500/30",
    purple: "from-purple-600/20 to-purple-900/20 border-purple-500/30",
    green: "from-green-600/20 to-green-900/20 border-green-500/30"
  };

  const iconColorClasses = {
    red: "bg-red-600/20 border-red-500/30 text-red-400",
    blue: "bg-blue-600/20 border-blue-500/30 text-blue-400",
    purple: "bg-purple-600/20 border-purple-500/30 text-purple-400",
    green: "bg-green-600/20 border-green-500/30 text-green-400"
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="relative cursor-pointer"
      onClick={onClick}
    >
      <Card className={`bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} backdrop-blur-xl border p-6 overflow-hidden`}>
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 rounded-xl ${iconColorClasses[color as keyof typeof iconColorClasses]} border flex items-center justify-center`}>
            {icon}
          </div>
          <div className="flex items-center gap-1 text-sm">
            {trend === "up" && <TrendingUp className="w-4 h-4 text-green-400" />}
            {trend === "down" && <TrendingDown className="w-4 h-4 text-green-400" />}
            <span className={trend === "down" ? "text-green-400" : trend === "up" ? "text-red-400" : "text-slate-400"}>
              {change}
            </span>
          </div>
        </div>
        <h3 className="text-3xl font-bold text-white mb-1">{value}</h3>
        <p className="text-sm text-slate-400">{title}</p>
      </Card>
    </motion.div>
  );
}

function StatusItem({ 
  icon, 
  label, 
  status,
  onToggle
}: { 
  icon: React.ReactNode; 
  label: string; 
  status: "operational" | "degraded" | "down";
  onToggle: () => void;
}) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg cursor-pointer"
      onClick={onToggle}
    >
      <div className="flex items-center gap-3">
        <div className="text-slate-400">
          {icon}
        </div>
        <span className="text-sm text-white">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {status === "operational" && <CheckCircle className="w-4 h-4 text-green-400" />}
        {status === "degraded" && <AlertCircle className="w-4 h-4 text-yellow-400" />}
        {status === "down" && <XCircle className="w-4 h-4 text-red-400" />}
        <span className={`text-xs ${
          status === "operational" ? "text-green-400" :
          status === "degraded" ? "text-yellow-400" :
          "text-red-400"
        }`}>
          {status}
        </span>
      </div>
    </motion.div>
  );
}

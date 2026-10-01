import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Avatar, AvatarFallback } from "./ui/avatar";
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
  Users,
  TrendingUp,
  TrendingDown,
  BookOpen,
  Award,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  BarChart3,
  PieChart,
  Filter,
  Search,
  Download,
  Calendar,
  Mail,
  Bell,
  FileText,
  Send,
  Eye,
  UserCheck,
  UserX,
  Briefcase,
  Shield,
  Zap,
  Trophy,
  ChevronRight,
  MoreVertical,
  Plus,
  X,
  Edit,
  UserPlus,
  Trash2,
  Copy,
  RefreshCw
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
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

interface Employee {
  name: string;
  avatar: string;
  department: string;
  score: number;
  modules: number;
  trend: "up" | "down" | "same";
  lastActivity?: string;
  issues?: number;
}

interface TrainingSession {
  id: number;
  title: string;
  scheduled: string;
  enrolled: number;
  capacity: number;
  status: "open" | "full" | "completed";
}

export default function HRDashboard() {
  const [selectedDepartment, setSelectedDepartment] = useState<"all" | "sales" | "engineering" | "finance" | "hr">("all");
  const [selectedTimeframe, setSelectedTimeframe] = useState<"week" | "month" | "quarter">("month");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [showTrainingDialog, setShowTrainingDialog] = useState(false);
  const [showReminderDialog, setShowReminderDialog] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);

  const [newTraining, setNewTraining] = useState({
    title: "",
    date: "",
    capacity: "",
    description: ""
  });

  // Mock data
  const [departmentData, setDepartmentData] = useState([
    { name: "Sales", completion: 87, avgScore: 82, atRisk: 3, employees: 45 },
    { name: "Engineering", completion: 94, avgScore: 91, atRisk: 1, employees: 62 },
    { name: "Finance", completion: 78, avgScore: 76, atRisk: 5, employees: 28 },
    { name: "HR", completion: 96, avgScore: 93, atRisk: 0, employees: 15 },
    { name: "Marketing", completion: 85, avgScore: 84, atRisk: 2, employees: 38 }
  ]);

  const trainingProgress = [
    { week: "W1", completed: 45, assigned: 60 },
    { week: "W2", completed: 52, assigned: 60 },
    { week: "W3", completed: 58, assigned: 65 },
    { week: "W4", completed: 61, assigned: 65 }
  ];

  const riskLevelData = [
    { name: "Low Risk", value: 156, color: "#84cc16" },
    { name: "Medium Risk", value: 68, color: "#f59e0b" },
    { name: "High Risk", value: 18, color: "#f97316" },
    { name: "Critical", value: 5, color: "#ef4444" }
  ];

  const [topPerformers, setTopPerformers] = useState<Employee[]>([
    { name: "Sarah Chen", avatar: "SC", department: "Engineering", score: 98, modules: 12, trend: "up" },
    { name: "Alex Morgan", avatar: "AM", department: "Sales", score: 95, modules: 11, trend: "up" },
    { name: "Emily Rodriguez", avatar: "ER", department: "Finance", score: 94, modules: 10, trend: "same" },
    { name: "David Kim", avatar: "DK", department: "HR", score: 92, modules: 12, trend: "up" },
    { name: "Marcus Johnson", avatar: "MJ", department: "Marketing", score: 90, modules: 9, trend: "down" }
  ]);

  const [atRiskEmployees, setAtRiskEmployees] = useState<Employee[]>([
    { name: "John Doe", avatar: "JD", department: "Finance", score: 42, modules: 2, lastActivity: "5 days ago", issues: 3, trend: "down" },
    { name: "Jane Smith", avatar: "JS", department: "Sales", score: 38, modules: 1, lastActivity: "1 week ago", issues: 5, trend: "down" },
    { name: "Bob Wilson", avatar: "BW", department: "Finance", score: 35, modules: 2, lastActivity: "2 weeks ago", issues: 4, trend: "down" }
  ]);

  const [trainingSessions, setTrainingSessions] = useState<TrainingSession[]>([
    { id: 1, title: "Advanced Phishing Detection", scheduled: "Nov 15, 2024", enrolled: 45, capacity: 50, status: "open" },
    { id: 2, title: "Password Security Best Practices", scheduled: "Nov 18, 2024", enrolled: 50, capacity: 50, status: "full" },
    { id: 3, title: "Social Engineering Awareness", scheduled: "Nov 22, 2024", enrolled: 28, capacity: 40, status: "open" }
  ]);

  // Filter data based on department
  const filteredDepartmentData = selectedDepartment === "all" 
    ? departmentData 
    : departmentData.filter(d => d.name.toLowerCase() === selectedDepartment);

  const filteredTopPerformers = selectedDepartment === "all"
    ? topPerformers
    : topPerformers.filter(p => p.department.toLowerCase() === selectedDepartment);

  const filteredAtRisk = selectedDepartment === "all"
    ? atRiskEmployees
    : atRiskEmployees.filter(e => e.department.toLowerCase() === selectedDepartment);

  // Interactive functions
  const handleSendReminder = () => {
    toast.loading("Sending reminders...");
    setTimeout(() => {
      toast.success(`Reminders sent to ${atRiskEmployees.length} employees`);
      setShowReminderDialog(false);
    }, 1500);
  };

  const handleAssignTraining = (employee: Employee) => {
    toast.success(`Training assigned to ${employee.name}`);
  };

  const handleCreateTraining = () => {
    if (!newTraining.title || !newTraining.date || !newTraining.capacity) {
      toast.error("Please fill in all required fields");
      return;
    }

    const session: TrainingSession = {
      id: trainingSessions.length + 1,
      title: newTraining.title,
      scheduled: newTraining.date,
      enrolled: 0,
      capacity: parseInt(newTraining.capacity),
      status: "open"
    };

    setTrainingSessions([...trainingSessions, session]);
    setNewTraining({ title: "", date: "", capacity: "", description: "" });
    setShowTrainingDialog(false);
    toast.success(`Training session created: ${session.title}`);
  };

  const handleEnrollUser = (sessionId: number) => {
    setTrainingSessions(sessions => sessions.map(s => 
      s.id === sessionId && s.enrolled < s.capacity
        ? { ...s, enrolled: s.enrolled + 1, status: s.enrolled + 1 >= s.capacity ? "full" : "open" }
        : s
    ));
    toast.success("User enrolled successfully");
  };

  const handleDeleteTraining = (sessionId: number) => {
    const session = trainingSessions.find(s => s.id === sessionId);
    setTrainingSessions(sessions => sessions.filter(s => s.id !== sessionId));
    toast.success(`Training session deleted: ${session?.title}`);
  };

  const handleDuplicateTraining = (sessionId: number) => {
    const session = trainingSessions.find(s => s.id === sessionId);
    if (session) {
      const newSession: TrainingSession = {
        id: Math.max(...trainingSessions.map(s => s.id)) + 1,
        title: `${session.title} (Copy)`,
        scheduled: session.scheduled,
        enrolled: 0,
        capacity: session.capacity,
        status: "open"
      };
      setTrainingSessions([...trainingSessions, newSession]);
      toast.success(`Training session duplicated: ${newSession.title}`);
    }
  };

  const handleEditTraining = (training: TrainingSession) => {
    setNewTraining({
      title: training.title,
      date: training.scheduled,
      capacity: training.capacity.toString(),
      description: ""
    });
    // First delete the old one
    setTrainingSessions(sessions => sessions.filter(s => s.id !== training.id));
    // Open dialog to edit
    setShowTrainingDialog(true);
    toast.info("Editing training session");
  };

  const handleExportData = () => {
    toast.loading("Generating report...");
    setTimeout(() => {
      toast.success("HR report exported successfully!");
      setShowReportDialog(true);
    }, 1500);
  };

  const handleSendAnnouncement = () => {
    toast.loading("Sending announcement...");
    setTimeout(() => {
      toast.success("Announcement sent to all employees");
    }, 1000);
  };

  const totalEmployees = departmentData.reduce((sum, dept) => sum + dept.employees, 0);
  const avgCompletion = Math.round(departmentData.reduce((sum, dept) => sum + dept.completion, 0) / departmentData.length);
  const totalAtRisk = departmentData.reduce((sum, dept) => sum + dept.atRisk, 0);
  const avgScore = Math.round(departmentData.reduce((sum, dept) => sum + dept.avgScore, 0) / departmentData.length);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">HR / Monitoring Dashboard</h1>
          <p className="text-slate-400">Employee oversight and training management</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-2 bg-slate-800/50 rounded-lg p-1 border border-slate-700">
            {["week", "month", "quarter"].map((period) => (
              <Button
                key={period}
                onClick={() => setSelectedTimeframe(period as any)}
                variant={selectedTimeframe === period ? "default" : "ghost"}
                size="sm"
                className={selectedTimeframe === period ? "bg-blue-600 hover:bg-blue-700" : ""}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </Button>
            ))}
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Send className="w-4 h-4 mr-2" />
                Send Announcement
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-900 border-blue-500/30">
              <DialogHeader>
                <DialogTitle className="text-white">Company Announcement</DialogTitle>
                <DialogDescription className="text-slate-400">
                  Send a message to all employees or specific departments
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <Label className="text-slate-300">Subject</Label>
                  <Input placeholder="Security Update Required" className="bg-slate-800 border-slate-700 text-white mt-2" />
                </div>
                <div>
                  <Label className="text-slate-300">Department</Label>
                  <Select defaultValue="all">
                    <SelectTrigger className="bg-slate-800 border-slate-700 text-white mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="all">All Departments</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="hr">HR</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-slate-300">Message</Label>
                  <Textarea 
                    placeholder="Please complete the mandatory security training by..." 
                    className="bg-slate-800 border-slate-700 text-white mt-2"
                    rows={4}
                  />
                </div>
                <Button onClick={handleSendAnnouncement} className="w-full bg-blue-600 hover:bg-blue-700">
                  <Send className="w-4 h-4 mr-2" />
                  Send to All
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button onClick={handleExportData} className="bg-blue-600 hover:bg-blue-700">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Employees"
          value={totalEmployees.toString()}
          change="+5 this month"
          icon={<Users className="w-5 h-5" />}
          color="blue"
          onClick={() => {}}
        />
        <MetricCard
          title="Training Completion"
          value={`${avgCompletion}%`}
          change="+12% this month"
          icon={<CheckCircle className="w-5 h-5" />}
          color="green"
          onClick={() => {}}
        />
        <MetricCard
          title="At Risk"
          value={totalAtRisk.toString()}
          change="-5 this week"
          icon={<AlertTriangle className="w-5 h-5" />}
          color="orange"
          onClick={() => setShowReminderDialog(true)}
        />
        <MetricCard
          title="Avg Security Score"
          value={avgScore.toString()}
          change="+3 points"
          icon={<Target className="w-5 h-5" />}
          color="cyan"
          onClick={() => {}}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* Department Performance */}
          <Card className="bg-slate-900/50 border-blue-500/20 backdrop-blur-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-white">Department Performance</h3>
                <p className="text-sm text-slate-400">Completion rates and scores by team</p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={filteredDepartmentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: '1px solid #475569',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Bar dataKey="completion" fill="#3b82f6" name="Completion %" radius={[8, 8, 0, 0]} />
                <Bar dataKey="avgScore" fill="#06b6d4" name="Avg Score" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Training Progress Trend */}
          <Card className="bg-slate-900/50 border-blue-500/20 backdrop-blur-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-white">Training Progress</h3>
                <p className="text-sm text-slate-400">Completion vs Assignment trends</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={trainingProgress}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="week" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: '1px solid #475569',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="assigned" stroke="#64748b" strokeWidth={2} dot={{ fill: '#64748b', r: 4 }} />
                <Line type="monotone" dataKey="completed" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Top Performers */}
          <Card className="bg-slate-900/50 border-blue-500/20 backdrop-blur-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-white">Top Performers</h3>
                <p className="text-sm text-slate-400">Highest scoring employees this month</p>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-48 bg-slate-800 border-slate-700 text-white text-sm h-9"
                />
              </div>
            </div>
            <div className="space-y-3">
              {filteredTopPerformers
                .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((performer, index) => (
                <motion.div
                  key={performer.name}
                  whileHover={{ scale: 1.01, x: 5 }}
                  className="p-4 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-blue-500/50 transition-all cursor-pointer"
                  onClick={() => setSelectedEmployee(performer)}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="relative">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className={`${
                            index === 0 ? "bg-gradient-to-br from-yellow-400 to-orange-500" :
                            index === 1 ? "bg-gradient-to-br from-slate-300 to-slate-500" :
                            index === 2 ? "bg-gradient-to-br from-amber-600 to-amber-800" :
                            "bg-gradient-to-br from-blue-500 to-purple-600"
                          } text-white font-bold`}>
                            {performer.avatar}
                          </AvatarFallback>
                        </Avatar>
                        {index < 3 && (
                          <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-slate-900 border-2 border-slate-800 flex items-center justify-center">
                            <Trophy className={`w-3 h-3 ${
                              index === 0 ? "text-yellow-400" :
                              index === 1 ? "text-slate-300" :
                              "text-amber-600"
                            }`} />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-white">{performer.name}</h4>
                          {performer.trend === "up" && <TrendingUp className="w-4 h-4 text-green-400" />}
                          {performer.trend === "down" && <TrendingDown className="w-4 h-4 text-red-400" />}
                        </div>
                        <p className="text-sm text-slate-400">{performer.department}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">{performer.score}</div>
                      <div className="text-xs text-slate-400">{performer.modules} modules</div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAssignTraining(performer);
                      }}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      <BookOpen className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Upcoming Training Sessions */}
          <Card className="bg-slate-900/50 border-blue-500/20 backdrop-blur-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-white">Upcoming Training Sessions</h3>
                <p className="text-sm text-slate-400">Scheduled courses and enrollment</p>
              </div>
              <Dialog open={showTrainingDialog} onOpenChange={setShowTrainingDialog}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Schedule New
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-slate-900 border-blue-500/30">
                  <DialogHeader>
                    <DialogTitle className="text-white">Schedule Training Session</DialogTitle>
                    <DialogDescription className="text-slate-400">
                      Create a new training session for employees
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div>
                      <Label className="text-slate-300">Session Title *</Label>
                      <Input
                        placeholder="Ransomware Prevention"
                        value={newTraining.title}
                        onChange={(e) => setNewTraining({...newTraining, title: e.target.value})}
                        className="bg-slate-800 border-slate-700 text-white mt-2"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-300">Scheduled Date *</Label>
                      <Input
                        type="date"
                        value={newTraining.date}
                        onChange={(e) => setNewTraining({...newTraining, date: e.target.value})}
                        className="bg-slate-800 border-slate-700 text-white mt-2"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-300">Capacity *</Label>
                      <Input
                        type="number"
                        placeholder="50"
                        value={newTraining.capacity}
                        onChange={(e) => setNewTraining({...newTraining, capacity: e.target.value})}
                        className="bg-slate-800 border-slate-700 text-white mt-2"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-300">Description</Label>
                      <Textarea
                        placeholder="Session objectives and content..."
                        value={newTraining.description}
                        onChange={(e) => setNewTraining({...newTraining, description: e.target.value})}
                        className="bg-slate-800 border-slate-700 text-white mt-2"
                        rows={3}
                      />
                    </div>
                    <div className="flex gap-3 pt-4">
                      <Button onClick={handleCreateTraining} className="flex-1 bg-blue-600 hover:bg-blue-700">
                        <Calendar className="w-4 h-4 mr-2" />
                        Schedule Session
                      </Button>
                      <Button onClick={() => setShowTrainingDialog(false)} variant="outline" className="border-slate-700">
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="space-y-3">
              {trainingSessions.map((training) => (
                <motion.div
                  key={training.id}
                  whileHover={{ scale: 1.01, x: 5 }}
                  className="p-4 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-blue-500/50 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-white mb-1">{training.title}</h4>
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <Calendar className="w-4 h-4" />
                        <span>{training.scheduled}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={training.status === "full" ? "bg-red-600" : training.status === "completed" ? "bg-slate-600" : "bg-green-600"}>
                        {training.status}
                      </Badge>
                      {training.status === "open" && (
                        <Button
                          size="sm"
                          onClick={() => handleEnrollUser(training.id)}
                          className="h-7 text-xs bg-blue-600 hover:bg-blue-700"
                        >
                          <UserPlus className="w-3 h-3 mr-1" />
                          Enroll
                        </Button>
                      )}
                      <Button
                        size="sm"
                        onClick={() => handleDeleteTraining(training.id)}
                        className="h-7 text-xs bg-red-600 hover:bg-red-700"
                      >
                        <Trash2 className="w-3 h-3 mr-1" />
                        Delete
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleDuplicateTraining(training.id)}
                        className="h-7 text-xs bg-blue-600 hover:bg-blue-700"
                      >
                        <Copy className="w-3 h-3 mr-1" />
                        Duplicate
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleEditTraining(training)}
                        className="h-7 text-xs bg-blue-600 hover:bg-blue-700"
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">
                      {training.enrolled} / {training.capacity} enrolled
                    </span>
                    <Progress 
                      value={(training.enrolled / training.capacity) * 100} 
                      className="w-32 h-2"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column - 1/3 width */}
        <div className="space-y-6">
          {/* Risk Level Distribution */}
          <Card className="bg-slate-900/50 border-blue-500/20 backdrop-blur-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Risk Distribution</h3>
            <ResponsiveContainer width="100%" height={200}>
              <RePieChart>
                <Pie
                  data={riskLevelData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {riskLevelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RePieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {riskLevelData.map((item) => (
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

          {/* At Risk Employees */}
          <Card className="bg-slate-900/50 border-blue-500/20 backdrop-blur-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white">At Risk</h3>
                <p className="text-xs text-slate-400">Needs immediate attention</p>
              </div>
              <Badge className="bg-red-600">{filteredAtRisk.length}</Badge>
            </div>
            <div className="space-y-3">
              {filteredAtRisk.map((employee) => (
                <motion.div
                  key={employee.name}
                  whileHover={{ scale: 1.02, x: 3 }}
                  className="p-3 bg-slate-800/50 rounded-lg border border-red-500/30 hover:border-red-500/50 transition-all cursor-pointer"
                  onClick={() => setSelectedEmployee(employee)}
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-red-600 text-white font-bold">
                        {employee.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white">{employee.name}</p>
                      <p className="text-xs text-slate-400">{employee.department}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span className="text-xs text-slate-500">{employee.lastActivity}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-red-400">{employee.issues} issues</span>
                        <span className="text-xs font-semibold text-red-400">Score: {employee.score}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <Dialog open={showReminderDialog} onOpenChange={setShowReminderDialog}>
              <DialogTrigger asChild>
                <Button className="w-full mt-4 bg-red-600 hover:bg-red-700">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Reminder
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-900 border-blue-500/30">
                <DialogHeader>
                  <DialogTitle className="text-white">Send Training Reminder</DialogTitle>
                  <DialogDescription className="text-slate-400">
                    Send a reminder email to employees who are behind on training
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div className="p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
                    <p className="text-sm text-yellow-400">
                      This will send reminders to {atRiskEmployees.length} employees who are currently at risk.
                    </p>
                  </div>
                  <div>
                    <Label className="text-slate-300">Email Template</Label>
                    <Textarea 
                      defaultValue="Hi [Name], you have pending security training modules that need to be completed. Please log in to complete them as soon as possible."
                      className="bg-slate-800 border-slate-700 text-white mt-2"
                      rows={4}
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button onClick={handleSendReminder} className="flex-1 bg-red-600 hover:bg-red-700">
                      <Send className="w-4 h-4 mr-2" />
                      Send Reminders
                    </Button>
                    <Button onClick={() => setShowReminderDialog(false)} variant="outline" className="border-slate-700">
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </Card>

          {/* Department Filter */}
          <Card className="bg-slate-900/50 border-blue-500/20 backdrop-blur-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Filter by Department</h3>
            <div className="space-y-2">
              {["all", "sales", "engineering", "finance", "hr"].map((dept) => (
                <Button
                  key={dept}
                  onClick={() => setSelectedDepartment(dept as any)}
                  variant={selectedDepartment === dept ? "default" : "ghost"}
                  className={`w-full justify-start ${selectedDepartment === dept ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                >
                  {dept === "all" ? <Users className="w-4 h-4 mr-2" /> : <Briefcase className="w-4 h-4 mr-2" />}
                  {dept.charAt(0).toUpperCase() + dept.slice(1)}
                  {dept !== "all" && (
                    <span className="ml-auto text-xs">
                      {departmentData.find(d => d.name.toLowerCase() === dept)?.employees || 0}
                    </span>
                  )}
                </Button>
              ))}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-slate-900/50 border-blue-500/20 backdrop-blur-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Button 
                onClick={() => toast.success("Opening remedial training assignment")}
                className="w-full justify-start bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30"
              >
                <Send className="w-4 h-4 mr-2" />
                Assign Remedial Training
              </Button>
              <Button 
                onClick={handleExportData}
                className="w-full justify-start bg-slate-800 hover:bg-slate-700"
              >
                <FileText className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
              <Button 
                onClick={() => toast.info("Opening announcement composer")}
                className="w-full justify-start bg-slate-800 hover:bg-slate-700"
              >
                <Mail className="w-4 h-4 mr-2" />
                Send Announcement
              </Button>
              <Button 
                onClick={() => toast.info("Opening analytics dashboard")}
                className="w-full justify-start bg-slate-800 hover:bg-slate-700"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                View Analytics
              </Button>
            </div>
          </Card>

          {/* Compliance Status */}
          <Card className="bg-slate-900/50 border-blue-500/20 backdrop-blur-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Compliance Status</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-300">Annual Training</span>
                  <span className="text-sm font-semibold text-white">87%</span>
                </div>
                <Progress value={87} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-300">Policy Acknowledgment</span>
                  <span className="text-sm font-semibold text-white">94%</span>
                </div>
                <Progress value={94} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-300">Security Assessments</span>
                  <span className="text-sm font-semibold text-white">76%</span>
                </div>
                <Progress value={76} className="h-2" />
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Employee Detail Modal */}
      <Dialog open={!!selectedEmployee} onOpenChange={() => setSelectedEmployee(null)}>
        <DialogContent className="bg-slate-900 border-blue-500/30">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold">
                  {selectedEmployee?.avatar}
                </AvatarFallback>
              </Avatar>
              Employee Profile
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              View performance details and assign training
            </DialogDescription>
          </DialogHeader>
          {selectedEmployee && (
            <div className="space-y-4 mt-4">
              <div>
                <Label className="text-slate-400 text-xs">Name</Label>
                <p className="text-white font-medium text-lg">{selectedEmployee.name}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-400 text-xs">Department</Label>
                  <p className="text-white">{selectedEmployee.department}</p>
                </div>
                <div>
                  <Label className="text-slate-400 text-xs">Trend</Label>
                  <div className="flex items-center gap-2">
                    {selectedEmployee.trend === "up" && <TrendingUp className="w-4 h-4 text-green-400" />}
                    {selectedEmployee.trend === "down" && <TrendingDown className="w-4 h-4 text-red-400" />}
                    <span className="text-white capitalize">{selectedEmployee.trend}</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-slate-800/50 rounded-lg">
                  <div className="text-2xl font-bold text-white">{selectedEmployee.score}</div>
                  <div className="text-xs text-slate-400">Security Score</div>
                </div>
                <div className="text-center p-3 bg-slate-800/50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-400">{selectedEmployee.modules}</div>
                  <div className="text-xs text-slate-400">Modules Completed</div>
                </div>
              </div>
              {selectedEmployee.lastActivity && (
                <div>
                  <Label className="text-slate-400 text-xs">Last Activity</Label>
                  <p className="text-white">{selectedEmployee.lastActivity}</p>
                </div>
              )}
              <div className="flex gap-3 pt-4">
                <Button 
                  onClick={() => {
                    handleAssignTraining(selectedEmployee);
                    setSelectedEmployee(null);
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Assign Training
                </Button>
                <Button 
                  onClick={() => {
                    toast.success("Email sent to " + selectedEmployee.name);
                    setSelectedEmployee(null);
                  }}
                  variant="outline" 
                  className="border-slate-700"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Contact
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Report Generated Modal */}
      <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <DialogContent className="bg-slate-900 border-blue-500/30">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              Report Generated Successfully
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Your HR analytics report is ready for download
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
              <p className="text-sm text-green-400">
                Report includes data for {totalEmployees} employees across {departmentData.length} departments for the selected {selectedTimeframe}.
              </p>
            </div>
            <div className="flex gap-3">
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                <Download className="w-4 h-4 mr-2" />
                Download Excel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}

function MetricCard({ 
  title, 
  value, 
  change, 
  icon, 
  color,
  onClick
}: { 
  title: string; 
  value: string; 
  change: string; 
  icon: React.ReactNode; 
  color: string;
  onClick: () => void;
}) {
  const colorClasses = {
    blue: "from-blue-600/20 to-blue-900/20 border-blue-500/30",
    green: "from-green-600/20 to-green-900/20 border-green-500/30",
    orange: "from-orange-600/20 to-orange-900/20 border-orange-500/30",
    cyan: "from-cyan-600/20 to-cyan-900/20 border-cyan-500/30"
  };

  const iconColorClasses = {
    blue: "bg-blue-600/20 border-blue-500/30 text-blue-400",
    green: "bg-green-600/20 border-green-500/30 text-green-400",
    orange: "bg-orange-600/20 border-orange-500/30 text-orange-400",
    cyan: "bg-cyan-600/20 border-cyan-500/30 text-cyan-400"
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
        </div>
        <h3 className="text-3xl font-bold text-white mb-1">{value}</h3>
        <p className="text-sm text-slate-400 mb-1">{title}</p>
        <p className="text-xs text-green-400">{change}</p>
      </Card>
    </motion.div>
  );
}
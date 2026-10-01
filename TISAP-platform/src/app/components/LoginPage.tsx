import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner@2.0.3";
import { 
  Shield, 
  Users, 
  User,
  Briefcase,
  ArrowRight,
  CheckCircle,
  Lock,
  Mail,
  Chrome,
  Apple,
  KeyRound
} from "lucide-react";

interface LoginPageProps {
  onLogin: (role: "admin" | "hr" | "employee") => void;
  onBack: () => void;
}

export default function LoginPage({ onLogin, onBack }: LoginPageProps) {
  const [selectedRole, setSelectedRole] = useState<"admin" | "hr" | "employee" | null>(null);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const roles = [
    {
      id: "admin" as const,
      title: "Administrator",
      description: "Full system access and analytics",
      icon: <Shield className="w-8 h-8" />,
      color: "from-purple-600 to-pink-600",
      borderColor: "border-purple-500/30",
      hoverBorder: "hover:border-purple-500",
      bgGlow: "shadow-purple-500/20"
    },
    {
      id: "hr" as const,
      title: "HR Manager",
      description: "Team oversight and reporting",
      icon: <Users className="w-8 h-8" />,
      color: "from-blue-600 to-cyan-600",
      borderColor: "border-blue-500/30",
      hoverBorder: "hover:border-blue-500",
      bgGlow: "shadow-blue-500/20"
    },
    {
      id: "employee" as const,
      title: "Employee",
      description: "Training and assessments",
      icon: <User className="w-8 h-8" />,
      color: "from-cyan-600 to-teal-600",
      borderColor: "border-cyan-500/30",
      hoverBorder: "hover:border-cyan-500",
      bgGlow: "shadow-cyan-500/20"
    }
  ];

  const ssoProviders = [
    { name: "Google", icon: <Chrome className="w-5 h-5" /> },
    { name: "Microsoft", icon: <Mail className="w-5 h-5" /> },
    { name: "Apple", icon: <Apple className="w-5 h-5" /> }
  ];

  const handleSSOLogin = (provider: string, role: typeof selectedRole) => {
    if (!role) {
      toast.error("Please select a role first");
      return;
    }

    setIsLoading(true);
    toast.success(`Logging in with ${provider}...`);
    
    // Simulate SSO authentication
    setTimeout(() => {
      onLogin(role);
    }, 1500);
  };

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) {
      toast.error("Please select a role first");
      return;
    }

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setIsLoading(true);
    toast.success("Logging in...");
    
    setTimeout(() => {
      onLogin(selectedRole);
    }, 1500);
  };

  const handleQuickLogin = (role: "admin" | "hr" | "employee") => {
    setIsLoading(true);
    toast.success(`Quick login as ${role}...`);
    
    setTimeout(() => {
      onLogin(role);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 relative overflow-hidden flex items-center justify-center p-6">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"
          animate={{ 
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{ 
            x: [0, -30, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* Back Button */}
      <motion.div 
        className="absolute top-6 left-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-slate-300 hover:text-white hover:bg-slate-800"
        >
          ← Back to Home
        </Button>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div 
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/50"
              animate={{ 
                boxShadow: [
                  "0 0 20px rgba(59, 130, 246, 0.5)", 
                  "0 0 30px rgba(147, 51, 234, 0.7)", 
                  "0 0 20px rgba(59, 130, 246, 0.5)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Shield className="w-7 h-7 text-white" />
            </motion.div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome to TISAP
          </h1>
          <p className="text-xl text-slate-400">
            Sign in to your security awareness platform
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Role Selection */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-slate-900/50 border-blue-500/30 backdrop-blur-xl p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Select Your Role</h2>
                <p className="text-slate-400">Choose how you'll be accessing TISAP</p>
              </div>

              <div className="space-y-3">
                {roles.map((role) => (
                  <motion.div
                    key={role.id}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card
                      className={`p-4 cursor-pointer transition-all border-2 ${
                        selectedRole === role.id
                          ? `${role.hoverBorder} shadow-lg ${role.bgGlow}`
                          : `${role.borderColor} hover:${role.hoverBorder}`
                      } bg-slate-800/50 backdrop-blur-sm`}
                      onClick={() => setSelectedRole(role.id)}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${role.color} flex items-center justify-center text-white shadow-lg ${role.bgGlow}`}>
                          {role.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-white text-lg">{role.title}</h3>
                          <p className="text-sm text-slate-400">{role.description}</p>
                        </div>
                        {selectedRole === role.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500 }}
                          >
                            <CheckCircle className="w-6 h-6 text-green-400" />
                          </motion.div>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Quick Login for Demo */}
              <div className="mt-6 pt-6 border-t border-slate-700">
                <p className="text-sm text-slate-400 mb-3">Quick Demo Login:</p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleQuickLogin("admin")}
                    disabled={isLoading}
                    className="flex-1 border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
                  >
                    Admin
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleQuickLogin("hr")}
                    disabled={isLoading}
                    className="flex-1 border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
                  >
                    HR
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleQuickLogin("employee")}
                    disabled={isLoading}
                    className="flex-1 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
                  >
                    Employee
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Login Methods */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-slate-900/50 border-blue-500/30 backdrop-blur-xl p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Sign In</h2>
                <p className="text-slate-400">Use SSO or email to continue</p>
              </div>

              {/* SSO Buttons */}
              <div className="space-y-3 mb-6">
                {ssoProviders.map((provider) => (
                  <Button
                    key={provider.name}
                    variant="outline"
                    className="w-full border-2 border-slate-700 hover:border-blue-500/50 text-white h-12 text-base"
                    onClick={() => handleSSOLogin(provider.name, selectedRole)}
                    disabled={isLoading || !selectedRole}
                  >
                    {provider.icon}
                    <span className="ml-3">Continue with {provider.name}</span>
                  </Button>
                ))}
              </div>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-slate-900 text-slate-400">Or continue with email</span>
                </div>
              </div>

              {/* Email Login */}
              <form onSubmit={handleEmailLogin} className="space-y-4">
                <div>
                  <Label htmlFor="email" className="text-slate-300 mb-2 block">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 h-12"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white h-12 text-base shadow-lg shadow-blue-500/30"
                  disabled={isLoading || !selectedRole}
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <KeyRound className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </form>

              {!selectedRole && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 bg-yellow-900/20 border border-yellow-500/30 rounded-lg"
                >
                  <p className="text-sm text-yellow-400 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Please select a role to continue
                  </p>
                </motion.div>
              )}

              {/* Additional Info */}
              <div className="mt-6 pt-6 border-t border-slate-700">
                <div className="flex items-start gap-2 text-xs text-slate-400">
                  <Shield className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <p>
                    Your data is protected with enterprise-grade encryption and security protocols
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Security Badge */}
        <motion.div 
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center justify-center gap-6 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>SSO Enabled</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>256-bit Encryption</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>SOC 2 Compliant</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

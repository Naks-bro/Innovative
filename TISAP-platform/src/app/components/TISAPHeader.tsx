import { useTheme } from "./ThemeProvider";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { 
  Sun, 
  Moon, 
  Shield, 
  User, 
  Users, 
  Briefcase,
  ChevronDown 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type Role = 'employee' | 'hr' | 'admin';

interface TISAPHeaderProps {
  title?: string;
  showRoleSwitcher?: boolean;
  currentRole?: Role;
  onRoleChange?: (role: Role) => void;
}

export default function TISAPHeader({ 
  title = "TISAP Labs",
  showRoleSwitcher = false,
  currentRole = 'employee',
  onRoleChange 
}: TISAPHeaderProps) {
  const { theme, toggleTheme } = useTheme();

  const getRoleIcon = (role: Role) => {
    switch (role) {
      case 'admin':
        return <Shield className="w-4 h-4" />;
      case 'hr':
        return <Briefcase className="w-4 h-4" />;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  const getRoleLabel = (role: Role) => {
    switch (role) {
      case 'admin':
        return 'Admin';
      case 'hr':
        return 'HR';
      default:
        return 'Employee';
    }
  };

  const getRoleColor = (role: Role) => {
    switch (role) {
      case 'admin':
        return 'bg-tisap-error text-white';
      case 'hr':
        return 'bg-tisap-blue text-white';
      default:
        return 'bg-tisap-teal text-white';
    }
  };

  return (
    <div className="glass-panel border-b border-border/50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-tisap-teal to-tisap-blue rounded-lg flex items-center justify-center neon-teal">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-foreground">{title}</h2>
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center gap-3">
            {/* Role Switcher */}
            {showRoleSwitcher && onRoleChange && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    {getRoleIcon(currentRole)}
                    <span>{getRoleLabel(currentRole)}</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="glass-panel">
                  <DropdownMenuItem 
                    onClick={() => onRoleChange('employee')}
                    className="gap-2 cursor-pointer"
                  >
                    <User className="w-4 h-4" />
                    <span>Employee View</span>
                    {currentRole === 'employee' && (
                      <Badge className="ml-auto bg-tisap-teal text-white">Active</Badge>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => onRoleChange('hr')}
                    className="gap-2 cursor-pointer"
                  >
                    <Briefcase className="w-4 h-4" />
                    <span>HR View</span>
                    {currentRole === 'hr' && (
                      <Badge className="ml-auto bg-tisap-blue text-white">Active</Badge>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => onRoleChange('admin')}
                    className="gap-2 cursor-pointer"
                  >
                    <Shield className="w-4 h-4" />
                    <span>Admin View</span>
                    {currentRole === 'admin' && (
                      <Badge className="ml-auto bg-tisap-error text-white">Active</Badge>
                    )}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Theme Toggle */}
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              className="hover-glow"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

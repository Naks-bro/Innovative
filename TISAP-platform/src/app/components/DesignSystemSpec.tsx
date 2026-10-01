import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Progress } from "./ui/progress";
import { Checkbox } from "./ui/checkbox";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { 
  Shield, Mail, Globe, Monitor, Wifi, Trophy, Award, Flag, 
  AlertTriangle, CheckCircle, XCircle, Info, ChevronLeft
} from "lucide-react";

interface DesignSystemSpecProps {
  onBack: () => void;
}

export default function DesignSystemSpec({ onBack }: DesignSystemSpecProps) {
  return (
    <div className="min-h-screen bg-tisap-grey-50">
      <header className="bg-white border-b border-tisap-grey-200 sticky top-0 z-50">
        <div className="max-w-[1440px] mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              className="text-tisap-grey-600"
              onClick={onBack}
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Back
            </Button>
            <div className="h-6 w-px bg-tisap-grey-300"></div>
            <div>
              <h1 className="text-tisap-grey-900">TISAP Labs Design System</h1>
              <p className="text-sm text-tisap-grey-500">Component Library & Style Specifications</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1440px] mx-auto px-6 py-8">
        <Tabs defaultValue="colors" className="mb-8">
          <TabsList className="bg-white border border-tisap-grey-200 p-1">
            <TabsTrigger value="colors">Colors</TabsTrigger>
            <TabsTrigger value="typography">Typography</TabsTrigger>
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="icons">Icons</TabsTrigger>
            <TabsTrigger value="states">States</TabsTrigger>
            <TabsTrigger value="specs">Specifications</TabsTrigger>
          </TabsList>

          {/* Color Palette */}
          <TabsContent value="colors">
            <Card className="p-6 border-tisap-grey-200 mb-6">
              <h2 className="text-tisap-grey-900 mb-6">Brand Colors</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-tisap-grey-900 mb-3">Primary - Teal</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 bg-tisap-teal rounded-lg shadow"></div>
                      <div>
                        <p className="text-sm text-tisap-grey-900">Teal</p>
                        <code className="text-xs text-tisap-grey-600">#0B7A75</code>
                        <p className="text-xs text-tisap-grey-500">--tisap-teal</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 bg-tisap-teal-light rounded-lg shadow"></div>
                      <div>
                        <p className="text-sm text-tisap-grey-900">Teal Light</p>
                        <code className="text-xs text-tisap-grey-600">#0D9890</code>
                        <p className="text-xs text-tisap-grey-500">--tisap-teal-light</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 bg-tisap-teal-dark rounded-lg shadow"></div>
                      <div>
                        <p className="text-sm text-tisap-grey-900">Teal Dark</p>
                        <code className="text-xs text-tisap-grey-600">#085f5b</code>
                        <p className="text-xs text-tisap-grey-500">--tisap-teal-dark</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-tisap-grey-900 mb-3">Secondary - Blue</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 bg-tisap-blue rounded-lg shadow"></div>
                      <div>
                        <p className="text-sm text-tisap-grey-900">Blue</p>
                        <code className="text-xs text-tisap-grey-600">#246BFF</code>
                        <p className="text-xs text-tisap-grey-500">--tisap-blue</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 bg-tisap-blue-light rounded-lg shadow"></div>
                      <div>
                        <p className="text-sm text-tisap-grey-900">Blue Light</p>
                        <code className="text-xs text-tisap-grey-600">#4D87FF</code>
                        <p className="text-xs text-tisap-grey-500">--tisap-blue-light</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 bg-tisap-blue-dark rounded-lg shadow"></div>
                      <div>
                        <p className="text-sm text-tisap-grey-900">Blue Dark</p>
                        <code className="text-xs text-tisap-grey-600">#1A4FCC</code>
                        <p className="text-xs text-tisap-grey-500">--tisap-blue-dark</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-tisap-grey-900 mb-3">Accent - Gold</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 bg-tisap-gold rounded-lg shadow"></div>
                      <div>
                        <p className="text-sm text-tisap-grey-900">Gold</p>
                        <code className="text-xs text-tisap-grey-600">#F3C04D</code>
                        <p className="text-xs text-tisap-grey-500">--tisap-gold</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 bg-tisap-gold-light rounded-lg shadow"></div>
                      <div>
                        <p className="text-sm text-tisap-grey-900">Gold Light</p>
                        <code className="text-xs text-tisap-grey-600">#F5CC70</code>
                        <p className="text-xs text-tisap-grey-500">--tisap-gold-light</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 bg-tisap-gold-dark rounded-lg shadow"></div>
                      <div>
                        <p className="text-sm text-tisap-grey-900">Gold Dark</p>
                        <code className="text-xs text-tisap-grey-600">#D4A438</code>
                        <p className="text-xs text-tisap-grey-500">--tisap-gold-dark</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-tisap-grey-200 mb-6">
              <h2 className="text-tisap-grey-900 mb-6">Status Colors</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { name: "Success", color: "bg-tisap-success", hex: "#10B981", token: "--tisap-success" },
                  { name: "Warning", color: "bg-tisap-warning", hex: "#F59E0B", token: "--tisap-warning" },
                  { name: "Error", color: "bg-tisap-error", hex: "#EF4444", token: "--tisap-error" },
                  { name: "Info", color: "bg-tisap-info", hex: "#3B82F6", token: "--tisap-info" }
                ].map((item) => (
                  <div key={item.name} className="flex items-center gap-3">
                    <div className={`w-16 h-16 ${item.color} rounded-lg shadow`}></div>
                    <div>
                      <p className="text-sm text-tisap-grey-900">{item.name}</p>
                      <code className="text-xs text-tisap-grey-600">{item.hex}</code>
                      <p className="text-xs text-tisap-grey-500">{item.token}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 border-tisap-grey-200">
              <h2 className="text-tisap-grey-900 mb-6">Neutral Grey Scale</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  { name: "Grey 50", color: "bg-tisap-grey-50", hex: "#F9FAFB" },
                  { name: "Grey 100", color: "bg-tisap-grey-100", hex: "#F3F4F6" },
                  { name: "Grey 200", color: "bg-tisap-grey-200", hex: "#E5E7EB" },
                  { name: "Grey 300", color: "bg-tisap-grey-300", hex: "#D1D5DB" },
                  { name: "Grey 400", color: "bg-tisap-grey-400", hex: "#9CA3AF" },
                  { name: "Grey 500", color: "bg-tisap-grey-500", hex: "#6B7280" },
                  { name: "Grey 600", color: "bg-tisap-grey-600", hex: "#4B5563" },
                  { name: "Grey 700", color: "bg-tisap-grey-700", hex: "#374151" },
                  { name: "Grey 800", color: "bg-tisap-grey-800", hex: "#1F2937" },
                  { name: "Grey 900", color: "bg-tisap-grey-900", hex: "#111827" }
                ].map((item) => (
                  <div key={item.name}>
                    <div className={`w-full h-20 ${item.color} rounded-lg shadow mb-2 border border-tisap-grey-200`}></div>
                    <p className="text-xs text-tisap-grey-900">{item.name}</p>
                    <code className="text-xs text-tisap-grey-600">{item.hex}</code>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Typography */}
          <TabsContent value="typography">
            <Card className="p-6 border-tisap-grey-200">
              <h2 className="text-tisap-grey-900 mb-6">Typography Scale</h2>
              <div className="space-y-6">
                <div className="border-b border-tisap-grey-200 pb-4">
                  <h1 className="mb-2">Heading 1</h1>
                  <code className="text-xs text-tisap-grey-600">font-size: 2rem (32px) | font-weight: 500 | line-height: 1.5</code>
                </div>
                <div className="border-b border-tisap-grey-200 pb-4">
                  <h2 className="mb-2">Heading 2</h2>
                  <code className="text-xs text-tisap-grey-600">font-size: 1.5rem (24px) | font-weight: 500 | line-height: 1.5</code>
                </div>
                <div className="border-b border-tisap-grey-200 pb-4">
                  <h3 className="mb-2">Heading 3</h3>
                  <code className="text-xs text-tisap-grey-600">font-size: 1.25rem (20px) | font-weight: 500 | line-height: 1.5</code>
                </div>
                <div className="border-b border-tisap-grey-200 pb-4">
                  <h4 className="mb-2">Heading 4</h4>
                  <code className="text-xs text-tisap-grey-600">font-size: 1rem (16px) | font-weight: 500 | line-height: 1.5</code>
                </div>
                <div className="border-b border-tisap-grey-200 pb-4">
                  <p className="mb-2">Body Text - This is the default paragraph text used throughout the application.</p>
                  <code className="text-xs text-tisap-grey-600">font-size: 1rem (16px) | font-weight: 400 | line-height: 1.5</code>
                </div>
                <div className="pb-4">
                  <p className="text-sm mb-2">Small Text - Used for secondary information and captions.</p>
                  <code className="text-xs text-tisap-grey-600">font-size: 0.875rem (14px) | font-weight: 400 | line-height: 1.5</code>
                </div>
              </div>

              <div className="mt-8 p-4 bg-tisap-grey-50 rounded-lg">
                <h4 className="text-tisap-grey-900 mb-2">Font Family</h4>
                <code className="text-sm text-tisap-grey-700">font-family: 'Inter', system-ui, -apple-system, sans-serif</code>
                <p className="text-xs text-tisap-grey-500 mt-2">
                  Accessibility: All text maintains minimum 4.5:1 contrast ratio for WCAG AA compliance
                </p>
              </div>
            </Card>
          </TabsContent>

          {/* Components */}
          <TabsContent value="components">
            <div className="space-y-6">
              <Card className="p-6 border-tisap-grey-200">
                <h3 className="text-tisap-grey-900 mb-4">Buttons</h3>
                <div className="flex flex-wrap gap-4">
                  <Button className="bg-tisap-teal hover:bg-tisap-teal-dark text-white">
                    Primary Button
                  </Button>
                  <Button className="bg-tisap-blue hover:bg-tisap-blue-dark text-white">
                    Secondary Button
                  </Button>
                  <Button variant="outline" className="border-tisap-grey-300">
                    Outline Button
                  </Button>
                  <Button variant="ghost">Ghost Button</Button>
                  <Button className="bg-tisap-error hover:bg-red-600 text-white">
                    Destructive
                  </Button>
                  <Button disabled>Disabled</Button>
                </div>
                <div className="mt-4 p-3 bg-tisap-grey-50 rounded text-xs text-tisap-grey-700">
                  <p>Spacing: px-4 py-2 | Border Radius: 0.5rem | Min Height: 44px (mobile tap target)</p>
                </div>
              </Card>

              <Card className="p-6 border-tisap-grey-200">
                <h3 className="text-tisap-grey-900 mb-4">Badges</h3>
                <div className="flex flex-wrap gap-3">
                  <Badge className="bg-tisap-teal text-white">Teal</Badge>
                  <Badge className="bg-tisap-blue text-white">Blue</Badge>
                  <Badge className="bg-tisap-gold text-tisap-grey-900">Gold</Badge>
                  <Badge className="bg-tisap-success text-white">Success</Badge>
                  <Badge className="bg-tisap-warning text-white">Warning</Badge>
                  <Badge className="bg-tisap-error text-white">Error</Badge>
                  <Badge variant="outline" className="border-tisap-grey-300">Outline</Badge>
                </div>
              </Card>

              <Card className="p-6 border-tisap-grey-200">
                <h3 className="text-tisap-grey-900 mb-4">Form Inputs</h3>
                <div className="space-y-4 max-w-md">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" />
                  </div>
                  <div>
                    <Label htmlFor="select">Select Option</Label>
                    <Select>
                      <SelectTrigger id="select">
                        <SelectValue placeholder="Choose option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Option 1</SelectItem>
                        <SelectItem value="2">Option 2</SelectItem>
                        <SelectItem value="3">Option 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="terms" />
                    <Label htmlFor="terms">Accept terms and conditions</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="notifications" />
                    <Label htmlFor="notifications">Enable notifications</Label>
                  </div>
                  <RadioGroup defaultValue="option1">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="option1" id="option1" />
                      <Label htmlFor="option1">Option 1</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="option2" id="option2" />
                      <Label htmlFor="option2">Option 2</Label>
                    </div>
                  </RadioGroup>
                </div>
              </Card>

              <Card className="p-6 border-tisap-grey-200">
                <h3 className="text-tisap-grey-900 mb-4">Progress Indicators</h3>
                <div className="space-y-4 max-w-md">
                  <div>
                    <p className="text-sm text-tisap-grey-600 mb-2">25% Complete</p>
                    <Progress value={25} />
                  </div>
                  <div>
                    <p className="text-sm text-tisap-grey-600 mb-2">50% Complete</p>
                    <Progress value={50} />
                  </div>
                  <div>
                    <p className="text-sm text-tisap-grey-600 mb-2">75% Complete</p>
                    <Progress value={75} />
                  </div>
                  <div>
                    <p className="text-sm text-tisap-grey-600 mb-2">100% Complete</p>
                    <Progress value={100} />
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Icons */}
          <TabsContent value="icons">
            <Card className="p-6 border-tisap-grey-200">
              <h3 className="text-tisap-grey-900 mb-6">Icon Library (Lucide React)</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {[
                  { Icon: Shield, name: "Shield", use: "Security" },
                  { Icon: Mail, name: "Mail", use: "Email" },
                  { Icon: Globe, name: "Globe", use: "Browser" },
                  { Icon: Monitor, name: "Monitor", use: "Windows" },
                  { Icon: Wifi, name: "Wifi", use: "IoT" },
                  { Icon: Trophy, name: "Trophy", use: "Leaderboard" },
                  { Icon: Award, name: "Award", use: "Badges" },
                  { Icon: Flag, name: "Flag", use: "Report" },
                  { Icon: AlertTriangle, name: "AlertTriangle", use: "Warning" },
                  { Icon: CheckCircle, name: "CheckCircle", use: "Success" },
                  { Icon: XCircle, name: "XCircle", use: "Error" },
                  { Icon: Info, name: "Info", use: "Information" }
                ].map(({ Icon, name, use }) => (
                  <div key={name} className="text-center">
                    <div className="w-16 h-16 bg-tisap-grey-50 rounded-lg flex items-center justify-center mx-auto mb-2 border border-tisap-grey-200">
                      <Icon className="w-8 h-8 text-tisap-teal" />
                    </div>
                    <p className="text-xs text-tisap-grey-900 mb-1">{name}</p>
                    <p className="text-xs text-tisap-grey-500">{use}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-tisap-grey-50 rounded-lg">
                <p className="text-sm text-tisap-grey-700">
                  Standard sizes: 16px (w-4 h-4), 20px (w-5 h-5), 24px (w-6 h-6)
                </p>
              </div>
            </Card>
          </TabsContent>

          {/* States */}
          <TabsContent value="states">
            <div className="space-y-6">
              <Card className="p-6 border-tisap-grey-200">
                <h3 className="text-tisap-grey-900 mb-4">Button States</h3>
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="text-center">
                      <Button className="bg-tisap-teal text-white mb-2">Normal</Button>
                      <p className="text-xs text-tisap-grey-600">Default State</p>
                    </div>
                    <div className="text-center">
                      <Button className="bg-tisap-teal-dark text-white mb-2">Hover</Button>
                      <p className="text-xs text-tisap-grey-600">Hover/Focus</p>
                    </div>
                    <div className="text-center">
                      <Button className="bg-tisap-teal-dark text-white mb-2 ring-2 ring-tisap-teal ring-offset-2">Clicked</Button>
                      <p className="text-xs text-tisap-grey-600">Active/Pressed</p>
                    </div>
                    <div className="text-center">
                      <Button disabled className="mb-2">Disabled</Button>
                      <p className="text-xs text-tisap-grey-600">Disabled State</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-tisap-grey-200">
                <h3 className="text-tisap-grey-900 mb-4">Feedback States</h3>
                <div className="space-y-4 max-w-2xl">
                  <div className="p-4 bg-tisap-success/5 border-2 border-tisap-success rounded-lg">
                    <div className="flex items-center gap-2 text-tisap-success mb-2">
                      <CheckCircle className="w-5 h-5" />
                      <span>Success State</span>
                    </div>
                    <p className="text-sm text-tisap-grey-700">Action completed successfully!</p>
                  </div>

                  <div className="p-4 bg-tisap-warning/5 border-2 border-tisap-warning rounded-lg">
                    <div className="flex items-center gap-2 text-tisap-warning mb-2">
                      <AlertTriangle className="w-5 h-5" />
                      <span>Warning State</span>
                    </div>
                    <p className="text-sm text-tisap-grey-700">Please review before proceeding.</p>
                  </div>

                  <div className="p-4 bg-tisap-error/5 border-2 border-tisap-error rounded-lg">
                    <div className="flex items-center gap-2 text-tisap-error mb-2">
                      <XCircle className="w-5 h-5" />
                      <span>Error State</span>
                    </div>
                    <p className="text-sm text-tisap-grey-700">An error occurred. Please try again.</p>
                  </div>

                  <div className="p-4 bg-tisap-info/5 border-2 border-tisap-info rounded-lg">
                    <div className="flex items-center gap-2 text-tisap-info mb-2">
                      <Info className="w-5 h-5" />
                      <span>Info State</span>
                    </div>
                    <p className="text-sm text-tisap-grey-700">Additional information available.</p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Specifications */}
          <TabsContent value="specs">
            <Card className="p-6 border-tisap-grey-200">
              <h2 className="text-tisap-grey-900 mb-6">Design Specifications</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-tisap-grey-900 mb-3">Spacing System</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-3 bg-tisap-grey-50 rounded">
                      <p className="text-sm text-tisap-grey-900 mb-1">XS - 0.25rem</p>
                      <code className="text-xs text-tisap-grey-600">4px</code>
                    </div>
                    <div className="p-3 bg-tisap-grey-50 rounded">
                      <p className="text-sm text-tisap-grey-900 mb-1">SM - 0.5rem</p>
                      <code className="text-xs text-tisap-grey-600">8px</code>
                    </div>
                    <div className="p-3 bg-tisap-grey-50 rounded">
                      <p className="text-sm text-tisap-grey-900 mb-1">MD - 1rem</p>
                      <code className="text-xs text-tisap-grey-600">16px</code>
                    </div>
                    <div className="p-3 bg-tisap-grey-50 rounded">
                      <p className="text-sm text-tisap-grey-900 mb-1">LG - 1.5rem</p>
                      <code className="text-xs text-tisap-grey-600">24px</code>
                    </div>
                    <div className="p-3 bg-tisap-grey-50 rounded">
                      <p className="text-sm text-tisap-grey-900 mb-1">XL - 2rem</p>
                      <code className="text-xs text-tisap-grey-600">32px</code>
                    </div>
                    <div className="p-3 bg-tisap-grey-50 rounded">
                      <p className="text-sm text-tisap-grey-900 mb-1">2XL - 3rem</p>
                      <code className="text-xs text-tisap-grey-600">48px</code>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-tisap-grey-900 mb-3">Border Radius</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-3 bg-tisap-grey-50 rounded">
                      <p className="text-sm text-tisap-grey-900 mb-1">SM</p>
                      <code className="text-xs text-tisap-grey-600">0.25rem (4px)</code>
                    </div>
                    <div className="p-3 bg-tisap-grey-50 rounded-md">
                      <p className="text-sm text-tisap-grey-900 mb-1">MD</p>
                      <code className="text-xs text-tisap-grey-600">0.375rem (6px)</code>
                    </div>
                    <div className="p-3 bg-tisap-grey-50 rounded-lg">
                      <p className="text-sm text-tisap-grey-900 mb-1">LG (Default)</p>
                      <code className="text-xs text-tisap-grey-600">0.5rem (8px)</code>
                    </div>
                    <div className="p-3 bg-tisap-grey-50 rounded-xl">
                      <p className="text-sm text-tisap-grey-900 mb-1">XL</p>
                      <code className="text-xs text-tisap-grey-600">0.75rem (12px)</code>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-tisap-grey-900 mb-3">Accessibility</h3>
                  <div className="space-y-3">
                    <div className="p-4 bg-tisap-grey-50 rounded-lg">
                      <h4 className="text-sm text-tisap-grey-900 mb-2">Color Contrast</h4>
                      <p className="text-sm text-tisap-grey-700">
                        All text maintains minimum 4.5:1 contrast ratio (WCAG AA)
                      </p>
                    </div>
                    <div className="p-4 bg-tisap-grey-50 rounded-lg">
                      <h4 className="text-sm text-tisap-grey-900 mb-2">Touch Targets</h4>
                      <p className="text-sm text-tisap-grey-700">
                        Minimum 44px × 44px for mobile tap targets
                      </p>
                    </div>
                    <div className="p-4 bg-tisap-grey-50 rounded-lg">
                      <h4 className="text-sm text-tisap-grey-900 mb-2">Focus States</h4>
                      <p className="text-sm text-tisap-grey-700">
                        All interactive elements have visible focus indicators
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-tisap-grey-900 mb-3">Responsive Breakpoints</h3>
                  <div className="space-y-2">
                    <div className="p-3 bg-tisap-grey-50 rounded">
                      <p className="text-sm text-tisap-grey-900">Mobile: 375px - 767px</p>
                    </div>
                    <div className="p-3 bg-tisap-grey-50 rounded">
                      <p className="text-sm text-tisap-grey-900">Tablet: 768px - 1023px</p>
                    </div>
                    <div className="p-3 bg-tisap-grey-50 rounded">
                      <p className="text-sm text-tisap-grey-900">Desktop: 1024px - 1439px</p>
                    </div>
                    <div className="p-3 bg-tisap-grey-50 rounded">
                      <p className="text-sm text-tisap-grey-900">Large Desktop: 1440px+</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

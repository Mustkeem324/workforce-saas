import React, { useState, useEffect } from 'react';
import { 
  Palette, 
  Type, 
  Grid, 
  Zap, 
  Layers, 
  Briefcase, 
  Moon, 
  Sun, 
  Check, 
  Sparkles,
  LayoutDashboard,
  ShieldCheck,
  Radio,
  Calendar,
  IndianRupee, 
  PieChart,
  Bot,
  Command,
  Rocket,
  Globe,
  Plug,
  History,
  TrendingUp,
  UserCheck,
  Gauge,
  Building2,
  Lock,
  Gift,
  FileText,
  Menu,
  X
} from 'lucide-react';
import { OverviewView } from './views/OverviewView';
import { ColorTokensView } from './views/ColorTokensView';
import { TypographyView } from './views/TypographyView';
import { SpacingElevationView } from './views/SpacingElevationView';
import { MotionTokensView } from './views/MotionTokensView';
import { ComponentsView } from './views/ComponentsView';
import { WorkforcePatternsView } from './views/WorkforcePatternsView';
import { Phase1AdminShellView } from './views/Phase1AdminShellView';
import { Phase2AttendanceView } from './views/Phase2AttendanceView';
import { Phase3ShiftManagementView } from './views/Phase3ShiftManagementView';
import { Phase4PayrollEngineView } from './views/Phase4PayrollEngineView';
import { Phase5ReportingView } from './views/Phase5ReportingView';
import { Phase6AILayerView } from './views/Phase6AILayerView';
import { Phase7MarketingView } from './views/Phase7MarketingView';
import { Phase8EnterpriseView } from './views/Phase8EnterpriseView';
import { Phase9IntegrationsView } from './views/Phase9IntegrationsView';
import { Phase10ComplianceView } from './views/Phase10ComplianceView';
import { Phase11AnalyticsView } from './views/Phase11AnalyticsView';
import { Phase12EmployeeAppView } from './views/Phase12EmployeeAppView';
import { Phase13PerformanceView } from './views/Phase13PerformanceView';
import { Phase14WhiteLabelView } from './views/Phase14WhiteLabelView';
import { Phase15AccessibilityView } from './views/Phase15AccessibilityView';
import { Phase16SecurityView } from './views/Phase16SecurityView';
import { Phase17GrowthOpsView } from './views/Phase17GrowthOpsView';
import { BlogCmsAdminView } from './views/BlogCmsAdminView';
import { MobileBottomTabBar } from './components/mobile/MobileBottomTabBar';
import { CommandPaletteModal } from './components/phase1/CommandPaletteModal';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('phase12');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isTabletSidebarOpen, setIsTabletSidebarOpen] = useState<boolean>(false);

  // Sync dark mode class with root html element
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  const navItems = [
    { id: 'phase12', label: 'Employee Self-Service Hub', icon: <UserCheck className="w-4 h-4 text-emerald-400" /> },
    { id: 'phase2', label: 'Attendance Capture & Geofence Map', icon: <Radio className="w-4 h-4 text-[var(--accent-500)]" /> },
    { id: 'phase3', label: 'Shift Builder & Smart Roster', icon: <Calendar className="w-4 h-4 text-amber-400" /> },
    { id: 'phase4', label: 'Guarded Payroll Engine', icon: <IndianRupee className="w-4 h-4 text-emerald-400" /> },
    { id: 'phase1', label: 'Admin Shell & Command Palette', icon: <LayoutDashboard className="w-4 h-4 text-sky-400" /> },
    { id: 'phase5', label: 'Leave, Loans & Pivot Reports', icon: <PieChart className="w-4 h-4 text-indigo-400" /> },
    { id: 'phase6', label: 'AI Co-Pilot & Anomaly Digest', icon: <Bot className="w-4 h-4 text-purple-400" /> },
    { id: 'phase8', label: 'Enterprise Multi-Location Tree', icon: <Globe className="w-4 h-4 text-blue-400" /> },
    { id: 'phase9', label: 'Developer API Marketplace', icon: <Plug className="w-4 h-4 text-[var(--accent-500)]" /> },
    { id: 'phase10', label: 'Statutory Compliance & Audit Logs', icon: <History className="w-4 h-4 text-teal-400" /> },
    { id: 'phase11', label: 'Executive Intelligence & Cohorts', icon: <TrendingUp className="w-4 h-4 text-[var(--accent-500)]" /> },
    { id: 'phase13', label: 'Offline-First Engine & Latency Audit', icon: <Gauge className="w-4 h-4 text-[var(--accent-500)]" /> },
    { id: 'phase14', label: 'White-Label Customizer & Franchise', icon: <Building2 className="w-4 h-4 text-amber-400" /> },
    { id: 'phase15', label: 'Accessibility & Localized Engine', icon: <UserCheck className="w-4 h-4 text-emerald-400" /> },
    { id: 'phase16', label: 'Security Center & Data Exporter', icon: <Lock className="w-4 h-4 text-rose-400" /> },
    { id: 'phase17', label: 'Design Ops Changelog & Referral Loop', icon: <Gift className="w-4 h-4 text-pink-400" /> },
    { id: 'phase7', label: 'Product Overview & Marketing Site', icon: <Rocket className="w-4 h-4 text-[var(--accent-500)]" /> },
    { id: 'blog', label: 'Blog & Content Hub', icon: <FileText className="w-4 h-4 text-amber-400" /> },
    { id: 'overview', label: 'Design System Sitemap', icon: <Layers className="w-4 h-4 text-indigo-400" /> },
    { id: 'colors', label: 'Color Tokens', icon: <Palette className="w-4 h-4 text-rose-400" /> },
    { id: 'typography', label: 'Typography Tokens', icon: <Type className="w-4 h-4 text-sky-400" /> },
    { id: 'spacing', label: 'Spacing & Elevation', icon: <Grid className="w-4 h-4 text-emerald-400" /> },
    { id: 'motion', label: 'Motion Tokens', icon: <Zap className="w-4 h-4 text-amber-400" /> },
    { id: 'components', label: 'Primitives Gallery', icon: <Briefcase className="w-4 h-4 text-purple-400" /> },
    { id: 'patterns', label: 'Workforce Patterns', icon: <Sparkles className="w-4 h-4 text-teal-400" /> }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)] font-sans antialiased flex flex-col transition-colors duration-200">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-[var(--bg-surface-raised)]/95 backdrop-blur-md border-b border-[var(--border-subtle)] px-4 md:px-6 py-3 flex items-center justify-between shadow-xs pt-safe">
        <div className="flex items-center gap-2.5">
          {/* Mobile/Tablet Menu Toggle */}
          <button 
            onClick={() => setIsTabletSidebarOpen(!isTabletSidebarOpen)}
            className="md:hidden p-2 rounded-xl border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:bg-[var(--bg-element-hover)] min-touch shrink-0"
            aria-label="Toggle Menu"
          >
            {isTabletSidebarOpen ? <X className="w-5 h-5 text-[var(--accent-500)]" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Synkron AI Logo Badge */}
          <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-gradient-to-br from-[var(--accent-500)] to-rose-600 text-white flex items-center justify-center font-black text-xs md:text-sm shadow-[var(--shadow-accent-glow)] shrink-0">
            SY
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm md:text-base font-black tracking-tight text-[var(--text-primary)]">Synkron AI</h1>
              <Badge variant="accent" className="hidden sm:inline-flex">WORKFORCE OS</Badge>
            </div>
            <p className="hidden md:block text-[10px] text-[var(--text-tertiary)] font-mono">INDIA ENTERPRISE (INR ₹)</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="icon"
            onClick={() => setIsDarkMode(!isDarkMode)}
            aria-label="Toggle Theme"
            className="min-touch shrink-0"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </Button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Responsive Drawer & Desktop Sidebar */}
        <aside className={`
          ${isTabletSidebarOpen ? 'block fixed inset-x-0 top-[61px] bottom-[64px] z-50 overflow-y-auto bg-[var(--bg-surface-raised)] border-b border-[var(--border-subtle)]' : 'hidden md:block'}
          w-full md:w-64 bg-[var(--bg-surface-raised)] border-r border-[var(--border-subtle)] p-4 flex flex-col justify-between shrink-0 z-30
        `}>
          <div className="space-y-1">
            <div className="flex items-center justify-between px-3 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-tertiary)]">
                SYNKRON ENTERPRISE OS
              </span>
              {isTabletSidebarOpen && (
                <button onClick={() => setIsTabletSidebarOpen(false)} className="md:hidden text-xs text-[var(--accent-500)] font-bold">
                  Close Menu ✕
                </button>
              )}
            </div>

            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); setIsTabletSidebarOpen(false); }}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 text-left min-touch
                    ${isActive 
                      ? 'bg-[var(--accent-500)] text-white shadow-[var(--shadow-accent-glow)]' 
                      : 'text-[var(--text-secondary)] hover:bg-[var(--bg-element-hover)] hover:text-[var(--text-primary)]'}
                  `}
                >
                  <span className={isActive ? 'text-white' : ''}>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* System Status Footer Card */}
          <div className="mt-8 p-3.5 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] text-[11px] space-y-1.5">
            <div className="flex items-center justify-between font-mono text-[var(--accent-500)] font-bold">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                SYNKRON OS LIVE
              </span>
              <span>100%</span>
            </div>
            <p className="text-[var(--text-tertiary)] leading-tight">
              Express SQLite Backend & Mobile Navigation Active.
            </p>
          </div>
        </aside>

        {/* View Viewport */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {activeTab === 'blog' && <BlogCmsAdminView />}
          {activeTab === 'phase17' && <Phase17GrowthOpsView />}
          {activeTab === 'phase16' && <Phase16SecurityView />}
          {activeTab === 'phase15' && <Phase15AccessibilityView />}
          {activeTab === 'phase14' && <Phase14WhiteLabelView />}
          {activeTab === 'phase13' && <Phase13PerformanceView />}
          {activeTab === 'phase12' && <Phase12EmployeeAppView />}
          {activeTab === 'phase11' && <Phase11AnalyticsView />}
          {activeTab === 'phase10' && <Phase10ComplianceView />}
          {activeTab === 'phase9' && <Phase9IntegrationsView />}
          {activeTab === 'phase8' && <Phase8EnterpriseView />}
          {activeTab === 'phase7' && <Phase7MarketingView onLaunchApp={() => setActiveTab('phase3')} />}
          {activeTab === 'phase6' && <Phase6AILayerView />}
          {activeTab === 'phase5' && <Phase5ReportingView />}
          {activeTab === 'phase4' && <Phase4PayrollEngineView />}
          {activeTab === 'phase3' && <Phase3ShiftManagementView />}
          {activeTab === 'phase2' && <Phase2AttendanceView />}
          {activeTab === 'phase1' && <Phase1AdminShellView onNavigateTab={setActiveTab} />}
          {activeTab === 'overview' && <OverviewView onNavigateTab={setActiveTab} />}
          {activeTab === 'colors' && <ColorTokensView />}
          {activeTab === 'typography' && <TypographyView />}
          {activeTab === 'spacing' && <SpacingElevationView />}
          {activeTab === 'motion' && <MotionTokensView />}
          {activeTab === 'components' && <ComponentsView />}
          {activeTab === 'patterns' && <WorkforcePatternsView />}
        </main>
      </div>

      {/* Mobile Bottom Navigation Tab Bar (<640px) */}
      <MobileBottomTabBar
        activeTab={activeTab}
        onNavigate={(tab) => { setActiveTab(tab); setIsTabletSidebarOpen(false); }}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Command Palette / Search Sheet */}
      <CommandPaletteModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={setActiveTab}
      />
    </div>
  );
};

export default App;

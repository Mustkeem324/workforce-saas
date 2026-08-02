import React from 'react';
import { Radio, Calendar, DollarSign, PieChart, Search, MoreHorizontal } from 'lucide-react';

export interface MobileBottomTabBarProps {
  activeTab: string;
  onNavigate: (tabId: string) => void;
  onOpenSearch: () => void;
}

export const MobileBottomTabBar: React.FC<MobileBottomTabBarProps> = ({
  activeTab,
  onNavigate,
  onOpenSearch
}) => {
  const tabs = [
    { id: 'phase2', label: 'Attendance', icon: <Radio className="w-5 h-5" /> },
    { id: 'phase3', label: 'Shifts', icon: <Calendar className="w-5 h-5" /> },
    { id: 'phase4', label: 'Payroll', icon: <DollarSign className="w-5 h-5" /> },
    { id: 'phase5', label: 'Reports', icon: <PieChart className="w-5 h-5" /> },
    { id: 'search', label: 'Search', icon: <Search className="w-5 h-5" />, isAction: true },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[var(--bg-surface-raised)]/95 backdrop-blur-md border-t border-[var(--border-subtle)] md:hidden pb-safe px-2 py-1 shadow-lg">
      <div className="grid grid-cols-5 gap-1 max-w-md mx-auto">
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          const handleClick = () => {
            if (tab.isAction) {
              onOpenSearch();
            } else {
              onNavigate(tab.id);
            }
          };

          return (
            <button
              key={tab.id}
              onClick={handleClick}
              className={`
                flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all min-touch select-none
                ${isActive 
                  ? 'text-[var(--accent-500)] font-extrabold scale-105' 
                  : 'text-[var(--text-tertiary)] hover:text-[var(--text-primary)]'}
              `}
            >
              <span>{tab.icon}</span>
              <span className="text-[10px] tracking-tight mt-0.5">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

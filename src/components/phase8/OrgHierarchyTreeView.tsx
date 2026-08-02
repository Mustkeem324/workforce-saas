import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronDown, Building2, MapPin, Search, Plus, Radio, Users, ShieldCheck, Layers } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Input } from '../ui/input';

export interface TreeNode {
  id: string;
  name: string;
  type: 'region' | 'cluster' | 'facility';
  code?: string;
  activeRoster?: number;
  children?: TreeNode[];
  isOpen?: boolean;
}

const INITIAL_HIERARCHY: TreeNode[] = [
  {
    id: 'reg-na',
    name: 'North America Operations',
    type: 'region',
    isOpen: true,
    children: [
      {
        id: 'cl-tx',
        name: 'Texas Logistics Cluster',
        type: 'cluster',
        isOpen: true,
        children: [
          { id: 'fac-aus', name: 'Austin Distribution Hub', type: 'facility', code: 'AUS-01', activeRoster: 184 },
          { id: 'fac-dal', name: 'Dallas Field Facility', type: 'facility', code: 'DAL-02', activeRoster: 42 },
          { id: 'fac-hou', name: 'Houston Freight Terminal', type: 'facility', code: 'HOU-03', activeRoster: 68 }
        ]
      },
      {
        id: 'cl-west',
        name: 'Western Region Cluster',
        type: 'cluster',
        isOpen: false,
        children: [
          { id: 'fac-phx', name: 'Phoenix Distribution Center', type: 'facility', code: 'PHX-04', activeRoster: 64 },
          { id: 'fac-den', name: 'Denver Fulfillment Hub', type: 'facility', code: 'DEN-05', activeRoster: 38 }
        ]
      }
    ]
  },
  {
    id: 'reg-emea',
    name: 'EMEA Operations',
    type: 'region',
    isOpen: false,
    children: [
      {
        id: 'cl-uk',
        name: 'UK & Ireland Cluster',
        type: 'cluster',
        isOpen: false,
        children: [
          { id: 'fac-lon', name: 'London Gateway Terminal', type: 'facility', code: 'LON-01', activeRoster: 92 }
        ]
      }
    ]
  }
];

export const OrgHierarchyTreeView: React.FC = () => {
  const [treeData, setTreeData] = useState<TreeNode[]>(INITIAL_HIERARCHY);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFacilityId, setActiveFacilityId] = useState('fac-aus');

  const toggleNode = (nodeId: string) => {
    const updateNodes = (nodes: TreeNode[]): TreeNode[] => {
      return nodes.map(n => {
        if (n.id === nodeId) {
          return { ...n, isOpen: !n.isOpen };
        }
        if (n.children) {
          return { ...n, children: updateNodes(n.children) };
        }
        return n;
      });
    };
    setTreeData(prev => updateNodes(prev));
  };

  const renderTree = (nodes: TreeNode[], depth = 0) => {
    return nodes.map(node => {
      const isFacility = node.type === 'facility';
      const isSelected = node.id === activeFacilityId;

      return (
        <div key={node.id} className="space-y-1 select-none" style={{ marginLeft: `${depth * 16}px` }}>
          <div
            onClick={() => {
              if (isFacility) setActiveFacilityId(node.id);
              else toggleNode(node.id);
            }}
            className={`
              p-2.5 rounded-xl cursor-pointer flex items-center justify-between text-xs transition-colors border
              ${isSelected 
                ? 'bg-[var(--accent-500)] text-white border-[var(--accent-500)] shadow-[var(--shadow-accent-glow)] font-bold' 
                : 'bg-[var(--bg-surface-raised)] border-[var(--border-subtle)] hover:bg-[var(--bg-element-hover)] text-[var(--text-primary)]'}
            `}
          >
            <div className="flex items-center gap-2">
              {!isFacility ? (
                <span className="text-[var(--text-tertiary)]">
                  {node.isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </span>
              ) : (
                <MapPin className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-[var(--accent-500)]'}`} />
              )}

              <span className="font-semibold">{node.name}</span>
              {node.code && <span className="font-mono text-[10px] opacity-80">({node.code})</span>}
            </div>

            <div className="flex items-center gap-2">
              {isFacility ? (
                <Badge variant={isSelected ? 'accent' : 'neutral'}>
                  {node.activeRoster} Roster
                </Badge>
              ) : (
                <Badge variant="neutral">
                  {node.type.toUpperCase()}
                </Badge>
              )}
            </div>
          </div>

          {node.children && node.isOpen && (
            <div className="space-y-1 pt-1">
              {renderTree(node.children, depth + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[var(--bg-surface-raised)] border border-[var(--border-default)] p-5 rounded-2xl shadow-[var(--shadow-1)]">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-[var(--accent-500)]" />
            <h2 className="text-lg font-extrabold text-[var(--text-primary)]">Enterprise Org Hierarchy Tree (50+ Locations)</h2>
            <Badge variant="accent">HIERARCHICAL TREE ENGINE</Badge>
          </div>
          <p className="text-xs text-[var(--text-tertiary)] mt-1">
            Replaces flat dropdowns with a collapsible Region → Cluster → Facility tree to scale past 50+ locations.
          </p>
        </div>

        <Input
          placeholder="Filter tree nodes..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          leftIcon={<Search className="w-4 h-4" />}
          className="w-48"
        />
      </div>

      {/* Main Tree & Active Facility Inspector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Collapsible Hierarchy Tree */}
        <Card elevation={2} className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
            <h3 className="text-sm font-bold text-[var(--text-primary)]">Global Multi-Entity Tree</h3>
            <Badge variant="neutral">50+ LOCATIONS READY</Badge>
          </div>

          <div className="space-y-2">
            {renderTree(treeData)}
          </div>
        </Card>

        {/* Right Column: Selected Node Context Inspector */}
        <Card elevation={2} className="space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
            <h3 className="text-sm font-bold text-[var(--text-primary)]">Facility Context Inspector</h3>
            <Badge variant="success" dot>ACTIVE CONTEXT</Badge>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent-500)] text-white font-bold text-sm flex items-center justify-center">
                AUS
              </div>
              <div>
                <h4 className="text-base font-extrabold text-[var(--text-primary)]">Austin Distribution Hub</h4>
                <p className="text-xs text-[var(--text-tertiary)]">Texas Cluster • North America Region</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] space-y-2 font-mono tabular-nums">
              <div className="flex justify-between">
                <span className="text-[var(--text-tertiary)] font-sans">Active Roster:</span>
                <span className="font-bold text-[var(--text-primary)]">184 Employees</span>
              </div>
              <div className="flex justify-between border-t border-[var(--border-subtle)] pt-1.5">
                <span className="text-[var(--text-tertiary)] font-sans">Geofence Boundary:</span>
                <span className="font-semibold text-emerald-400">150m Radius (Verified)</span>
              </div>
              <div className="flex justify-between border-t border-[var(--border-subtle)] pt-1.5">
                <span className="text-[var(--text-tertiary)] font-sans">Biometric Kiosks:</span>
                <span className="font-semibold text-[var(--text-primary)]">2 Terminals Online</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

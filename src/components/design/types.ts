import { Node, Edge } from "reactflow";

export interface FeatureNodeData {
  label: string;
  tags?: {
    complejidad?: string;
    tipo?: string;
  };
  selectedConnection?: string;
  onDelete?: () => void;
  onTagChange?: (category: 'complejidad' | 'tipo', value: string) => void;
  onLabelChange?: (newLabel: string) => void;
  onEdgeDelete?: (edgeId: string) => void;
  onEdgeUpdate?: (edgeId: string, newConnectionId: string) => void;
  getNodeLabel?: (nodeId: string) => string;
  edges?: Edge[];
  nodeId?: string;
}

export interface DesignState {
  nodes: Node[];
  edges: Edge[];
  selectedTool: string | null;
  selectedConnection: string | null;
  selectedLabel: string | null;
  modelName: string;
  author: string;
  currentVersion: string;
  isNewDialogOpen: boolean;
  newModelName: string;
  isVersionDialogOpen: boolean;
  isSidebarOpen: boolean;
}

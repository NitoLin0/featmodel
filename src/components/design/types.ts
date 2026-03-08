import { Node, Edge } from "reactflow";

export interface FeatureNodeData {
  label: string;
  tag?: string;
  onDelete?: () => void;
  onTagChange?: (tag: string) => void;
  onEdgeDelete?: (edgeId: string) => void;
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

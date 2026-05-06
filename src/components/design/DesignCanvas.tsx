import { useRef } from "react";
import ReactFlow, {
  Node,
  Edge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  MiniMap,
  Background,
  Panel,
} from "reactflow";
import "reactflow/dist/style.css";
import { useTheme } from "next-themes";
import { connectionTypes, labels } from "./constants";
import { Zap } from "lucide-react";

interface DesignCanvasProps {
  mode: "view" | "edit";
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  nodeTypes: any;
  selectedConnection: string | null;
  selectedLabel: string | null;
}

export function DesignCanvas({
  mode,
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  nodeTypes,
  selectedConnection,
  selectedLabel,
}: DesignCanvasProps) {
  const { theme } = useTheme();
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  const currentConnectionType = selectedConnection
    ? connectionTypes.find((c) => c.id === selectedConnection)
    : null;

  const currentLabel = selectedLabel
    ? labels.find((l) => l.id === selectedLabel)
    : null;

  return (
    <div className="flex-1 relative bg-linear-to-br from-transparent to-blue-50/10 dark:to-gray-900/10" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={mode === "edit" ? onNodesChange : () => {}}
        onEdgesChange={mode === "edit" ? onEdgesChange : () => {}}
        onConnect={mode === "edit" ? onConnect : () => {}}
        nodeTypes={nodeTypes}
        fitView
      >
        <MiniMap
          nodeColor={theme === "dark" ? "#374151" : "#eeeeee"}
          nodeStrokeColor={theme === "dark" ? "#1f2937" : "#111827"}
          maskColor={
            theme === "dark" ? "rgba(0, 0, 0, 0.8)" : "rgba(0, 0, 0, 0.4)"
          }
          className="pb-12"
          style={{
            backgroundColor: theme === "dark" ? "#1f2937" : "#f9fafb",
          }}
        />
        <Background gap={12} size={1} />
        <Panel position="top-left">
          <div className="bg-background/95 backdrop-blur-md border rounded-lg p-4 shadow-lg space-y-3 min-w-64 hover:shadow-xl transition-shadow">
            <div className="space-y-1">
              <p className="text-sm font-bold text-foreground">CuriConfig - Diseño</p>
              <p className="text-xs text-muted-foreground">
                {mode === "edit" ? "Modo Edición" : "Modo Visualización"}
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t">
              <div className="space-y-1">
                <p className="text-xs font-medium text-foreground">Conexión Activa:</p>
                {currentConnectionType ? (
                  <div className="flex items-center gap-2 px-2 py-1 bg-accent/50 rounded">
                    <div
                      className="w-3 h-0.5 rounded"
                      style={{
                        backgroundColor: currentConnectionType.color,
                        borderStyle: currentConnectionType.style,
                      }}
                    />
                    <span className="text-xs font-medium">
                      {currentConnectionType.label}
                    </span>
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground italic">
                    Selecciona una conexión
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <p className="text-xs font-medium text-foreground">Etiqueta Activa:</p>
                {currentLabel ? (
                  <div className="flex items-center gap-2 px-2 py-1 rounded" style={{
                    backgroundColor: `${currentLabel.color}20`,
                    border: `1px solid ${currentLabel.color}`,
                  }}>
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: currentLabel.color }}
                    />
                    <span className="text-xs font-medium" style={{ color: currentLabel.color }}>
                      {currentLabel.label}
                    </span>
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground italic">
                    Selecciona una etiqueta
                  </p>
                )}
              </div>

              <div className="space-y-1 pt-2">
                <p className="text-xs font-medium text-foreground">Estadísticas:</p>
                <div className="flex gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    {nodes.length} nodos
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M11.3 1.046A1 1 0 0010 2v5H5a1 1 0 00-.82 1.573l7 10A1 1 0 0013 17v-5h5a1 1 0 00.82-1.573l-7-10z" />
                    </svg>
                    {edges.length} conexiones
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
}

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

  return (
    <div className="flex-1" ref={reactFlowWrapper}>
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
          <div className="bg-background border rounded-lg p-2 shadow-sm">
            <p className="text-sm font-medium">CuriConfig - Diseño</p>
            <p className="text-xs text-muted-foreground">
              {selectedConnection
                ? `Conexión: ${
                    connectionTypes.find((c) => c.id === selectedConnection)
                      ?.label
                  }`
                : "Selecciona una conexion"}
            </p>
            <p className="text-xs text-muted-foreground">
              {selectedLabel
                ? `Etiqueta: ${
                    labels.find((l) => l.id === selectedLabel)?.label
                  }`
                : "Selecciona una etiqueta"}
            </p>
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
}

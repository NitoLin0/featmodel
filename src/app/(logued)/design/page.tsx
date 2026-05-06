"use client";

import { useCallback, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { SidebarProvider } from "@/components/ui/sidebar";
import {
  FeatureNode,
  DesignToolbar,
  DesignCanvas,
  DesignSidebar,
  VersionDialog,
  connectionTypes,
  complejidadLabels,
  tipoLabels,
} from "@/components/design";
import { Node, Edge, useNodesState, useEdgesState, addEdge } from "reactflow";
import { generateNodeId, getRandomPosition, incrementVersion } from "@/lib/helpers";

const nodeTypes = {
  feature: FeatureNode,
};

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

export default function DesignPage() {
  const searchParams = useSearchParams();
  const modelId = searchParams.get("model");
  const action = searchParams.get("action");

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [selectedConnection, setSelectedConnection] = useState<string | null>(null);
  const [selectedComplejidad, setSelectedComplejidad] = useState<string | null>(null);
  const [selectedTipo, setSelectedTipo] = useState<string | null>(null);
  const [modelName, setModelName] = useState(
    modelId ? `Modelo ${modelId}` : "Modelo sin nombre"
  );
  const [author, setAuthor] = useState("Usuario");
  const [mode, setMode] = useState<"view" | "edit">(
    action === "edit" ? "edit" : "view"
  );
  const [isNewDialogOpen, setIsNewDialogOpen] = useState(false);
  const [newModelName, setNewModelName] = useState("");
  const [currentVersion, setCurrentVersion] = useState("v1.0");
  const [isVersionDialogOpen, setIsVersionDialogOpen] = useState(false);
  const [isClearDialogOpen, setIsClearDialogOpen] = useState(false);

  // Actualizar modo cuando cambian los search params
  useEffect(() => {
    setMode(action === "edit" ? "edit" : "view");
  }, [action]);

  const onConnect = useCallback(
    (params: any) => {
      const connectionType = selectedConnection
        ? connectionTypes.find((c) => c.id === selectedConnection)
        : connectionTypes[0];
      const isLateralOnly = ['requires', 'include'].includes(selectedConnection || '');
      if (isLateralOnly && (params.sourceHandle === 'top' || params.sourceHandle === 'bottom' || params.targetHandle === 'left' || params.targetHandle === 'right')) {
        // Skip or warn for non-lateral, but for now allow - validate in future
      }
      setEdges((eds: Edge[]) => {
        const newEdges = addEdge(
          {
            ...params,
            type: "smoothstep",
            style: {
              stroke: connectionType?.color,
              strokeDasharray:
                connectionType?.style === "dashed" ? "5,5" : "none",
              strokeWidth: 2,
            },
            label: connectionType?.label,
            labelStyle: { fontSize: 12, fontWeight: "bold" },
          },
          eds
        );
        return newEdges;
      });
    },
    [selectedConnection, setEdges]
  );

  const handleEdgeUpdate = useCallback((edgeId: string, newConnId: string) => {
    const connType = connectionTypes.find((c) => c.id === newConnId);
    if (connType) {
      setEdges((eds) =>
        eds.map((e) =>
          e.id === edgeId
            ? {
                ...e,
                label: connType.label,
                style: {
                  stroke: connType.color,
                  strokeDasharray: connType.style === "dashed" ? "5,5" : "none",
                  strokeWidth: 2,
                },
              }
            : e
        )
      );
    }
  }, [setEdges]);

  const addNode = useCallback(() => {
    const newNode: Node = {
      id: generateNodeId(nodes.length),
      type: "feature",
      position: getRandomPosition(),
      data: {
        label: `Característica ${nodes.length + 1}`,
        tags: {
          complejidad: selectedComplejidad
            ? complejidadLabels.find((l) => l.id === selectedComplejidad)?.label
            : undefined,
          tipo: selectedTipo
            ? tipoLabels.find((l) => l.id === selectedTipo)?.label
            : undefined,
        },
        edges: edges,
        nodeId: undefined,
        onDelete: () => {
          setNodes((nds) =>
            nds.filter((n: Node) => n.id !== newNode.id)
          );
          setEdges((eds) =>
            eds.filter(
              (e: Edge) =>
                e.source !== newNode.id && e.target !== newNode.id
            )
          );
        },
        onTagChange: (category: 'complejidad' | 'tipo', value: string) => {
          setNodes((nds) =>
            nds.map((n: Node) => {
              if (n.id === newNode.id && n.data.tags) {
                return {
                  ...n,
                  data: {
                    ...n.data,
                    tags: {
                      ...n.data.tags,
                      [category]: value,
                    },
                  },
                };
              }
              return n;
            })
          );
        },
        onLabelChange: (newLabel: string) => {
          setNodes((nds) =>
            nds.map((n: Node) => {
              if (n.id === newNode.id) {
                return {
                  ...n,
                  data: {
                    ...n.data,
                    label: newLabel,
                  },
                };
              }
              return n;
            })
          );
        },
        onEdgeDelete: handleEdgeDelete,
      },
    };
    setNodes((nds: Node[]) => nds.concat(newNode));
  }, [nodes.length, edges, complejidadLabels, tipoLabels, setNodes, setEdges]);

  const handleNewModel = () => {
    if (newModelName.trim()) {
      setModelName(newModelName);
      setNodes([...initialNodes]);
      setEdges([...initialEdges]);
      setCurrentVersion("v1.0");
      setIsNewDialogOpen(false);
      setNewModelName("");
    }
  };

  const handleSave = () => {
    setCurrentVersion(incrementVersion(currentVersion));
  };

  const handleLoad = () => {
    // Placeholder para carga de modelo
  };

  const handleClear = () => {
    setNodes([...initialNodes]);
    setEdges([...initialEdges]);
  };

  const handleEdgeDelete = useCallback(
    (edgeId: string) => {
      setEdges((eds: Edge[]) =>
        eds.filter((e: Edge) => e.id !== edgeId)
      );
    },
    [setEdges]
  );

  const getNodeLabel = useCallback((nodeId: string) => {
    const node = nodes.find((n) => n.id === nodeId);
    return node?.data.label || nodeId;
  }, [nodes]);

  // Update nodes with edges data
  const nodesWithEdges = nodes.map((node) => ({
    ...node,
      data: {
        ...node.data,
        edges: edges,
        selectedConnection,
        getNodeLabel,
        onEdgeUpdate: handleEdgeUpdate,
        onEdgeDelete: handleEdgeDelete,
      },
  }));

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-background">
        {mode === "edit" && (
          <DesignSidebar
            selectedTool={selectedTool}
            setSelectedTool={setSelectedTool}
            selectedConnection={selectedConnection}
            setSelectedConnection={setSelectedConnection}
            selectedComplejidad={selectedComplejidad}
            setSelectedComplejidad={setSelectedComplejidad}
            selectedTipo={selectedTipo}
            setSelectedTipo={setSelectedTipo}
            addNode={addNode}
          />
        )}
        <div className="flex-1 flex flex-col">
          <DesignToolbar
            mode={mode}
            model={modelId}
            setMode={setMode}
            isNewDialogOpen={isNewDialogOpen}
            setIsNewDialogOpen={setIsNewDialogOpen}
            newModelName={newModelName}
            setNewModelName={setNewModelName}
            handleNewModel={handleNewModel}
            handleSave={handleSave}
            handleLoad={handleLoad}
            handleClear={handleClear}
            modelName={modelName}
            author={author}
            currentVersion={currentVersion}
            setIsVersionDialogOpen={setIsVersionDialogOpen}
            isClearDialogOpen={isClearDialogOpen}
            setIsClearDialogOpen={setIsClearDialogOpen}
          />
          <DesignCanvas
            mode={mode}
            nodes={nodesWithEdges}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            selectedConnection={selectedConnection}
            selectedComplejidad={selectedComplejidad}
            selectedTipo={selectedTipo}
          />
        </div>
        <VersionDialog
          isVersionDialogOpen={isVersionDialogOpen}
          setIsVersionDialogOpen={setIsVersionDialogOpen}
        />
      </div>
    </SidebarProvider>
  );
}

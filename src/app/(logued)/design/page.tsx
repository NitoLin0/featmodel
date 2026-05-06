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
  labels,
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
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
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

  const addNode = useCallback(() => {
    const newNode: Node = {
      id: generateNodeId(nodes.length),
      type: "feature",
      position: getRandomPosition(),
      data: {
        label: `Característica ${nodes.length + 1}`,
        tag: selectedLabel
          ? labels.find((l) => l.id === selectedLabel)?.label
          : undefined,
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
        onTagChange: (tag: string) => {
          setNodes((nds) =>
            nds.map((n: Node) =>
              n.id === newNode.id ? { ...n, data: { ...n.data, tag } } : n
            )
          );
        },
        onEdgeDelete: handleEdgeDelete,
      },
    };
    setNodes((nds: Node[]) => nds.concat(newNode));
  }, [nodes.length, edges, selectedLabel, setNodes, setEdges]);

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

  // Update nodes with edges data
  const nodesWithEdges = nodes.map((node) => ({
    ...node,
    data: {
      ...node.data,
      edges: edges,
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
            selectedLabel={selectedLabel}
            setSelectedLabel={setSelectedLabel}
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
            selectedLabel={selectedLabel}
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

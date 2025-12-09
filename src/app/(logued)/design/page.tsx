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
import { Node, Edge, useNodesState, useEdgesState } from "reactflow";

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
  const [modelName, setModelName] = useState(modelId ? `Modelo ${modelId}` : "Modelo sin nombre");
  const [author, setAuthor] = useState("Usuario");
  const [mode, setMode] = useState<"view" | "edit">(action === "edit" ? "edit" : "view");
  const [isNewDialogOpen, setIsNewDialogOpen] = useState(false);
  const [newModelName, setNewModelName] = useState("");
  const [currentVersion, setCurrentVersion] = useState("v1.0");
  const [isVersionDialogOpen, setIsVersionDialogOpen] = useState(false);
  const [isClearDialogOpen, setIsClearDialogOpen] = useState(false);


  useEffect(() => {
    console.log("Current nodes state:", nodes);
  }, [nodes]);

  useEffect(() => {
    console.log("Current edges state:", edges);
  }, [edges]);

  const onConnect = useCallback(
    (params: any) => {
      const connectionType = selectedConnection
        ? connectionTypes.find((c) => c.id === selectedConnection)
        : connectionTypes[0];
      setEdges((eds: Edge[]) => {
        const newEdges = require("reactflow").addEdge(
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
        console.log("Edges updated:", newEdges);
        return newEdges;
      });
    },
    [selectedConnection, setEdges]
  );

  const addNode = useCallback(() => {
    const newNode: Node = {
      id: `${nodes.length + 1}`,
      type: "feature",
      position: {
        x: Math.random() * 400 + 100,
        y: Math.random() * 400 + 100,
      },
      data: {
        label: `Característica ${nodes.length + 1}`,
        tag: selectedLabel
          ? labels.find((l) => l.id === selectedLabel)?.label
          : undefined,
        onDelete: () => {
          setNodes((nds) => {
            const updatedNodes = nds.filter((n: Node) => n.id !== newNode.id);
            console.log("Nodes updated after delete:", updatedNodes);
            return updatedNodes;
          });
          setEdges((eds) => {
            const updatedEdges = eds.filter(
              (e: Edge) => e.source !== newNode.id && e.target !== newNode.id
            );
            console.log("Edges updated after delete:", updatedEdges);
            return updatedEdges;
          });
        },
        onTagChange: (tag: string) => {
          setNodes((nds) => {
            const updatedNodes = nds.map((n: Node) =>
              n.id === newNode.id ? { ...n, data: { ...n.data, tag } } : n
            );
            console.log("Nodes updated after tag change:", updatedNodes);
            return updatedNodes;
          });
        },
      },
    };
    setNodes((nds: Node[]) => {
      const updatedNodes = nds.concat(newNode);
      console.log("Nodes updated after add:", updatedNodes);
      return updatedNodes;
    });
  }, [nodes.length, selectedLabel, setNodes, setEdges]);

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
    console.log("Guardando modelo:", { modelName, author, nodes, edges });
    const versionParts = currentVersion.split(".");
    const newVersion = `v${versionParts[0].substring(1)}.${Number.parseInt(versionParts[1]) + 1}`;
    setCurrentVersion(newVersion);
  };

  const handleLoad = () => {
    console.log("Cargando modelo...");
  };

  const handleClear = () => {
    setNodes([...initialNodes]);
    setEdges([...initialEdges]);
  };

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
            nodes={nodes}
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

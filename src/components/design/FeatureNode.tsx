import { useState } from "react";
import { NodeProps, Handle, Position, useStore} from "reactflow";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
} from "@/components/ui/context-menu";
import { Edit3, Trash2, Tag, GitBranch } from "lucide-react";
import { labels } from "./constants";
import { FeatureNodeData } from "./types";

const hexToRgba = (hex: string, alpha: number): string => {
  const r = Number.parseInt(hex.slice(1, 3), 16);
  const g = Number.parseInt(hex.slice(3, 5), 16);
  const b = Number.parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export function FeatureNode({ id, data, selected }: NodeProps<FeatureNodeData>) {
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(data.label || "");

  const nodes = useStore((state: any) => state.nodes) || [];
  const edges = useStore((state: any) => state.edges) || [];
  const setEdges = useStore((state: any) => state.setEdges);
  const mode = useStore((state: any) => state.mode) || "edit";

  const handleDoubleClick = () => {
    if (mode === "edit") {
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    data.label = label;
    setIsEditing(false);
  };

  const nodeEdges = Array.isArray(edges) ? edges.filter((e: any) => e.source === id || e.target === id) : [];

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div
          className={`px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400 dark:bg-gray-800 dark:border-gray-600 ${
            selected ? "border-blue-500" : ""
          }`}
          onDoubleClick={handleDoubleClick}
        >
          <Handle type="target" position={Position.Top} className="w-3 h-3" />
          <div className="flex items-center gap-2">
            {isEditing ? (
              <Input
                value={label}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLabel(e.target.value)}
                onBlur={handleSave}
                className="h-6 text-sm"
                autoFocus
              />
            ) : (
              <span className="text-sm font-medium">{data.label}</span>
            )}
            {data.tag && (
              <Badge
                variant="outline"
                className="text-xs"
                style={{
                  borderColor: labels.find((l) => l.label === data.tag)?.color,
                  color: labels.find((l) => l.label === data.tag)?.color,
                  backgroundColor: hexToRgba(
                    labels.find((l) => l.label === data.tag)?.color || "#000000",
                    0.2
                  ),
                }}
              >
                {data.tag}
              </Badge>
            )}
          </div>
          <Handle
            type="source"
            position={Position.Bottom}
            className="w-3 h-3"
          />
        </div>
      </ContextMenuTrigger>
      {mode === "edit" && (
        <ContextMenuContent>
          <ContextMenuItem onClick={() => setIsEditing(true)}>
            <Edit3 className="w-4 h-4 mr-2" />
            Editar nombre
          </ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger>
              <Tag className="w-4 h-4 mr-2" />
              Etiquetas
            </ContextMenuSubTrigger>
            <ContextMenuSubContent>
              {labels.map((label) => (
                <ContextMenuItem
                  key={label.id}
                  onClick={() => {
                    data.onTagChange?.(label.label);
                  }}
                >
                  <Badge
                    variant="outline"
                    className="mr-2 text-xs"
                    style={{
                      borderColor: label.color,
                      color: label.color,
                    }}
                  >
                    {label.label}
                  </Badge>
                </ContextMenuItem>
              ))}
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSub>
            <ContextMenuSubTrigger>
              <GitBranch className="w-4 h-4 mr-2" />
              Conexiones
            </ContextMenuSubTrigger>
            <ContextMenuSubContent>
              {nodeEdges.length > 0 ? nodeEdges.map((edge: any) => {
                const otherNode = nodes?.find((n: any) => n.id === (edge.source === id ? edge.target : edge.source));
                return (
                  <ContextMenuItem
                    key={edge.id}
                    onClick={() => setEdges(edges.filter((e: any) => e.id !== edge.id))}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    {edge.label} ({edge.source === id ? 'a' : 'de'} {otherNode?.data.label})
                  </ContextMenuItem>
                );
              }) : <ContextMenuItem disabled>No hay conexiones</ContextMenuItem>}
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuItem onClick={() => data.onDelete?.()}>
            <Trash2 className="w-4 h-4 mr-2" />
            Eliminar nodo
          </ContextMenuItem>
        </ContextMenuContent>
      )}
    </ContextMenu>
  );
}

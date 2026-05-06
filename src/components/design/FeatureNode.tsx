import { useState } from "react";
import { NodeProps, Handle, Position } from "reactflow";
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
  ContextMenuSeparator,
} from "@/components/ui/context-menu";
import { Edit3, Trash2, Tag, Link as LinkIcon } from "lucide-react";
import { labels } from "./constants";
import { FeatureNodeData } from "./types";
import { hexToRgba } from "@/lib/helpers";

export function FeatureNode({ id, data, selected, isConnectable }: NodeProps<FeatureNodeData>) {
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(data.label || "");

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (label.trim()) {
      data.label = label;
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setIsEditing(false);
    }
  };

  const selectedLabel = labels.find((l) => l.label === data.tag);

  // Get connected edges
  const connectedEdges = data.edges?.filter(
    (edge) => edge.source === id || edge.target === id
  ) || [];

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div
          className={`px-4 py-2 shadow-md rounded-md bg-white dark:bg-gray-800 border-2 transition-all duration-200 ${
            selected
              ? "border-blue-500 shadow-lg shadow-blue-500/50"
              : "border-stone-400 dark:border-gray-600"
          } hover:shadow-lg`}
          onDoubleClick={handleDoubleClick}
        >
          <Handle 
            type="target" 
            position={Position.Top} 
            className="w-3 h-3"
            isConnectable={isConnectable}
          />
          <div className="flex items-center gap-2 min-w-max">
            {isEditing ? (
              <Input
                value={label}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLabel(e.target.value)}
                onBlur={handleSave}
                onKeyDown={handleKeyDown}
                className="h-6 text-sm"
                autoFocus
              />
            ) : (
              <span className="text-sm font-medium">{data.label}</span>
            )}
            {data.tag && selectedLabel && (
              <Badge
                variant="outline"
                className="text-xs whitespace-nowrap"
                style={{
                  borderColor: selectedLabel.color,
                  color: selectedLabel.color,
                  backgroundColor: hexToRgba(selectedLabel.color, 0.2),
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
            isConnectable={isConnectable}
          />
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={() => setIsEditing(true)}>
          <Edit3 className="w-4 h-4 mr-2" />
          Editar nombre
        </ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>
            <Tag className="w-4 h-4 mr-2" />
            <span>Cambiar etiqueta</span>
          </ContextMenuSubTrigger>
          <ContextMenuSubContent>
            {labels.map((lbl) => (
              <ContextMenuItem
                key={lbl.id}
                onClick={() => data.onTagChange?.(lbl.label)}
                className="flex items-center gap-2"
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: lbl.color }}
                />
                {lbl.label}
              </ContextMenuItem>
            ))}
          </ContextMenuSubContent>
        </ContextMenuSub>
        {connectedEdges.length > 0 && (
          <>
            <ContextMenuSeparator />
            <ContextMenuSub>
              <ContextMenuSubTrigger>
                <LinkIcon className="w-4 h-4 mr-2" />
                <span>Conexiones ({connectedEdges.length})</span>
              </ContextMenuSubTrigger>
              <ContextMenuSubContent>
                {connectedEdges.map((edge) => (
                  <ContextMenuItem
                    key={edge.id}
                    onClick={() => data.onEdgeDelete?.(edge.id)}
                    className="text-orange-600 dark:text-orange-400 flex items-center justify-between"
                  >
                    <span className="text-xs">{edge.label || "Sin etiqueta"}</span>
                  </ContextMenuItem>
                ))}
              </ContextMenuSubContent>
            </ContextMenuSub>
          </>
        )}
        <ContextMenuSeparator />
        <ContextMenuItem
          onClick={() => data.onDelete?.()}
          className="text-red-600 dark:text-red-400"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Eliminar
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

import { useState, useCallback } from "react";
import { NodeProps, Handle, Position, Connection, Edge } from "reactflow";
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
import { complejidadLabels, tipoLabels, connectionTypes } from "./constants";
import { FeatureNodeData } from "./types";
import { hexToRgba } from "@/lib/helpers";

export function FeatureNode({
  id,
  data,
  selected,
  isConnectable,
}: NodeProps<FeatureNodeData>) {
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(data.label || "");

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (label.trim()) {
      // Avoid mutating props directly; update via node data callback if provided
      // Fallback to local mutation only if callback is not available.
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

  const complejidadLabel = data.tags?.complejidad
    ? complejidadLabels.find((l) => l.label === data.tags!.complejidad)
    : null;
  const tipoLabel = data.tags?.tipo
    ? tipoLabels.find((l) => l.label === data.tags!.tipo)
    : null;

  // Get connected edges
  const connectedEdges =
    data.edges?.filter((edge) => edge.source === id || edge.target === id) ||
    [];

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div
          className={`px-4 py-2 shadow-md rounded-md bg-white dark:bg-gray-800 border-2 transition-all duration-200 relative ${
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setLabel(e.target.value)
                }
                onBlur={handleSave}
                onKeyDown={handleKeyDown}
                className="h-6 text-sm"
                autoFocus
              />
            ) : (
              <span className="text-sm font-medium">{data.label}</span>
            )}
            {complejidadLabel && (
              <Badge
                variant="outline"
                className="text-xs whitespace-nowrap"
                style={{
                  borderColor: complejidadLabel.color,
                  color: complejidadLabel.color,
                  backgroundColor: hexToRgba(complejidadLabel.color, 0.2),
                }}
              >
                {complejidadLabel.label}
              </Badge>
            )}
            {tipoLabel && (
              <Badge
                variant="outline"
                className="text-xs whitespace-nowrap"
                style={{
                  borderColor: tipoLabel.color,
                  color: tipoLabel.color,
                  backgroundColor: hexToRgba(tipoLabel.color, 0.2),
                }}
              >
                {tipoLabel.label}
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
            <ContextMenuSub>
              <ContextMenuSubTrigger>Complejidad</ContextMenuSubTrigger>
              <ContextMenuSubContent>
                {complejidadLabels.map((lbl) => (
                  <ContextMenuItem
                    key={lbl.id}
                    onClick={() => data.onTagChange?.("complejidad", lbl.label)}
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
            <ContextMenuSub>
              <ContextMenuSubTrigger>Tipo</ContextMenuSubTrigger>
              <ContextMenuSubContent>
                {tipoLabels.map((lbl) => (
                  <ContextMenuItem
                    key={lbl.id}
                    onClick={() => data.onTagChange?.("tipo", lbl.label)}
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
                  <ContextMenuSub key={edge.id}>
                    <ContextMenuSubTrigger>
                      {edge.source === id ? "→" : "←"}{" "}
                      {data.getNodeLabel?.(
                        edge.source === id
                          ? edge.target
                          : edge.source || "Unknown"
                      )}{" "}
                      ({edge.label || "Sin tipo"})
                    </ContextMenuSubTrigger>
                    <ContextMenuSubContent>
                      <ContextMenuItem
                        onClick={() => data.onEdgeDelete?.(edge.id)}
                        className="text-orange-600 dark:text-orange-400"
                      >
                        Eliminar relación
                      </ContextMenuItem>
                      <ContextMenuSub>
                        <ContextMenuSubTrigger>
                          Cambiar tipo
                        </ContextMenuSubTrigger>
                        <ContextMenuSubContent>
                          {connectionTypes.map((conn) => (
                            <ContextMenuItem
                              key={conn.id}
                              onClick={() =>
                                data.onEdgeUpdate?.(edge.id, conn.id)
                              }
                              className="flex items-center gap-2"
                            >
                              <div
                                className="w-3 h-0.5 rounded"
                                style={{
                                  backgroundColor: conn.color,
                                  borderStyle: conn.style,
                                }}
                              />
                              {conn.label}
                            </ContextMenuItem>
                          ))}
                        </ContextMenuSubContent>
                      </ContextMenuSub>
                    </ContextMenuSubContent>
                  </ContextMenuSub>
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

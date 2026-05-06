import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plus, Zap } from "lucide-react";
import { connectionTypes, labels } from "./constants";

interface DesignSidebarProps {
  selectedTool: string | null;
  setSelectedTool: React.Dispatch<React.SetStateAction<string | null>>;
  selectedConnection: string | null;
  setSelectedConnection: React.Dispatch<React.SetStateAction<string | null>>;
  selectedLabel: string | null;
  setSelectedLabel: React.Dispatch<React.SetStateAction<string | null>>;
  addNode: () => void;
}

export function DesignSidebar({
  selectedTool,
  setSelectedTool,
  selectedConnection,
  setSelectedConnection,
  selectedLabel,
  setSelectedLabel,
  addNode,
}: DesignSidebarProps) {
  return (
    <div className="w-64 border-r bg-background/95 backdrop-blur-sm flex flex-col shadow-lg">
      <div className="px-4 py-3 border-b bg-linear-to-r from-blue-500/10 to-purple-500/10">
        <h2 className="text-lg font-semibold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Herramientas
        </h2>
        <p className="text-xs text-muted-foreground mt-1">Diseña tu modelo</p>
      </div>
      <div className="flex-1 overflow-y-auto px-3 py-4">
        <div className="space-y-5">
          <div>
            <h3 className="text-sm font-semibold mb-3 text-foreground flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              Nodos
            </h3>
            <div className="space-y-2">
              <button
                onClick={() => {
                  setSelectedTool("node");
                  addNode();
                }}
                className={`w-full flex items-center px-3 py-2.5 text-sm rounded-md font-medium transition-all duration-200 transform hover:scale-105 ${
                  selectedTool === "node"
                    ? "bg-blue-500 text-white shadow-lg"
                    : "bg-secondary hover:bg-accent text-foreground"
                }`}
              >
                <Plus className="w-4 h-4 mr-2" />
                <span>Nueva Característica</span>
              </button>
            </div>
          </div>
          <Separator className="my-1" />
          <div>
            <h3 className="text-sm font-semibold mb-3 text-foreground flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.3A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
              </svg>
              Conexiones
            </h3>
            <div className="space-y-2">
              {connectionTypes.map((connection) => (
                <button
                  key={connection.id}
                  onClick={() => setSelectedConnection(connection.id)}
                  className={`w-full flex items-center px-3 py-3 text-sm rounded-md transition-all duration-200 ${
                    selectedConnection === connection.id
                      ? "bg-accent ring-2 ring-offset-2 ring-offset-background"
                      : "bg-secondary hover:bg-accent"
                  }`}
                  style={{
                    borderColor: selectedConnection === connection.id ? connection.color : undefined,
                  }}
                >
                  <div
                    className="w-3 h-0.5 rounded mr-3 shrink-0"
                    style={{
                      backgroundColor: connection.color,
                    }}
                  />
                  <span className="text-sm font-medium flex-1 text-left">{connection.label}</span>
                  <div
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: connection.color }}
                  />
                </button>
              ))}
            </div>
          </div>
          <Separator className="my-1" />
          <div>
            <h3 className="text-sm font-semibold mb-3 text-foreground flex items-center gap-2">
              <svg className="w-4 h-4 text-rose-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 3a2 2 0 012-2h6a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V3z" />
              </svg>
              Etiquetas
            </h3>
            <div className="space-y-2">
              {labels.map((label) => (
                <button
                  key={label.id}
                  onClick={() => setSelectedLabel(label.id)}
                  className={`w-full flex items-center px-3 py-3 text-sm rounded-md transition-all duration-200 ${
                    selectedLabel === label.id
                      ? "ring-2 ring-offset-2 ring-offset-background"
                      : "hover:scale-105"
                  }`}
                  style={{
                    backgroundColor: selectedLabel === label.id ? `${label.color}20` : "transparent",
                  }}
                >
                  <Badge
                    variant="outline"
                    className="mr-2 text-sm font-medium"
                    style={{
                      borderColor: label.color,
                      color: label.color,
                      backgroundColor: `${label.color}15`,
                    }}
                  >
                    {label.label}
                  </Badge>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

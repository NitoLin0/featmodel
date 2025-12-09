import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plus} from "lucide-react";
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
    <div className="w-64 border-r bg-background flex flex-col">
      <div className="px-4 py-2 border-b">
        <h2 className="text-lg font-semibold">Herramientas</h2>
      </div>
      <div className="flex-1 overflow-y-auto px-2 py-4">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Nodos</h3>
            <div className="space-y-1">
              <button
                onClick={() => {
                  setSelectedTool("node");
                  addNode();
                }}
                className={`w-full flex items-center px-3 py-2 text-sm rounded-md hover:bg-accent ${
                  selectedTool === "node" ? "bg-accent" : ""
                }`}
              >
                <Plus className="w-4 h-4 mr-2" />
                <span>Característica</span>
              </button>
            </div>
          </div>
          <Separator />
          <div>
            <h3 className="text-sm font-medium mb-2">Conexiones</h3>
            <div className="space-y-1">
              {connectionTypes.map((connection) => (
                <button
                  key={connection.id}
                  onClick={() => setSelectedConnection(connection.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm rounded-md hover:bg-accent ${
                    selectedConnection === connection.id ? "bg-accent" : ""
                  }`}
                >
                  <div
                    className="w-4 h-0.5 rounded mr-2"
                    style={{
                      backgroundColor: connection.color,
                      borderStyle: connection.style,
                      borderWidth: connection.style === "dashed" ? "1px" : "0",
                    }}
                  />
                  <span>{connection.label}</span>
                </button>
              ))}
            </div>
          </div>
          <Separator />
          <div>
            <h3 className="text-sm font-medium mb-2">Etiquetas</h3>
            <div className="space-y-1">
              {labels.map((label) => (
                <button
                  key={label.id}
                  onClick={() => setSelectedLabel(label.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm rounded-md hover:bg-accent ${
                    selectedLabel === label.id ? "bg-accent" : ""
                  }`}
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
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { Plus, Save, FolderOpen, RotateCcw, GitBranch } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

interface DesignToolbarProps {
  mode: "view" | "edit";
  model: string | null;
  setMode: React.Dispatch<React.SetStateAction<"view" | "edit">>;
  isNewDialogOpen: boolean;
  setIsNewDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  newModelName: string;
  setNewModelName: React.Dispatch<React.SetStateAction<string>>;
  handleNewModel: () => void;
  handleSave: () => void;
  handleLoad: () => void;
  handleClear: () => void;
  modelName: string;
  author: string;
  currentVersion: string;
  setIsVersionDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isClearDialogOpen: boolean;
  setIsClearDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function DesignToolbar({
  mode,
  model,
  setMode,
  isNewDialogOpen,
  setIsNewDialogOpen,
  newModelName,
  setNewModelName,
  handleNewModel,
  handleSave,
  handleLoad,
  handleClear,
  modelName,
  author,
  currentVersion,
  setIsVersionDialogOpen,
  isClearDialogOpen,
  setIsClearDialogOpen,
}: DesignToolbarProps) {
  return (
    <div className="h-14 border-b bg-background/95 backdrop-blur-sm flex items-center justify-between px-4 shadow-sm">
      <div className="flex space-x-2">
        {mode === "edit" && (
          <>
            <Dialog open={isNewDialogOpen} onOpenChange={setIsNewDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Nuevo Modelo
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Crear Nuevo Modelo</DialogTitle>
                  <DialogDescription>
                    Ingresa el nombre del nuevo modelo de características.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Nombre
                    </Label>
                    <Input
                      id="name"
                      value={newModelName}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setNewModelName(e.target.value)
                      }
                      className="col-span-3"
                      placeholder="Mi nuevo modelo..."
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleNewModel}>Crear Modelo</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Button
              variant="outline"
              size="sm"
              onClick={handleSave}
              className="hover:bg-green-50 dark:hover:bg-green-950 transition-colors"
            >
              <Save className="w-4 h-4 mr-2" />
              Guardar
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsVersionDialogOpen(true)}
              className="hover:bg-purple-50 dark:hover:bg-purple-950 transition-colors"
            >
              <GitBranch className="w-4 h-4 mr-2" />
              Versiones
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleLoad}
              className="hover:bg-orange-50 dark:hover:bg-orange-950 transition-colors"
            >
              <FolderOpen className="w-4 h-4 mr-2" />
              Cargar
            </Button>

            <Dialog
              open={isClearDialogOpen}
              onOpenChange={setIsClearDialogOpen}
            >
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Limpiar
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Limpiar Modelo</DialogTitle>
                  <DialogDescription>
                    ¿Estás seguro de que quieres limpiar el canvas? Esta
                    acción no se puede deshacer.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsClearDialogOpen(false)}
                  >
                    Cancelar
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      handleClear();
                      setIsClearDialogOpen(false);
                    }}
                  >
                    Limpiar
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>
        )}
        {mode === "view" && (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsVersionDialogOpen(true)}
            >
              <GitBranch className="w-4 h-4 mr-2" />
              Versiones
            </Button>
            <Link href={`/design?model=${model || modelName}&action=edit`}>
              <Button size="sm">
                Editar
              </Button>
            </Link>
          </>
        )}
      </div>

      <div className="flex items-center space-x-4 text-sm">
        <div className="hidden sm:flex items-center space-x-3">
          <div className="flex items-center gap-1">
            <span className="text-muted-foreground">Modelo:</span>
            <span className="font-medium text-foreground">{modelName}</span>
          </div>
          <div className="w-px h-4 bg-border" />
          <div className="flex items-center gap-1">
            <span className="text-muted-foreground">Versión:</span>
            <span className="font-medium text-foreground bg-blue-50 dark:bg-blue-950 px-2 py-1 rounded text-xs">
              {currentVersion}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

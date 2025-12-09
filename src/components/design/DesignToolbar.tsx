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
    <div className="h-12 border-b bg-background flex items-center justify-between px-4">
      <div className="flex space-x-2">
        {mode === "edit" && (
          <>
            <Dialog open={isNewDialogOpen} onOpenChange={setIsNewDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Nuevo
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
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewModelName(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleNewModel}>Crear Modelo</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Button variant="outline" size="sm" onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Guardar
            </Button>

            <Button variant="outline" size="sm" onClick={() => setIsVersionDialogOpen(true)}>
              <GitBranch className="w-4 h-4 mr-2" />
              Versiones
            </Button>

            <Button variant="outline" size="sm" onClick={handleLoad}>
              <FolderOpen className="w-4 h-4 mr-2" />
              Cargar
            </Button>

            <Dialog open={isClearDialogOpen} onOpenChange={setIsClearDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Limpiar
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Limpiar Modelo</DialogTitle>
                  <DialogDescription>
                    ¿Estás seguro de que quieres limpiar el canvas? Esta acción no se puede deshacer.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsClearDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button  onClick={() => {
                    handleClear();
                    setIsClearDialogOpen(false);
                  }}>
                    Limpiar
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>
        )}
        {mode === "view" && (
          <>
            <Button variant="outline" size="sm" onClick={() => setIsVersionDialogOpen(true)}>
              <GitBranch className="w-4 h-4 mr-2" />
              Versiones
            </Button>
            <Button variant="outline" size="sm" onClick={() => setMode("edit")}>
              <Link href={`/design?model=${model || modelName}&action=edit`}>
               Editar
              </Link>
            </Button>
          </>
        )}
      </div>

      <div className="flex items-center space-x-4">
        <div className="text-sm text-muted-foreground">
          Modelo: <span className="font-medium">{modelName}</span> |
          Autor: <span className="font-medium">{author}</span> | Versión:{" "}
          <span className="font-medium">{currentVersion}</span>
        </div>
      </div>
    </div>
  );
}

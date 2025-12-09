import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { GitBranch } from "lucide-react";
import { versions } from "./constants";

interface VersionDialogProps {
  isVersionDialogOpen: boolean;
  setIsVersionDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function VersionDialog({
  isVersionDialogOpen,
  setIsVersionDialogOpen,
}: Readonly<VersionDialogProps>) {
  return (
    <Dialog
      open={isVersionDialogOpen}
      onOpenChange={setIsVersionDialogOpen}
    >
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Historial de Versiones</DialogTitle>
          <DialogDescription>
            Historial de cambios del modelo actual.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 max-h-64 overflow-y-auto">
          {versions.map((version) => (
            <div
              key={version.id}
              className="flex items-start space-x-3 p-3 border rounded-lg"
            >
              <GitBranch className="w-4 h-4 mt-0.5 text-muted-foreground" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{version.id}</p>
                  <p className="text-xs text-muted-foreground">
                    {version.date}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {version.changes}
                </p>
              </div>
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button onClick={() => setIsVersionDialogOpen(false)}>
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

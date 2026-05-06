"use client";

import { useState } from "react";
import { MODELS } from "@/data/models";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, Trash2, Users, Edit3 } from "lucide-react";

// Mock data para usuarios colaboradores
const AVAILABLE_USERS = [
  { id: 1, name: "Juan Pérez", email: "juan@example.com" },
  { id: 2, name: "María García", email: "maria@example.com" },
  { id: 3, name: "Carlos López", email: "carlos@example.com" },
  { id: 4, name: "Ana Rodríguez", email: "ana@example.com" },
  { id: 5, name: "David Chen", email: "david@example.com" },
];

interface ModelWithCollaborators {
  id: number;
  title: string;
  author: string;
  version: string;
  collaborators: typeof AVAILABLE_USERS;
}

export default function ModelosPage() {
  const router = useRouter();
  const [models, setModels] = useState<ModelWithCollaborators[]>(
    MODELS.map((m) => ({
      ...m,
      collaborators: [],
    }))
  );

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newModelName, setNewModelName] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [modelToDelete, setModelToDelete] = useState<number | null>(null);
  const [isCollaboratorsDialogOpen, setIsCollaboratorsDialogOpen] =
    useState(false);
  const [selectedModelForCollaborators, setSelectedModelForCollaborators] =
    useState<number | null>(null);

  const handleCreateModel = () => {
    if (newModelName.trim()) {
      const newId = Math.max(...models.map((m) => m.id), 0) + 1;
      const newModel: ModelWithCollaborators = {
        id: newId,
        title: newModelName,
        author: "Usuario",
        version: "v1.0",
        collaborators: [],
      };
      setModels([...models, newModel]);
      setNewModelName("");
      setIsCreateDialogOpen(false);
      // Redirigir directamente al diseño en modo edición
      router.push(`/design?model=${newId}&action=edit`);
    }
  };

  const handleDeleteModel = (modelId: number) => {
    setModelToDelete(modelId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (modelToDelete !== null) {
      setModels(models.filter((m) => m.id !== modelToDelete));
      setIsDeleteDialogOpen(false);
      setModelToDelete(null);
    }
  };

  const handleAddCollaborator = (userId: number) => {
    if (selectedModelForCollaborators !== null) {
      const user = AVAILABLE_USERS.find((u) => u.id === userId);
      if (user) {
        setModels(
          models.map((m) =>
            m.id === selectedModelForCollaborators
              ? {
                  ...m,
                  collaborators: m.collaborators.some((c) => c.id === userId)
                    ? m.collaborators
                    : [...m.collaborators, user],
                }
              : m
          )
        );
      }
    }
  };

  const model = models.find((m) => m.id === selectedModelForCollaborators);
  const availableCollaborators = AVAILABLE_USERS.filter(
    (user) => !model?.collaborators.some((c) => c.id === user.id)
  );

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Modelos de Características
            </h1>
            <p className="text-muted-foreground">
              Gestiona tus modelos de características
            </p>
          </div>
          <Button
            onClick={() => setIsCreateDialogOpen(true)}
            className="bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
            size="lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            Crear Modelo
          </Button>
        </div>

        {models.length === 0 ? (
          <Card className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              No hay modelos creados aún
            </p>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              Crear primer modelo
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {models.map((model) => (
              <Card
                key={model.id}
                className="shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                <CardHeader>
                  <CardTitle className="text-xl">{model.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-sm text-muted-foreground">
                    Autor: {model.author}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Versión: {model.version}
                  </p>
                  {model.collaborators.length > 0 && (
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-sm font-medium mb-2">
                        Colaboradores ({model.collaborators.length})
                      </p>

                      <div className="max-h-24 overflow-y-auto pr-2">
                        <div className="space-y-1">
                          {model.collaborators.slice(0, 2).map((collab) => (
                            <p
                              key={collab.id}
                              className="text-xs text-muted-foreground"
                            >
                              {collab.name}
                            </p>
                          ))}

                          {model.collaborators.length > 2 && (
                            <p className="text-xs text-muted-foreground">
                              ...y {model.collaborators.length - 2} colaboradores más
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Link
                    href={`/design?model=${model.id}&action=view`}
                    className="flex-1"
                  >
                    <Button variant="outline" className="w-full">
                      Ver
                    </Button>
                  </Link>
                  <Button
                    onClick={() =>
                      router.push(
                        `/design?model=${model.id}&action=edit`
                      )
                    }
                    className="flex-1"
                    variant="default"
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    Editar
                  </Button>
                  <Button
                    onClick={() => {
                      setSelectedModelForCollaborators(model.id);
                      setIsCollaboratorsDialogOpen(true);
                    }}
                    variant="ghost"
                    size="sm"
                    title="Agregar colaboradores"
                  >
                    <Users className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => handleDeleteModel(model.id)}
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                    title="Eliminar modelo"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Dialog para crear modelo */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crear nuevo modelo</DialogTitle>
            <DialogDescription>
              Ingresa el nombre del nuevo modelo de características
            </DialogDescription>
          </DialogHeader>
          <Input
            placeholder="Nombre del modelo"
            value={newModelName}
            onChange={(e) => setNewModelName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleCreateModel();
              }
            }}
          />
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleCreateModel}
              disabled={!newModelName.trim()}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Crear
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de confirmación para eliminar */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar modelo?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. El modelo será eliminado permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Dialog para agregar colaboradores */}
      <Dialog
        open={isCollaboratorsDialogOpen}
        onOpenChange={setIsCollaboratorsDialogOpen}
      >
        <DialogContent className="max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Agregar colaboradores</DialogTitle>
            <DialogDescription>
              Selecciona usuarios para agregar como colaboradores
            </DialogDescription>
          </DialogHeader>

          {availableCollaborators.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No hay usuarios disponibles para agregar
            </p>
          ) : (
            <div className="space-y-2">
              {availableCollaborators.map((user) => (
                <button
                  key={user.id}
                  onClick={() => handleAddCollaborator(user.id)}
                  className="w-full flex items-center gap-3 p-3 rounded-md border hover:bg-accent transition-colors text-left"
                >
                  <div className="flex-1">
                    <p className="font-medium text-sm">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <Plus className="w-4 h-4 text-muted-foreground" />
                </button>
              ))}
            </div>
          )}

          {model?.collaborators && model.collaborators.length > 0 && (
            <div className="mt-6 pt-6 border-t">
              <h4 className="font-medium text-sm mb-3">
                Colaboradores actuales
              </h4>
              <div className="space-y-2">
                {model.collaborators.map((collab) => (
                  <div
                    key={collab.id}
                    className="flex items-center gap-3 p-2 rounded-md bg-accent/50"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-sm">{collab.name}</p>
                    </div>
                    <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-1 rounded">
                      Agregado
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              onClick={() => setIsCollaboratorsDialogOpen(false)}
              className="w-full"
            >
              Listo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

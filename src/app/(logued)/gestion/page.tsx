"use client";

import { useState, useMemo } from "react";
import { INITIAL_USERS, User } from "@/data/users";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, Search, Edit3, Trash2, MoreVertical, ChevronLeft, ChevronRight } from "lucide-react";

const ITEMS_PER_PAGE = 5;

type UserRole = "admin" | "profesor" | "estudiante";

interface UserFormData {
  name: string;
  email: string;
  role: UserRole;
  department: string;
}

export default function GestionPage() {
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    email: "",
    role: "estudiante",
    department: "",
  });

  // Filtrar usuarios según búsqueda
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const query = searchQuery.toLowerCase();
      return (
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.department.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query)
      );
    });
  }, [users, searchQuery]);

  // Calcular paginación
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Reset page cuando se busca
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  // Crear usuario
  const handleCreateUser = () => {
    if (formData.name.trim() && formData.email.trim() && formData.department.trim()) {
      const newUser: User = {
        id: Math.max(...users.map((u) => u.id), 0) + 1,
        ...formData,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setUsers([...users, newUser]);
      setFormData({
        name: "",
        email: "",
        role: "estudiante",
        department: "",
      });
      setIsCreateDialogOpen(false);
    }
  };

  // Editar usuario
  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
    });
    setIsEditDialogOpen(true);
  };

  // Guardar cambios de usuario
  const handleSaveEdit = () => {
    if (editingUser && formData.name.trim() && formData.email.trim() && formData.department.trim()) {
      setUsers(
        users.map((u) =>
          u.id === editingUser.id
            ? {
                ...u,
                ...formData,
              }
            : u
        )
      );
      setEditingUser(null);
      setFormData({
        name: "",
        email: "",
        role: "estudiante",
        department: "",
      });
      setIsEditDialogOpen(false);
    }
  };

  // Eliminar usuario
  const handleDeleteUser = (userId: number) => {
    setUserToDelete(userId);
    setIsDeleteDialogOpen(true);
  };

  // Confirmar eliminación
  const confirmDelete = () => {
    if (userToDelete !== null) {
      setUsers(users.filter((u) => u.id !== userToDelete));
      setUserToDelete(null);
      setIsDeleteDialogOpen(false);
      if (paginatedUsers.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  // Obtener color de badge según rol
  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "profesor":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "estudiante":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Panel de Gestión
            </h1>
            <p className="text-muted-foreground">
              Administra los usuarios del sistema
            </p>
          </div>
          <Button
            onClick={() => setIsCreateDialogOpen(true)}
            className="bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
            size="lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            Nuevo Usuario
          </Button>
        </div>

        {/* Búsqueda */}
        <Card className="mb-4">
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre, email, departamento o rol..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Tabla de usuarios */}
        <Card>
          <CardHeader>
            <CardTitle>
              Usuarios ({filteredUsers.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {paginatedUsers.length === 0 ? (
              <div className="text-center py-4">
                <p className="text-muted-foreground mb-4">
                  {searchQuery
                    ? "No se encontraron usuarios que coincidan con tu búsqueda"
                    : "No hay usuarios"}
                </p>
                {searchQuery && (
                  <Button
                    variant="outline"
                    onClick={() => handleSearch("")}
                  >
                    Limpiar búsqueda
                  </Button>
                )}
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-4 font-semibold">Nombre</th>
                        <th className="text-left py-2 px-4 font-semibold">Email</th>
                        <th className="text-left py-2 px-4 font-semibold">Rol</th>
                        <th className="text-left py-2 px-4 font-semibold">Departamento</th>
                        <th className="text-left py-2 px-4 font-semibold">Fecha Creación</th>
                        <th className="text-center py-2 px-4 font-semibold">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedUsers.map((user) => (
                        <tr
                          key={user.id}
                          className="border-b hover:bg-accent/50 transition-colors"
                        >
                          <td className="py-2 px-4">
                            <p className="font-medium">{user.name}</p>
                          </td>
                          <td className="py-2 px-4">
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </td>
                          <td className="py-2 px-4">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(
                                user.role
                              )}`}
                            >
                              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                            </span>
                          </td>
                          <td className="py-2 px-4">
                            <p className="text-sm">{user.department}</p>
                          </td>
                          <td className="py-2 px-4">
                            <p className="text-sm text-muted-foreground">{user.createdAt}</p>
                          </td>
                          <td className="py-2 px-4">
                            <div className="flex justify-center">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreVertical className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem
                                    onClick={() => handleEditUser(user)}
                                    className="flex items-center gap-2 cursor-pointer"
                                  >
                                    <Edit3 className="w-4 h-4" />
                                    Editar
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => handleDeleteUser(user.id)}
                                    className="flex items-center gap-2 cursor-pointer text-red-600 dark:text-red-400"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                    Eliminar
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Paginación */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between mt-6 pt-2 border-t">
                    <p className="text-sm text-muted-foreground">
                      Página {currentPage} de {totalPages} • Mostrando{" "}
                      {paginatedUsers.length} de {filteredUsers.length} usuarios
                    </p>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Anterior
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setCurrentPage(Math.min(totalPages, currentPage + 1))
                        }
                        disabled={currentPage === totalPages}
                      >
                        Siguiente
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Dialog crear usuario */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crear nuevo usuario</DialogTitle>
            <DialogDescription>
              Ingresa la información del nuevo usuario
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label htmlFor="create-name" className="text-sm font-medium">Nombre</label>
              <Input
                id="create-name"
                placeholder="Nombre completo"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="create-email" className="text-sm font-medium">Email</label>
              <Input
                id="create-email"
                type="email"
                placeholder="correo@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="create-role" className="text-sm font-medium">Rol</label>
              <select
                id="create-role"
                value={formData.role}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    role: e.target.value as UserRole,
                  })
                }
                className="w-full px-3 py-2 border rounded-md bg-background"
              >
                <option value="estudiante">Estudiante</option>
                <option value="profesor">Profesor</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div>
              <label htmlFor="create-department" className="text-sm font-medium">Departamento</label>
              <Input
                id="create-department"
                placeholder="Nombre del departamento"
                value={formData.department}
                onChange={(e) =>
                  setFormData({ ...formData, department: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleCreateUser}
              disabled={
                !formData.name.trim() ||
                !formData.email.trim() ||
                !formData.department.trim()
              }
              className="bg-blue-600 hover:bg-blue-700"
            >
              Crear
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog editar usuario */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar usuario</DialogTitle>
            <DialogDescription>
              Modifica la información del usuario
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label htmlFor="edit-name" className="text-sm font-medium">Nombre</label>
              <Input
                id="edit-name"
                placeholder="Nombre completo"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="edit-email" className="text-sm font-medium">Email</label>
              <Input
                id="edit-email"
                type="email"
                placeholder="correo@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="edit-role" className="text-sm font-medium">Rol</label>
              <select
                id="edit-role"
                value={formData.role}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    role: e.target.value as UserRole,
                  })
                }
                className="w-full px-3 py-2 border rounded-md bg-background"
              >
                <option value="estudiante">Estudiante</option>
                <option value="profesor">Profesor</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div>
              <label htmlFor="edit-department" className="text-sm font-medium">Departamento</label>
              <Input
                id="edit-department"
                placeholder="Nombre del departamento"
                value={formData.department}
                onChange={(e) =>
                  setFormData({ ...formData, department: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSaveEdit}
              disabled={
                !formData.name.trim() ||
                !formData.email.trim() ||
                !formData.department.trim()
              }
              className="bg-blue-600 hover:bg-blue-700"
            >
              Guardar Cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Alert dialog eliminar */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar usuario?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. El usuario será eliminado permanentemente.
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
    </div>
  );
}

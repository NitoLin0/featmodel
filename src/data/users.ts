export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "profesor" | "estudiante";
  department: string;
  createdAt: string;
}

export const INITIAL_USERS: User[] = [
  {
    id: 1,
    name: "Juan Pérez",
    email: "juan@example.com",
    role: "admin",
    department: "Informática",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    name: "María García",
    email: "maria@example.com",
    role: "profesor",
    department: "Ingeniería Software",
    createdAt: "2024-02-10",
  },
  {
    id: 3,
    name: "Carlos López",
    email: "carlos@example.com",
    role: "profesor",
    department: "Sistemas",
    createdAt: "2024-02-20",
  },
  {
    id: 4,
    name: "Ana Rodríguez",
    email: "ana@example.com",
    role: "estudiante",
    department: "Informática",
    createdAt: "2024-03-05",
  },
  {
    id: 5,
    name: "David Chen",
    email: "david@example.com",
    role: "estudiante",
    department: "Ingeniería Software",
    createdAt: "2024-03-12",
  },
  {
    id: 6,
    name: "Elena Martínez",
    email: "elena@example.com",
    role: "profesor",
    department: "Sistemas",
    createdAt: "2024-03-18",
  },
  {
    id: 7,
    name: "Felipe Torres",
    email: "felipe@example.com",
    role: "estudiante",
    department: "Informática",
    createdAt: "2024-04-01",
  },
  {
    id: 8,
    name: "Gloria Silva",
    email: "gloria@example.com",
    role: "admin",
    department: "Dirección",
    createdAt: "2024-04-08",
  },
  {
    id: 9,
    name: "Héctor Gómez",
    email: "hector@example.com",
    role: "profesor",
    department: "Ingeniería Software",
    createdAt: "2024-04-15",
  },
  {
    id: 10,
    name: "Iris López",
    email: "iris@example.com",
    role: "estudiante",
    department: "Sistemas",
    createdAt: "2024-04-22",
  },
  {
    id: 11,
    name: "Javier Ruiz",
    email: "javier@example.com",
    role: "profesor",
    department: "Informática",
    createdAt: "2024-04-29",
  },
  {
    id: 12,
    name: "Karen White",
    email: "karen@example.com",
    role: "estudiante",
    department: "Ingeniería Software",
    createdAt: "2024-05-05",
  },
];

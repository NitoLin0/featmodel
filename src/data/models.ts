// Modelos compartidos en toda la aplicación
export const MODELS = [
  {
    id: 1,
    title: "Modelo de Características Básico",
    author: "Juan Pérez",
    version: "v1.0",
  },
  {
    id: 2,
    title: "Modelo Avanzado de Software",
    author: "María García",
    version: "v2.1",
  },
  {
    id: 3,
    title: "Configurador de Productos",
    author: "Carlos López",
    version: "v1.5",
  },
  {
    id: 4,
    title: "Sistema de Recomendaciones",
    author: "Ana Rodríguez",
    version: "v3.0",
  },
] as const;

// Tipos derivados
export type Model = (typeof MODELS)[number];
export type ModelId = Model["id"];

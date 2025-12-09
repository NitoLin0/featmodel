// Etiquetas para nodos
export const labels = [
  { id: "simple", label: "Simple", color: "#22c55e" },
  { id: "medium", label: "Medio", color: "#eab308" },
  { id: "advanced", label: "Avanzado", color: "#f97316" },
  { id: "complex", label: "Complejo", color: "#dc2626" },
];

// Tipos de conexiones
export const connectionTypes = [
  { id: "mandatory", label: "Obligatoria", color: "#10b981", style: "solid" },
  { id: "optional", label: "Opcional", color: "#f59e0b", style: "dashed" },
  { id: "xor", label: "XOR", color: "#ef4444", style: "solid" },
  { id: "or", label: "OR", color: "#8b5cf6", style: "solid" },
  { id: "requires", label: "Requiere", color: "#06b6d4", style: "solid" },
  { id: "excludes", label: "Excluye", color: "#ec4899", style: "solid" },
];

// Versiones mock
export const versions = [
  { id: "v1.0", date: "2024-01-15", changes: "Versión inicial" },
  { id: "v1.1", date: "2024-01-20", changes: "Agregada característica A" },
  { id: "v1.2", date: "2024-01-25", changes: "Modificada conexión B" },
];

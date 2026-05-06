/**
 * Convierte un color hexadecimal a RGB con alfa
 */
export const hexToRgba = (hex: string, alpha: number): string => {
  const r = Number.parseInt(hex.slice(1, 3), 16);
  const g = Number.parseInt(hex.slice(3, 5), 16);
  const b = Number.parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

/**
 * Genera un ID único para nodos
 */
export const generateNodeId = (existingCount: number): string => {
  return `node-${Date.now()}-${existingCount}`;
};

/**
 * Calcula una posición aleatoria dentro de rangos
 */
export const getRandomPosition = (
  minX = 100,
  maxX = 500,
  minY = 100,
  maxY = 500
) => ({
  x: Math.random() * (maxX - minX) + minX,
  y: Math.random() * (maxY - minY) + minY,
});

/**
 * Incrementa la versión
 */
export const incrementVersion = (version: string): string => {
  const parts = version.split(".");
  const major = parts[0];
  const minor = Number.parseInt(parts[1] || "0") + 1;
  return `${major}.${minor}`;
};

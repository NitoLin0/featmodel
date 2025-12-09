import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const models = [
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
];

export default function ModelosPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Modelos de Características
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {models.map((model) => (
            <Card key={model.id} className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">{model.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Autor: {model.author}</p>
                <p className="text-sm text-muted-foreground">Versión: {model.version}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Link href={`/design?model=${model.id}&action=view`}>
                  <Button variant="outline">Ver</Button>
                </Link>
                <Link href={`/design?model=${model.id}&action=edit`}>
                  <Button>Editar</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

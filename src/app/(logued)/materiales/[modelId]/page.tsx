"use client";

import { useState, use } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Upload, Trash2, FileImage, FileVideo, FileText } from "lucide-react";

type MultimediaFile = {
  id: number;
  name: string;
  type: "image" | "video" | "document";
  url: string;
  thumbnail: string | null;
};

const multimediaFiles: Record<number, MultimediaFile[]> = {
  1: [
    {
      id: 1,
      name: "Diagrama de Características.png",
      type: "image",
      url: "https://via.placeholder.com/400x300?text=Diagrama",
      thumbnail: "https://via.placeholder.com/200x150?text=Diagrama",
    },
    {
      id: 2,
      name: "Video Explicativo.mp4",
      type: "video",
      url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      thumbnail: "https://via.placeholder.com/200x150?text=Video",
    },
    {
      id: 3,
      name: "Especificaciones.pdf",
      type: "document",
      url: "#",
      thumbnail: null,
    },
  ],
  2: [
    {
      id: 4,
      name: "Modelo Avanzado.jpg",
      type: "image",
      url: "https://via.placeholder.com/400x300?text=Modelo+Avanzado",
      thumbnail: "https://via.placeholder.com/200x150?text=Modelo+Avanzado",
    },
    {
      id: 5,
      name: "Tutorial.docx",
      type: "document",
      url: "#",
      thumbnail: null,
    },
  ],
  3: [
    {
      id: 6,
      name: "Configurador.webm",
      type: "video",
      url: "https://sample-videos.com/zip/10/webm/SampleVideo_1280x720_1mb.webm",
      thumbnail: "https://via.placeholder.com/200x150?text=Configurador",
    },
  ],
  4: [
    {
      id: 7,
      name: "Recomendaciones.png",
      type: "image",
      url: "https://via.placeholder.com/400x300?text=Recomendaciones",
      thumbnail: "https://via.placeholder.com/200x150?text=Recomendaciones",
    },
    {
      id: 8,
      name: "Análisis.pdf",
      type: "document",
      url: "#",
      thumbnail: null,
    },
  ],
};

const models = [
  { id: 1, title: "Modelo de Características Básico" },
  { id: 2, title: "Modelo Avanzado de Software" },
  { id: 3, title: "Configurador de Productos" },
  { id: 4, title: "Sistema de Recomendaciones" },
];

export default function ModelMaterialesPage({ params }: Readonly<{ params: Promise<{ modelId: string }> }>) {
  const { modelId: modelIdStr } = use(params);
  const modelId = Number.parseInt(modelIdStr);
  const model = models.find((m) => m.id === modelId);
  const [files, setFiles] = useState(multimediaFiles[modelId] || []);

  const handleUpload = () => {
    alert("Funcionalidad de subida simulada. En una implementación real, aquí se abriría un selector de archivos.");
  };

  const handleDelete = (fileId: number) => {
    if (confirm("¿Estás seguro de que quieres eliminar este archivo?")) {
      setFiles((prev: MultimediaFile[]) => prev.filter((f: MultimediaFile) => f.id !== fileId));
    }
  };

  const renderPreview = (file: any) => {
    if (file.type === "image") {
      return <img src={file.thumbnail || file.url} alt={file.name} className="w-full h-32 object-cover rounded" />;
    } else if (file.type === "video") {
      return <img src={file.thumbnail} alt={file.name} className="w-full h-32 object-cover rounded" />;
    } else {
      return (
        <div className="w-full h-32 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
          {file.type === "document" && <FileText className="w-12 h-12 text-gray-500" />}
        </div>
      );
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case "image":
        return <FileImage className="w-4 h-4" />;
      case "video":
        return <FileVideo className="w-4 h-4" />;
      case "document":
        return <FileText className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  if (!model) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Modelo no encontrado
          </h1>
          <p className="text-center">El modelo solicitado no existe.</p>
          <div className="text-center mt-4">
            <Link href="/materiales">
              <Button>Volver a Materiales</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Materiales: {model.title}
            </h1>
            <p className="text-muted-foreground mt-2">
              Archivos multimedia asociados al modelo
            </p>
          </div>
          <div className="flex gap-4">
            <Button onClick={handleUpload} variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Subir Archivo
            </Button>
            <Link href="/materiales">
              <Button variant="ghost">Volver</Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {files.map((file) => (
            <Card key={file.id} className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  {getFileIcon(file.type)}
                  {file.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                {renderPreview(file)}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(file.url, "_blank")}
                >
                  Ver
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(file.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {files.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No hay archivos multimedia para este modelo.</p>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState, use } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Upload } from "lucide-react";
import { MultimediaFileCard } from "@/components/MultimediaFileCard";
import { MODELS } from "@/data/models";
import { MULTIMEDIA_FILES, MultimediaFile } from "@/data/multimedia";

export default function ModelMaterialesPage({
  params,
}: Readonly<{ params: Promise<{ modelId: string }> }>) {
  const { modelId: modelIdStr } = use(params);
  const modelId = Number.parseInt(modelIdStr);
  const model = MODELS.find((m) => m.id === modelId);
  const [files, setFiles] = useState<MultimediaFile[]>(MULTIMEDIA_FILES[modelId] || []);

  const handleUpload = () => {
    alert(
      "Funcionalidad de subida simulada. En una implementación real, aquí se abriría un selector de archivos."
    );
  };

  const handleDelete = (fileId: number) => {
    if (confirm("¿Estás seguro de que quieres eliminar este archivo?")) {
      setFiles((prev) => prev.filter((f) => f.id !== fileId));
    }
  };

  if (!model) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-8 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Modelo no encontrado
          </h1>
          <p className="text-muted-foreground mb-6">
            El modelo solicitado no existe.
          </p>
          <Link href="/materiales">
            <Button>Volver a Materiales</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Materiales: {model.title}
            </h1>
            <p className="text-muted-foreground mt-2">
              {files.length} archivo{files.length === 1 ? "" : "s"} multimedia
            </p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              onClick={handleUpload}
              variant="outline"
              className="flex-1 sm:flex-none"
            >
              <Upload className="w-4 h-4 mr-2" />
              Subir Archivo
            </Button>
            <Link href="/materiales" className="flex-1 sm:flex-none">
              <Button variant="ghost" className="w-full">
                Volver
              </Button>
            </Link>
          </div>
        </div>

        {files.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {files.map((file) => (
              <MultimediaFileCard
                key={file.id}
                file={file}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <svg
              className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="text-muted-foreground mb-4">
              No hay archivos multimedia para este modelo.
            </p>
            <Button onClick={handleUpload}>
              <Upload className="w-4 h-4 mr-2" />
              Subir el primer archivo
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

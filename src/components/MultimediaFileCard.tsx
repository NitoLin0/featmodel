import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileImage, FileVideo, FileText } from "lucide-react";
import { MultimediaFile } from "@/data/multimedia";

interface MultimediaFileCardProps {
  file: MultimediaFile;
  onDelete?: (fileId: number) => void;
}

export function MultimediaFileCard({
  file,
  onDelete,
}: Readonly<MultimediaFileCardProps>) {
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

  const renderPreview = () => {
    if (file.type === "image") {
      return (
        <img
          src={file.thumbnail || file.url}
          alt={file.name}
          className="w-full h-32 object-cover rounded transition-transform hover:scale-105"
        />
      );
    } else if (file.type === "video") {
      return (
        <div className="relative w-full h-32 rounded overflow-hidden group">
          <img
            src={file.thumbnail || ""}
            alt={file.name}
            className="w-full h-32 object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
          </div>
        </div>
      );
    } else {
      return (
        <div className="w-full h-32 bg-linear-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded flex items-center justify-center hover:from-gray-300 hover:to-gray-400 transition-colors">
          {<FileText className="w-12 h-12 text-gray-500" />}
        </div>
      );
    }
  };

  return (
    <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2 truncate">
          {getFileIcon(file.type)}
          <span className="truncate">{file.name}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        {renderPreview()}
      </CardContent>
      <CardFooter className="flex justify-between gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.open(file.url, "_blank")}
          className="flex-1"
        >
          Ver
        </Button>
        {onDelete && (
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(file.id)}
            title="Eliminar archivo"
          >
            ✕
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

import { ModelCard } from "@/components/ModelCard";
import { MODELS } from "@/data/models";

export default function MaterialesPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Materiales Multimedia
        </h1>
        <p className="text-center text-muted-foreground mb-8">
          Selecciona un modelo para ver y gestionar sus materiales multimedia
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MODELS.map((model) => (
            <ModelCard
              key={model.id}
              model={model}
              href={`/materiales/${model.id}`}
              linkText="Ver Materiales"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

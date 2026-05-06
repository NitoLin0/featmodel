import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Model } from "@/data/models";

interface ModelCardProps {
  model: Model;
  href: string;
  linkText?: string;
  children?: React.ReactNode;
}

export function ModelCard({
  model,
  href,
  linkText = "Ver",
  children,
}: Readonly<ModelCardProps>) {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <CardHeader>
        <CardTitle className="text-xl">{model.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Autor: {model.author}</p>
        <p className="text-sm text-muted-foreground">Versión: {model.version}</p>
        {children}
      </CardContent>
      <CardFooter>
        <Link href={href} className="w-full">
          <Button className="w-full">{linkText}</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

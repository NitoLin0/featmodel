"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

export function DesignNavigation() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <div className="h-16 border-b bg-background flex items-center justify-between px-4">
      <div className="flex space-x-4">
        <Link href="/design">
          <Button
            variant={isActive("/design") ? "default" : "ghost"}
            className="font-medium"
          >
            Diseño
          </Button>
        </Link>
        <Link href="/modelos">
          <Button variant={isActive("/modelos") ? "default" : "ghost"}>
            Modelos
          </Button>
        </Link>
        <Link href="/materiales">
          <Button variant={isActive("/materiales") ? "default" : "ghost"}>
            Materiales
          </Button>
        </Link>
      </div>
      <div className="flex items-center space-x-4 justify-end">
        <Switch
          checked={theme === "dark"}
          onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        />
        <Button variant="ghost" size="icon">
          {theme === "dark" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}

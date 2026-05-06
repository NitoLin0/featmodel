"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function DesignNavigation() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (path: string) => pathname === path;

  // Solo mostrar Modelos, Materiales y Gestión - quitar acceso directo a Diseño
  const navItems = [
    { href: "/modelos", label: "Modelos" },
    { href: "/materiales", label: "Materiales" },
    { href: "/gestion", label: "Gestión" },
  ];

  return (
    <nav className="h-16 border-b bg-background/95 backdrop-blur-sm flex items-center justify-between px-6 shadow-sm">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-linear-to-r from-blue-500 to-purple-600 rounded-md flex items-center justify-center">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>
        <span className="text-lg font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          CuriConfig
        </span>
      </div>

      <div className="flex items-center gap-2">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant={isActive(item.href) ? "default" : "ghost"}
              className={`transition-all duration-200 ${
                isActive(item.href)
                  ? "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-200"
                  : "hover:bg-accent"
              }`}
            >
              {item.label}
            </Button>
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4 justify-end">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50">
          <Moon className="h-4 w-4 text-muted-foreground" />
          {mounted && (
            <Switch
              checked={theme === "dark"}
              onCheckedChange={(checked) =>
                setTheme(checked ? "dark" : "light")
              }
              className="scale-75"
            />
          )}
          <Sun className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
    </nav>
  );
}

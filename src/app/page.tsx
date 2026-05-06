import { Button } from "@/components/ui/button";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      <AnimatedBackground />

      <div className="text-center space-y-8 relative z-10 max-w-2xl">
        <div className="inline-flex items-center justify-center">
          <div className="mx-auto w-24 h-24 bg-linear-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300">
            <svg
              className="w-12 h-12 text-white"
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
        </div>

        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-fade-in">
            CuriConfig
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-md mx-auto leading-normal pb-2">
            Plataforma innovadora para la construcción y gestión de modelos de características
          </p>
        </div>

        <div className="space-y-4 pt-4">
          <Link href="/login" className="inline-block w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl text-lg group">
              <span>Ver los Modelos</span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Accede directamente al área de diseño de modelos de características
          </p>
        </div>
      </div>
    </div>
  );
}

export type MultimediaFile = {
  id: number;
  name: string;
  type: "image" | "video" | "document";
  url: string;
  thumbnail: string | null;
};

export const MULTIMEDIA_FILES: Record<number, MultimediaFile[]> = {
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

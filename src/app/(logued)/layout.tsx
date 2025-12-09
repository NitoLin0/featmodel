import { DesignNavigation } from "@/components/design/DesignNavigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-full">
      <DesignNavigation />
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}

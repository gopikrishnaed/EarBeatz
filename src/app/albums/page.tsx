
import MainLayout from "@/components/layout/main-layout";
import { HardHat } from "lucide-react";

export default function AlbumsPage() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold font-headline tracking-tight">
            Albums
          </h1>
          <p className="text-muted-foreground">
            Browse your collection of albums.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center text-center py-20 border rounded-lg bg-card/50">
          <HardHat className="w-16 h-16 text-primary mb-4" />
          <h2 className="text-2xl font-bold">Coming Soon!</h2>
          <p className="text-muted-foreground max-w-md">
            This section is currently under construction. We're working hard to bring you an amazing album browsing experience.
          </p>
        </div>
      </div>
    </MainLayout>
  );
}

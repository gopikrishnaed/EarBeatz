
import MainLayout from "@/components/layout/main-layout";
import { HardHat } from "lucide-react";

export default function AlbumDetailPage({ params }: { params: { id: string } }) {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center text-center py-20">
          <HardHat className="w-16 h-16 text-primary mb-4" />
          <h1 className="text-3xl font-bold">Page Under Construction</h1>
          <p className="text-muted-foreground max-w-md mt-2">
            This feature is currently being worked on. Please check back later!
          </p>
        </div>
    </MainLayout>
  );
}

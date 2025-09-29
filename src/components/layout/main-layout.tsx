import type { ReactNode } from "react";
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
} from "@/components/ui/sidebar";
import MainSidebar from "./main-sidebar";
import { Header } from "./header";
import { MusicPlayer } from "../music-player";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col">
        <div className="flex flex-1">
          <Sidebar>
            <MainSidebar />
          </Sidebar>
          <SidebarInset className="flex flex-col flex-1">
            <Header />
            <main className="p-4 sm:p-6 lg:p-8 flex-1">
              {children}
            </main>
          </SidebarInset>
        </div>
        <MusicPlayer />
      </div>
    </SidebarProvider>
  );
}

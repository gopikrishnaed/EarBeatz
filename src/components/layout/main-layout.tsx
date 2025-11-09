// This component is now the main client-side layout shell.
"use client";

import type { ReactNode } from "react";
import { MusicPlayerProvider } from "@/context/music-player-context";
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
} from "@/components/ui/sidebar";
import MainSidebar from "./main-sidebar";
import { Header } from "./header";
import { MusicPlayer } from "../music-player";
import { useMusicPlayerInitialState } from "@/hooks/use-music-player-initial-state";

export default function MainLayout({ children }: { children: ReactNode }) {
  const { initialPlaylist } = useMusicPlayerInitialState();

  return (
    <MusicPlayerProvider initialPlaylist={initialPlaylist}>
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
    </MusicPlayerProvider>
  );
}

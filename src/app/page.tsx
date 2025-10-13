"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Music } from 'lucide-react';

export default function IntroPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login page immediately on load
    router.replace('/login');
  }, [router]);

  // Render a loading state while redirecting
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <Music className="h-24 w-24 text-primary animate-pulse" />
        <h1 className="text-5xl font-bold font-headline tracking-tight">
          EarBeatz
        </h1>
      </div>
    </div>
  );
}

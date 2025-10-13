"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Music } from 'lucide-react';

export default function IntroPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/login');
    }, 1500); // 1.5 second delay

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-background">
      <div className="flex animate-pulse flex-col items-center gap-4">
        <Music className="h-24 w-24 text-primary" />
        <h1 className="text-5xl font-bold font-headline tracking-tight">
          EarBeatz
        </h1>
      </div>
    </div>
  );
}

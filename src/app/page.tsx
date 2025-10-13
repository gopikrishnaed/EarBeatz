"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Music } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function IntroPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/dashboard');
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4 animate-fade-in-scale">
        <Music className="h-24 w-24 text-primary" />
        <h1 className="text-5xl font-bold font-headline tracking-tight">
          EarBeatz
        </h1>
      </div>
      <style jsx global>{`
        @keyframes fade-in-scale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in-scale {
          animation: fade-in-scale 1.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

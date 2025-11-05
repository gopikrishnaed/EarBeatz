"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useMusicPlayer } from "@/context/music-player-context";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
import { Button } from "./ui/button";

export function MusicPlayer() {
  const { currentSong, isPlaying, playSong, pauseSong, nextSong, prevSong } = useMusicPlayer();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (audioRef.current && currentSong) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Playback failed", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSong]);

  useEffect(() => {
    if(audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
    }
  };
  
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  }

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = (value[0] / 100) * audioRef.current.duration;
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0] / 100;
    setVolume(newVolume);
    if(newVolume > 0) setIsMuted(false);
  }

  const toggleMute = () => {
    setIsMuted(!isMuted);
  }

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds === 0) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (!currentSong) {
    return null;
  }

  return (
    <footer className="sticky bottom-0 z-20 border-t bg-background/95 backdrop-blur-sm">
      <audio
        ref={audioRef}
        src={currentSong.songUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={nextSong}
        key={currentSong.id} // Important: force re-render on song change
      />
      <div className="container mx-auto p-3 flex items-center justify-between">
        <div className="flex items-center gap-4 w-1/4">
          <Image
            src={currentSong.album.coverArt.imageUrl || `https://picsum.photos/seed/${currentSong.album.id}/56/56`}
            alt={currentSong.album.title}
            width={56}
            height={56}
            className="rounded-md object-cover"
          />
          <div>
            <p className="font-semibold truncate">{currentSong.title}</p>
            <p className="text-sm text-muted-foreground truncate">{currentSong.artist.name}</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 w-1/2">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={prevSong} disabled={!prevSong}>
                    <SkipBack className="w-5 h-5" />
                </Button>
                <Button variant="default" size="icon" className="w-12 h-12 rounded-full" onClick={isPlaying ? pauseSong : () => playSong(currentSong)}>
                    {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current" />}
                </Button>
                <Button variant="ghost" size="icon" onClick={nextSong} disabled={!nextSong}>
                    <SkipForward className="w-5 h-5" />
                </Button>
            </div>
            <div className="flex items-center gap-2 w-full">
                <span className="text-xs text-muted-foreground">{formatTime(currentTime)}</span>
                <Slider
                    value={[progress || 0]}
                    max={100}
                    step={1}
                    onValueChange={handleSeek}
                    className="w-full"
                />
                <span className="text-xs text-muted-foreground">{formatTime(duration)}</span>
            </div>
        </div>

        <div className="flex items-center gap-2 w-1/4 justify-end">
            <Button variant="ghost" size="icon" onClick={toggleMute}>
              {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </Button>
            <Slider
                value={[isMuted ? 0 : volume * 100]}
                max={100}
                step={1}
                onValueChange={handleVolumeChange}
                className="w-24"
            />
        </div>
      </div>
    </footer>
  );
}

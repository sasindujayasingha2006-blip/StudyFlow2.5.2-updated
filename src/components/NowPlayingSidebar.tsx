import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, Volume2, Zap, Heart, ListMusic, Volume1, VolumeX, X, Info, ExternalLink, Share2, MoreHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface NowPlayingSidebarProps {
  currentSubject: string;
  currentSubjectImage?: string;
  progress: number;
  timeElapsed: string;
  totalTime?: string;
  onClose?: () => void;
  onToggleFocus?: () => void;
  isPlaying?: boolean;
  onTogglePlay?: () => void;
}

export default function NowPlayingSidebar({ 
  currentSubject, 
  currentSubjectImage,
  progress, 
  timeElapsed, 
  totalTime = '90:00',
  onClose,
  onToggleFocus,
  isPlaying = false,
  onTogglePlay
}: NowPlayingSidebarProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const VolumeIcon = isMuted || volume === 0 ? VolumeX : volume < 50 ? Volume1 : Volume2;

  const handleVolumeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const newVolume = Math.max(0, Math.min(100, Math.round((x / rect.width) * 100)));
    setVolume(newVolume);
    if (isMuted) setIsMuted(false);
  };

  return (
    <motion.aside
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      className="hidden md:flex flex-col w-[350px] bg-black/40 backdrop-blur-2xl border-l border-white/10 h-full overflow-y-auto scrollbar-hide shrink-0 relative z-50"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#1DB954]/5 to-transparent pointer-events-none" />
      
      {/* Header */}
      <div className="flex items-center justify-between p-4 sticky top-0 bg-transparent z-10">
        <h2 className="font-bold text-xs uppercase tracking-widest text-gray-400">Now Playing</h2>
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-400 hover:text-white transition-colors hover:bg-white/10 rounded-full">
            <MoreHorizontal className="w-5 h-5" />
          </button>
          {onClose && (
            <button onClick={onClose} className="p-2 text-gray-400 hover:text-white transition-colors hover:bg-white/10 rounded-full">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-8 relative z-10">
        {/* Album Art / Subject Image */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="aspect-square w-full bg-gradient-to-br from-gray-800 to-black rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative group"
        >
          {!isLoaded && <div className="absolute inset-0 bg-white/5 animate-pulse" />}
          <img 
            src={currentSubjectImage || `https://picsum.photos/seed/${currentSubject}/400/400`} 
            alt={currentSubject}
            onLoad={() => setIsLoaded(true)}
            onError={() => setIsLoaded(true)}
            className={cn(
              "w-full h-full object-cover transition-all duration-1000",
              isLoaded ? (isPlaying ? "scale-110 opacity-100" : "scale-100 opacity-50 grayscale") : "opacity-0 scale-110"
            )}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {isPlaying && (
            <div className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-md p-2 rounded-lg border border-white/10">
              <span className="flex gap-1 h-4 items-end">
                <motion.span animate={{ height: [4, 16, 8, 16, 4] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-1 bg-[#1DB954] rounded-full" />
                <motion.span animate={{ height: [16, 4, 16, 8, 16] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1 bg-[#1DB954] rounded-full" />
                <motion.span animate={{ height: [8, 16, 4, 16, 8] }} transition={{ repeat: Infinity, duration: 0.7 }} className="w-1 bg-[#1DB954] rounded-full" />
              </span>
            </div>
          )}
        </motion.div>

        {/* Info */}
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-2xl font-black tracking-tight truncate hover:underline cursor-pointer drop-shadow-md">
              {currentSubject || 'Select a Subject'}
            </h3>
            <button 
              onClick={() => setIsLiked(!isLiked)}
              className={cn(
                "transition-all p-2 hover:scale-110 active:scale-90 rounded-full hover:bg-white/5",
                isLiked ? "text-[#1DB954]" : "text-gray-400 hover:text-white"
              )}
            >
              <Heart className={cn("w-6 h-6", isLiked && "fill-current drop-shadow-[0_0_10px_rgba(29,185,84,0.5)]")} />
            </button>
          </div>
          <p className="text-gray-400 font-medium hover:text-white transition-colors cursor-pointer text-sm">
            {isPlaying ? 'Deep Focus Session' : 'Paused'}
          </p>
        </div>

        {/* Progress */}
        <div className="space-y-3">
          <div className="h-1.5 bg-white/10 rounded-full group cursor-pointer relative overflow-hidden">
            <div 
              className="h-full bg-white group-hover:bg-[#1DB954] rounded-full transition-all duration-300 relative" 
              style={{ width: `${progress}%` }} 
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
          <div className="flex justify-between text-xs font-bold text-gray-500 tabular-nums">
            <span>{timeElapsed}</span>
            <span>{totalTime}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-8 py-2">
          <div className="flex items-center gap-8">
            <button className="text-gray-400 hover:text-white transition-colors">
              <Shuffle className="w-5 h-5" />
            </button>
            <button className="text-gray-400 hover:text-white transition-colors hover:scale-110 active:scale-90">
              <SkipBack className="w-8 h-8 fill-current" />
            </button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onTogglePlay}
              className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:bg-[#1DB954] hover:shadow-[0_0_30px_rgba(29,185,84,0.4)] transition-all group"
            >
              {isPlaying ? (
                <Pause className="w-7 h-7 text-black fill-current" />
              ) : (
                <Play className="w-7 h-7 text-black fill-current ml-1" />
              )}
            </motion.button>
            <button className="text-gray-400 hover:text-white transition-colors hover:scale-110 active:scale-90">
              <SkipForward className="w-8 h-8 fill-current" />
            </button>
            <button className="text-gray-400 hover:text-white transition-colors">
              <Repeat className="w-5 h-5" />
            </button>
          </div>

          <div className="w-full flex items-center gap-4 px-2">
            <button onClick={() => setIsMuted(!isMuted)}>
              <VolumeIcon className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
            </button>
            <div 
              className="flex-1 h-1.5 bg-white/10 rounded-full group/bar cursor-pointer relative overflow-hidden"
              onClick={handleVolumeClick}
            >
              <div 
                className={cn(
                  "h-full rounded-full transition-all relative",
                  isMuted ? "bg-gray-600" : "bg-white group-hover/bar:bg-[#1DB954]"
                )} 
                style={{ width: isMuted ? '0%' : `${volume}%` }} 
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md opacity-0 group-hover/bar:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info Cards */}
        <div className="space-y-4 pt-6 border-t border-white/10">
          <div className="bg-white/5 rounded-2xl p-5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group backdrop-blur-sm">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-sm text-gray-300 group-hover:text-white transition-colors">About the Subject</h4>
              <Info className="w-4 h-4 text-gray-500 group-hover:text-[#1DB954] transition-colors" />
            </div>
            <p className="text-sm text-gray-400 line-clamp-3 leading-relaxed">
              {currentSubject} is a core component of your Advanced Level syllabus. 
              Focusing on this will help you improve your overall readiness score.
            </p>
          </div>

          <div className="bg-gradient-to-r from-[#1DB954]/20 to-transparent rounded-2xl p-5 border border-[#1DB954]/20 flex items-center justify-between group cursor-pointer hover:from-[#1DB954]/30 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#1DB954]/20 flex items-center justify-center">
                <Zap className="w-4 h-4 text-[#1DB954]" />
              </div>
              <span className="text-sm font-bold text-white">Deep Focus Mode</span>
            </div>
            <button 
              onClick={onToggleFocus}
              className="px-4 py-2 bg-white text-black rounded-full text-xs font-black hover:scale-105 transition-transform shadow-lg"
            >
              Enable
            </button>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold transition-all border border-white/5">
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold transition-all border border-white/5">
              <ExternalLink className="w-4 h-4" />
              Resources
            </button>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}

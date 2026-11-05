import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Music, ChevronDown, ChevronUp } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

export default function AudioPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.35);
  const [isMinimized, setIsMinimized] = useState(false);
  const [loadError, setLoadError] = useState(false);

  // Keep audio volume in sync
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      trackEvent('music_pause', {
        event_category: 'audio',
        event_label: 'Background Music Paused',
      });
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setLoadError(false);
          trackEvent('music_play', {
            event_category: 'audio',
            event_label: 'Background Music Started',
          });
        })
        .catch((err) => {
          console.warn('Playback error:', err);
          setLoadError(true);
        });
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    audioRef.current.muted = nextMute;
    trackEvent('music_mute_toggle', {
      event_category: 'audio',
      event_label: nextMute ? 'Muted' : 'Unmuted',
    });
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (val === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  return (
    <aside
      aria-label="Background music player"
      className="fixed bottom-4 right-4 z-40 select-none transition-all duration-300 font-sans"
    >
      <audio
        ref={audioRef}
        src="/media/background-music.mp3"
        loop
        preload="metadata"
        onError={() => setLoadError(true)}
        onEnded={() => setIsPlaying(false)}
      />

      {isMinimized ? (
        /* Minimized Floating Pill */
        <button
          onClick={() => setIsMinimized(false)}
          className="group flex items-center gap-2.5 rounded-full border border-purple-200/60 dark:border-purple-900/50 bg-white/90 dark:bg-slate-900/90 px-3.5 py-2 shadow-lg shadow-purple-500/10 backdrop-blur-md transition-all hover:scale-105 active:scale-95"
          title="Expand Background Music Player"
          aria-label="Expand Music Player"
        >
          <div
            className={`flex h-7 w-7 items-center justify-center rounded-full ${
              isPlaying
                ? 'bg-gradient-to-tr from-[#9180D8] to-[#6C83D8] text-white shadow-xs shadow-[#9180D8]/40 animate-pulse'
                : 'bg-purple-100 dark:bg-purple-950/60 text-[#9180D8] dark:text-[#C4B5FD]'
            }`}
          >
            <Music className="h-3.5 w-3.5" />
          </div>

          <div className="flex items-center gap-1.5 pr-1">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
              {isPlaying ? 'Playing Music' : 'Music'}
            </span>
            <ChevronUp className="h-3.5 w-3.5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-colors" />
          </div>
        </button>
      ) : (
        /* Full Glassmorphism Player Card */
        <div className="w-[300px] sm:w-[320px] rounded-2xl border border-white/60 dark:border-slate-800/80 bg-white/85 dark:bg-slate-900/85 p-3.5 shadow-2xl shadow-indigo-500/10 dark:shadow-black/60 backdrop-blur-xl transition-all">
          {/* Header Row: Track Title & Minimize */}
          <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-purple-100/60 dark:border-slate-800/80">
            <div className="flex items-center gap-2.5 min-w-0">
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition-colors ${
                  isPlaying
                    ? 'bg-gradient-to-tr from-[#9180D8] to-[#5B8DEF] text-white shadow-sm shadow-[#9180D8]/40'
                    : 'bg-purple-50 dark:bg-slate-800 text-[#9180D8] dark:text-[#C4B5FD]'
                }`}
              >
                <Music className={`h-4 w-4 ${isPlaying ? 'animate-bounce' : ''}`} />
              </div>
              <div className="min-w-0">
                <p className="truncate text-xs font-bold text-slate-900 dark:text-slate-100">
                  Hazy After Hours
                </p>
                <p className="truncate text-[10px] font-medium text-slate-500 dark:text-slate-400">
                  Mixkit • Chill Ambient Lo-Fi
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsMinimized(true)}
              className="rounded-lg p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Minimize Music Player"
              aria-label="Minimize Player"
            >
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>

          {/* Equalizer Visualizer & Status */}
          <div className="flex items-center justify-between py-2.5">
            <div className="flex items-center gap-1 h-4">
              {[0.4, 0.8, 0.5, 0.9, 0.6, 0.3].map((delay, idx) => (
                <span
                  key={idx}
                  className={`w-1 rounded-full bg-gradient-to-t from-[#9180D8] to-[#5B8DEF] transition-all duration-300 ${
                    isPlaying
                      ? 'animate-[pulse_1s_ease-in-out_infinite]'
                      : 'h-1.5 opacity-40'
                  }`}
                  style={{
                    height: isPlaying ? `${Math.max(6, (idx + 1) * 3.5)}px` : '4px',
                    animationDelay: `${delay}s`,
                  }}
                />
              ))}
              <span className="ml-2 text-[10px] font-semibold tracking-wide uppercase text-slate-400 dark:text-slate-500">
                {isPlaying ? 'Instrumental' : 'Paused'}
              </span>
            </div>

            {loadError && (
              <span className="text-[10px] font-semibold text-rose-500">
                Audio unavailable
              </span>
            )}
          </div>

          {/* Controls: Play/Pause, Mute & Volume Slider */}
          <div className="flex items-center gap-3 pt-1">
            <button
              onClick={togglePlay}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-[#9180D8] to-[#5B8DEF] text-white shadow-md shadow-[#9180D8]/30 transition-transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#9180D8]/50"
              aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
              title={isPlaying ? 'Pause' : 'Play Background Music'}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
            </button>

            <button
              onClick={toggleMute}
              className="rounded-lg p-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none"
              aria-label={isMuted ? 'Unmute music' : 'Mute music'}
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="h-4 w-4 text-rose-400" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </button>

            <div className="flex-1 flex items-center">
              <label htmlFor="music-volume" className="sr-only">
                Music Volume
              </label>
              <input
                id="music-volume"
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                aria-label="Volume slider"
                className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 dark:bg-slate-700 accent-[#9180D8] focus:outline-none focus:ring-1 focus:ring-[#9180D8]"
              />
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}


import { Play, Pause, Volume2, VolumeX, ChevronUp, Music } from 'lucide-react';
import { useAudio } from '../contexts/AudioContext';

export const MusicPlayer = () => {
  const {
    isPlaying,
    isMuted,
    volume,
    currentTime,
    duration,
    isLoaded,
    isEnabled,
    isMinimized,
    togglePlay,
    toggleMute,
    setVolume,
    seek,
    toggleMinimize,
    formatTime,
  } = useAudio();

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    seek(percent * duration);
  };

  if (!isEnabled) return null;

  // Minimized state - small floating button
  if (isMinimized) {
    return (
      <button
        onClick={toggleMinimize}
        className="fixed bottom-6 left-6 z-50 group animate-[fade-in_0.5s_ease-out]"
        aria-label="Abrir reproductor de música"
        style={{
          background: 'linear-gradient(135deg, rgba(45, 45, 45, 0.9) 0%, rgba(26, 26, 26, 0.95) 100%)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
        }}
      >
        <div className="relative w-12 h-12 rounded-2xl flex items-center justify-center overflow-hidden">
          {/* Playing animation background */}
          {isPlaying && (
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-[#C41E3A]/10 animate-pulse" style={{ animationDuration: '2s' }} />
            </div>
          )}

          <Music className={`w-5 h-5 text-white/70 group-hover:text-white transition-colors duration-300 relative z-10 ${isPlaying ? 'text-[#C41E3A]' : ''}`} />

          {/* Playing indicator dot */}
          {isPlaying && (
            <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#C41E3A] animate-pulse" />
          )}
        </div>
      </button>
    );
  }

  // Expanded state - full player
  return (
    <div
      className="fixed bottom-6 left-6 z-50 animate-[fade-in_0.3s_ease-out]"
      style={{
        minWidth: '260px',
        maxWidth: '300px',
      }}
    >
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(45, 45, 45, 0.95) 0%, rgba(26, 26, 26, 0.98) 100%)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: `
            0 25px 50px rgba(0, 0, 0, 0.5),
            0 0 0 1px rgba(255, 255, 255, 0.05) inset
          `,
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full ${isLoaded ? 'bg-[#C41E3A]' : 'bg-white/20'} ${isPlaying ? 'animate-pulse' : ''}`} />
            <span className="text-[11px] text-white/40 font-medium uppercase tracking-wider">
              {isLoaded ? 'Ambient' : 'Cargando...'}
            </span>
          </div>

          {/* Minimize button */}
          <button
            onClick={toggleMinimize}
            className="w-8 h-8 flex items-center justify-center text-white/30 hover:text-white/60 transition-colors duration-300"
            aria-label="Minimizar reproductor"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
        </div>

        {/* Controls */}
        <div className="p-4 space-y-4">
          {/* Play Button */}
          <div className="flex justify-center">
            <button
              onClick={togglePlay}
              disabled={!isLoaded}
              className="relative group"
              aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #C41E3A 0%, #8B0000 100%)',
                  boxShadow: isPlaying ? '0 0 20px rgba(196, 30, 58, 0.4)' : '0 4px 15px rgba(0, 0, 0, 0.3)',
                }}
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 text-white" />
                ) : (
                  <Play className="w-6 h-6 text-white ml-0.5" />
                )}
              </div>

              {/* Playing glow effect */}
              {isPlaying && (
                <div
                  className="absolute inset-0 rounded-full animate-ping"
                  style={{ background: 'rgba(196, 30, 58, 0.3)', animationDuration: '2s' }}
                />
              )}
            </button>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div
              className="h-1 rounded-full cursor-pointer overflow-hidden group hover:h-1.5 transition-all duration-200"
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
              onClick={handleProgressClick}
            >
              <div
                className="h-full rounded-full transition-all duration-100"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #C41E3A 0%, #FFAA00 100%)',
                }}
              />
            </div>

            <div className="flex items-center justify-between text-[10px] text-white/30 font-mono tracking-wider">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-3 pt-3 border-t border-white/5">
            <button
              onClick={toggleMute}
              className="text-white/40 hover:text-white/70 transition-colors duration-200"
              aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>

            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="flex-1 h-1 rounded-full appearance-none cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-3
                [&::-webkit-slider-thumb]:h-3
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-white
                [&::-webkit-slider-thumb]:transition-all
                [&::-webkit-slider-thumb]:hover:scale-110
                [&::-webkit-slider-track]:bg-white/10
                [&::-webkit-slider-runnable-track]:rounded-full"
              style={{
                background: `linear-gradient(to right, #C41E3A ${volume * 100}%, rgba(255,255,255,0.1) ${volume * 100}%)`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

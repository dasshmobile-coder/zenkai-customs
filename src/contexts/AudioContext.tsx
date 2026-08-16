import React, { createContext, useContext, useRef, useState, useEffect, useCallback } from 'react';

interface AudioState {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  isLoaded: boolean;
  isEnabled: boolean;
  isMinimized: boolean;
}

interface AudioContextType extends AudioState {
  togglePlay: () => void;
  toggleMute: () => void;
  setVolume: (volume: number) => void;
  seek: (time: number) => void;
  enableAudio: () => void;
  toggleMinimize: () => void;
  formatTime: (seconds: number) => string;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

const AUDIO_SRC = '/music/background.mp3';
const INITIAL_VOLUME = 0.2; // 20%

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState<AudioState>({
    isPlaying: false,
    isMuted: false,
    volume: INITIAL_VOLUME,
    currentTime: 0,
    duration: 0,
    isLoaded: false,
    isEnabled: false,
    isMinimized: true,
  });

  // Initialize audio element once
  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio(AUDIO_SRC);
      audio.preload = 'metadata';
      audio.volume = INITIAL_VOLUME;

      audio.addEventListener('loadedmetadata', () => {
        setState(prev => ({ ...prev, duration: audio.duration, isLoaded: true }));
      });

      audio.addEventListener('timeupdate', () => {
        setState(prev => ({ ...prev, currentTime: audio.currentTime }));
      });

      audio.addEventListener('ended', () => {
        audio.currentTime = 0;
        audio.play();
      });

      audio.addEventListener('error', () => {
        console.warn('Audio failed to load:', AUDIO_SRC);
      });

      audioRef.current = audio;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
    };
  }, []);

  // Sync volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = state.isMuted ? 0 : state.volume;
    }
  }, [state.volume, state.isMuted]);

  const togglePlay = useCallback(() => {
    if (!audioRef.current || !state.isLoaded) return;

    if (state.isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
  }, [state.isPlaying, state.isLoaded]);

  const toggleMute = useCallback(() => {
    setState(prev => ({ ...prev, isMuted: !prev.isMuted }));
  }, []);

  const setVolume = useCallback((newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setState(prev => ({ ...prev, volume: clampedVolume, isMuted: clampedVolume === 0 }));
  }, []);

  const seek = useCallback((time: number) => {
    if (!audioRef.current || !state.isLoaded) return;
    audioRef.current.currentTime = time;
    setState(prev => ({ ...prev, currentTime: time }));
  }, [state.isLoaded]);

  const enableAudio = useCallback(() => {
    setState(prev => ({ ...prev, isEnabled: true, isMinimized: true }));
    if (audioRef.current && state.isLoaded) {
      audioRef.current.play();
      setState(prev => ({ ...prev, isPlaying: true }));
    }
  }, [state.isLoaded]);

  const toggleMinimize = useCallback(() => {
    setState(prev => ({ ...prev, isMinimized: !prev.isMinimized }));
  }, []);

  const formatTime = useCallback((seconds: number): string => {
    if (!isFinite(seconds) || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }, []);

  return (
    <AudioContext.Provider
      value={{
        ...state,
        togglePlay,
        toggleMute,
        setVolume,
        seek,
        enableAudio,
        toggleMinimize,
        formatTime,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};

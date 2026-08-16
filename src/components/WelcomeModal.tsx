import { useState, useEffect } from 'react';
import { useAudio } from '../contexts/AudioContext';
import { Music } from 'lucide-react';

const WELCOME_SHOWN_KEY = 'zenkai-welcome-shown';

export const WelcomeModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const { enableAudio } = useAudio();

  useEffect(() => {
    const hasSeenWelcome = sessionStorage.getItem(WELCOME_SHOWN_KEY);

    if (!hasSeenWelcome) {
      setTimeout(() => {
        setIsVisible(true);
        setTimeout(() => setShowContent(true), 100);
      }, 500);
    }
  }, []);

  const handleEnter = () => {
    setShowContent(false);
    setIsAnimatingOut(true);

    setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem(WELCOME_SHOWN_KEY, 'true');
      enableAudio();
    }, 500);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-6 transition-all duration-700 ${
        isAnimatingOut ? 'opacity-0' : 'opacity-100'
      }`}
      style={{
        backgroundColor: isAnimatingOut ? 'rgba(13, 13, 13, 0)' : 'rgba(13, 13, 13, 0.9)',
      }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-64 h-64 rounded-full blur-[100px] animate-pulse"
          style={{
            background: 'rgba(196, 30, 58, 0.1)',
            top: '20%',
            left: '10%',
            animationDuration: '4s',
          }}
        />
        <div
          className="absolute w-48 h-48 rounded-full blur-[80px] animate-pulse"
          style={{
            background: 'rgba(255, 170, 0, 0.08)',
            bottom: '30%',
            right: '15%',
            animationDuration: '5s',
            animationDelay: '1s',
          }}
        />
      </div>

      {/* Modal Container */}
      <div
        className={`relative max-w-md w-full transition-all duration-700 ${
          showContent && !isAnimatingOut ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        {/* Glassmorphism Card */}
        <div
          className="relative overflow-hidden rounded-3xl"
          style={{
            background: 'linear-gradient(135deg, rgba(45, 45, 45, 0.6) 0%, rgba(26, 26, 26, 0.8) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: `
              0 25px 50px rgba(0, 0, 0, 0.5),
              0 0 0 1px rgba(255, 255, 255, 0.05) inset,
              0 0 100px rgba(196, 30, 58, 0.1)
            `,
          }}
        >
          {/* Top accent gradient */}
          <div
            className="absolute top-0 left-0 right-0 h-px opacity-60"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, #C41E3A 50%, transparent 100%)',
            }}
          />

          {/* Inner glow */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(196, 30, 58, 0.15) 0%, transparent 70%)',
            }}
          />

          {/* Content */}
          <div className="relative z-10 p-10 md:p-12 text-center">
            {/* Logo */}
            <div className="mb-8">
              <div className="inline-block">
                <span className="text-3xl md:text-4xl font-black tracking-[0.05em] text-white">
                  ZENKAI
                </span>
                <span className="block text-xs tracking-[0.3em] text-[#C41E3A] mt-1 font-semibold">
                  CUSTOMS
                </span>
              </div>
            </div>

            {/* Welcome Text */}
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 tracking-tight">
              Bienvenido
            </h2>

            <p className="text-white/50 leading-relaxed mb-8 font-light">
              Explora nuestro catálogo de tarjetas, calcas y diseños exclusivos.
              Desde Ciudad Juárez con pasión por la cultura JDM.
            </p>

            {/* Music info */}
            <div className="flex items-center justify-center gap-3 py-4 px-5 rounded-2xl mb-8 border border-white/5 bg-white/[0.02]">
              <div className="relative">
                <Music className="w-5 h-5 text-[#C41E3A]" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#FFAA00] rounded-full animate-pulse" />
              </div>
              <div className="text-left">
                <p className="text-sm text-white/60 font-light">
                  Música ambiental disponible
                </p>
                <p className="text-xs text-white/30 font-light">
                  Controla el volumen en la esquina inferior izquierda
                </p>
              </div>
            </div>

            {/* Enter Button */}
            <button
              onClick={handleEnter}
              className="group relative w-full py-4 overflow-hidden rounded-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#C41E3A] via-[#C41E3A] to-[#8B0000] transition-all duration-700 group-hover:from-[#8B0000] group-hover:via-[#C41E3A] group-hover:to-[#C41E3A]" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
                    animation: 'shimmer 2s linear infinite',
                    backgroundSize: '200% 100%',
                  }}
                />
              </div>
              <span className="relative z-10 text-white font-semibold tracking-widest text-sm uppercase">
                Entrar
              </span>
            </button>

            {/* Bottom accent */}
            <div
              className="absolute bottom-0 left-0 right-0 h-px opacity-30"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, #C41E3A 50%, transparent 100%)',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

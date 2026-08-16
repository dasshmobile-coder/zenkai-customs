import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const HomePage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.85;
    }
  }, [videoLoaded]);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Video */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            style={{ transform: `scale(1.05)` }}
            onLoadedData={() => setVideoLoaded(true)}
          >
            <source src="/video/background.mp4" type="video/mp4" />
          </video>

          {/* Overlay layers */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D]/70 via-[#0D0D0D]/65 to-[#0D0D0D]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D]/40 via-transparent to-[#0D0D0D]/40" />

          {/* Vignette effect */}
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(13,13,13,0.4) 70%, rgba(13,13,13,0.8) 100%)'
          }} />

          {/* Subtle ambient glow */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#C41E3A]/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#FFAA00]/5 rounded-full blur-[120px]" />
          </div>
        </div>

        {/* Hero Content */}
        <div
          className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-20"
          style={{ transform: `translateY(${scrollY * 0.15}px)`, opacity: Math.max(0, 1 - scrollY * 0.002) }}
        >
          {/* Location Badge */}
          <div className="mb-10 animate-[fade-in_1s_ease-out]">
            <div className="inline-flex items-center gap-3 px-5 py-2 backdrop-blur-md bg-white/5 border border-white/10">
              <div className="flex gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C41E3A] animate-pulse" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFAA00] animate-pulse" style={{ animationDelay: '0.2s' }} />
              </div>
              <span className="text-white/60 text-xs font-medium tracking-[0.2em] uppercase">
                Ciudad Juárez &middot; México
              </span>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="mb-10">
            <span
              className="block text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white tracking-tight animate-[slide-up_1s_ease-out]"
              style={{ animationFillMode: 'backwards', animationDelay: '0.2s' }}
            >
              ZENKAI
            </span>
            <span
              className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-[0.4em] text-white/70 mt-4 animate-[slide-up_1s_ease-out]"
              style={{ animationFillMode: 'backwards', animationDelay: '0.4s' }}
            >
              CUSTOMS
            </span>
          </h1>

          {/* Divider */}
          <div
            className="w-16 h-px mx-auto mb-10 bg-gradient-to-r from-transparent via-[#C41E3A] to-transparent animate-[scale-in_1s_ease-out]"
            style={{ animationFillMode: 'backwards', animationDelay: '0.6s' }}
          />

          {/* Description */}
          <p
            className="text-base sm:text-lg md:text-xl text-white/50 max-w-xl mx-auto mb-12 leading-relaxed font-light animate-[fade-in_1s_ease-out]"
            style={{ animationFillMode: 'backwards', animationDelay: '0.8s' }}
          >
            Personalización premium inspirada en la cultura automotriz japonesa.
            <br className="hidden sm:block" />
            <span className="text-white/40">Tarjetas, calcas y streetwear con identidad.</span>
          </p>

          {/* CTAs */}
          <div
            className="flex flex-wrap justify-center gap-4 animate-[slide-up_1s_ease-out]"
            style={{ animationFillMode: 'backwards', animationDelay: '1s' }}
          >
            <Link
              to="/tarjetas"
              className="group relative px-8 py-4 overflow-hidden"
            >
              <div className="absolute inset-0 bg-[#C41E3A] group-hover:bg-[#8B0000] transition-colors duration-500" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
              </div>
              <span className="relative z-10 flex items-center gap-2 text-sm font-semibold tracking-widest uppercase text-white">
                Explorar catálogo
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>

            <a
              href="https://wa.me/526565808662"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-8 py-4 border border-white/20 text-white text-sm font-semibold tracking-widest uppercase hover:border-[#C41E3A] hover:text-[#C41E3A] transition-all duration-500 backdrop-blur-sm bg-white/5"
            >
              Contactar
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 animate-[fade-in_1.5s_ease-out]">
          <span className="text-white/30 text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/30 via-white/10 to-transparent animate-pulse" />
        </div>
      </section>

      {/* Massive spacing before content */}
      <div className="h-32 md:h-48 lg:h-64" />

      {/* Portals Section */}
      <section className="py-24 md:py-40 lg:py-52 px-6 lg:px-12 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#C41E3A]/5 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-28 md:mb-40">
            <div className="inline-flex items-center gap-4 mb-10">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#C41E3A]/50" />
              <span className="text-white/40 text-xs tracking-[0.3em] uppercase font-light">
                Colecciones
              </span>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#C41E3A]/50" />
            </div>
            <h2 className="section-title text-4xl md:text-5xl lg:text-6xl text-white mb-8">
              Nuestras Líneas
            </h2>
            <div className="divider-line w-20 mx-auto mb-8" />
            <p className="section-description text-white/40 max-w-lg mx-auto">
              Tres categorías diseñadas para quienes buscan calidad y personalización.
            </p>
          </div>

          {/* Portal Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 lg:gap-20">
            <Portal
              to="/tarjetas"
              title="Tarjetas"
              subtitle="IMPRESIÓN PREMIUM"
              description="Papel fotográfico glossy con impresión HD. Para profesionales y negocios."
              image="https://images.pexels.com/photos/6210304/pexels-photo-6210304.jpeg?auto=compress&cs=tinysrgb&w=800"
              delay={0}
            />
            <Portal
              to="/calcas"
              title="Calcas"
              subtitle="VINIL ADHESIVO"
              description="Diseños JDM exclusivos y personalizados. Para autos, laptops y más."
              image="https://images.pexels.com/photos/707046/pexels-photo-707046.jpeg?auto=compress&cs=tinysrgb&w=800"
              delay={0.15}
            />
            <Portal
              to="/fits"
              title="Fits"
              subtitle="STREETWEAR"
              description="Playeras premium con estampado DTF. Diseños exclusivos y personalizados."
              image="https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg?auto=compress&cs=tinysrgb&w=800"
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Transition Space */}
      <div className="relative h-48 md:h-72 lg:h-96">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1A1A1A]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-32 bg-gradient-to-b from-[#C41E3A]/50 to-transparent" />
      </div>

      {/* About Section */}
      <section className="py-24 md:py-40 lg:py-52 bg-[#1A1A1A] relative overflow-hidden">
        {/* Ambient light */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FFAA00]/5 rounded-full blur-[200px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#C41E3A]/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
            {/* Text Content */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-px bg-[#C41E3A]" />
                <span className="text-[#C41E3A] text-xs font-medium tracking-[0.15em] uppercase">
                  Nuestra Historia
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-10 leading-tight tracking-tight">
                Hecho con pasión
                <span className="block text-[#C41E3A] mt-3">desde la frontera</span>
              </h2>

              <p className="text-white/50 leading-relaxed mb-6 text-lg font-light">
                ZENKAI CUSTOMS nace de la admiración por la cultura automotriz japonesa,
                el streetwear y la personalización como forma de expresión.
              </p>
              <p className="text-white/40 leading-relaxed font-light">
                Desde Ciudad Juárez, Chihuahua, creamos productos premium para quienes
                buscan destacarse con autenticidad y estilo propio.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              <FeatureStat value="200+" label="Pedidos mínimos" />
              <FeatureStat value="Premium" label="Materiales" />
              <FeatureStat value="JDM" label="Inspiración" />
              <FeatureStat value="Juárez" label="Origen" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-40 lg:py-52 px-6 relative overflow-hidden">
        {/* Large background text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span
            className="text-[30vw] font-black tracking-tighter"
            style={{
              color: 'transparent',
              WebkitTextStroke: '1px rgba(255,255,255,0.02)',
            }}
          >
            ZENKAI
          </span>
        </div>

        {/* Ambient effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#C41E3A]/5 blur-[150px] pointer-events-none" />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-10 tracking-tight">
            Listo para
            <span className="block text-[#C41E3A] mt-2">destacar?</span>
          </h2>
          <p className="text-white/40 mb-12 max-w-lg mx-auto text-lg font-light">
            Explora nuestro catálogo y solicita tu presupuesto personalizado por WhatsApp.
          </p>
          <Link
            to="/tarjetas"
            className="inline-flex items-center gap-3 group relative px-10 py-5 overflow-hidden"
          >
            <div className="absolute inset-0 bg-[#C41E3A] group-hover:bg-[#8B0000] transition-colors duration-500" />
            <span className="relative z-10 text-sm font-semibold tracking-[0.15em] uppercase text-white">
              Ver catálogo completo
            </span>
            <ArrowRight className="relative z-10 w-5 h-5 text-white transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </div>
  );
};

interface PortalProps {
  to: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  delay: number;
}

const Portal = ({ to, title, subtitle, description, image, delay }: PortalProps) => (
  <Link to={to} className="group block">
    <div
      className="animate-[slide-up_0.8s_ease-out]"
      style={{ animationFillMode: 'backwards', animationDelay: `${delay}s` }}
    >
      {/* Image Container */}
      <div className="product-image-wrapper aspect-[4/5] mb-8">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.85)' }}
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#C41E3A]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content */}
      <div className="space-y-4 text-center">
        <span className="text-[#C41E3A] text-[11px] font-medium tracking-[0.25em] uppercase block">
          {subtitle}
        </span>
        <h3 className="text-2xl md:text-3xl font-extrabold text-white group-hover:text-[#C41E3A] transition-colors duration-500">
          {title}
        </h3>
        <p className="text-white/40 text-sm leading-relaxed font-light max-w-xs mx-auto">
          {description}
        </p>

        {/* Link indicator */}
        <div className="flex items-center justify-center gap-2 text-white/30 text-sm font-light pt-3 group-hover:text-[#C41E3A] transition-colors duration-500">
          <span>Explorar</span>
          <ArrowRight className="w-4 h-4 transition-all duration-500 group-hover:translate-x-2 opacity-0 group-hover:opacity-100" />
        </div>
      </div>
    </div>
  </Link>
);

const FeatureStat = ({ value, label }: { value: string; label: string }) => (
  <div className="p-8 backdrop-blur-sm bg-white/[0.02] border border-white/5 hover:border-[#C41E3A]/20 transition-all duration-500 group">
    <div className="text-3xl md:text-4xl font-bold text-white mb-3 group-hover:text-[#C41E3A] transition-colors duration-500">
      {value}
    </div>
    <div className="text-sm text-white/40 font-light">{label}</div>
  </div>
);

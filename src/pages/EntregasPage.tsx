import { MapPin, Car, Mail, Clock, Phone } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { ScrollReveal } from '../components/ScrollReveal';

export const EntregasPage = () => {
  return (
    <div className="min-h-screen pt-40 md:pt-48 relative">
      {/* Header */}
      <section className="px-6 lg:px-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Información de entrega"
            title="ENTREGAS"
            subtitle="Ciudad Juárez"
            description="Entregas personales en puntos de la ciudad. Coordina tu pedido por WhatsApp."
            accentColor="#00FFC8"
          />
        </div>
      </section>

      {/* Main Content */}
      <section className="px-6 lg:px-12 mb-32 md:mb-48 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
            {/* Main Location */}
            <ScrollReveal>
              <div className="p-10 md:p-12 bg-[#1A1A1A] border border-white/5 rounded-2xl h-full">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 flex items-center justify-center bg-[#C41E3A]/10 rounded-xl">
                    <Car className="w-6 h-6 text-[#C41E3A]" />
                  </div>
                  <h2 className="text-xl font-bold text-white">Entregas personales</h2>
                </div>

                <div className="space-y-6">
                  <div className="p-6 bg-[#0D0D0D] border border-white/5 rounded-xl">
                    <h3 className="text-xs font-semibold text-[#C41E3A] mb-3 tracking-wide uppercase">
                      Zona principal
                    </h3>
                    <p className="text-xl font-bold text-white">Parajes del Sur</p>
                  </div>

                  <p className="text-sm text-white/40 leading-relaxed font-light">
                    Entrega directa en punto acordado dentro de Parajes del Sur.
                    Coordina horario por WhatsApp.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Points */}
            <ScrollReveal delay={100}>
              <div className="p-10 md:p-12 bg-[#1A1A1A] border border-white/5 rounded-2xl h-full">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 flex items-center justify-center border border-white/10 rounded-xl">
                    <MapPin className="w-6 h-6 text-white/60" />
                  </div>
                  <h2 className="text-xl font-bold text-white">Puntos medios</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <LocationCard name="Smart Independencia" />
                  <LocationCard name="Smart Torres Sur" />
                  <LocationCard name="Plaza Sendero Las Torres" />
                  <LocationCard name="Soriana Henequén" />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="px-6 lg:px-12 mb-32 md:mb-48 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
            {/* WhatsApp */}
            <ScrollReveal>
              <div className="p-10 md:p-12 bg-[#1A1A1A] border border-white/5 rounded-2xl h-full group">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 flex items-center justify-center bg-[#25D366]/10 rounded-xl">
                    <Phone className="w-6 h-6 text-[#25D366]" />
                  </div>
                  <h2 className="text-xl font-bold text-white">WhatsApp</h2>
                </div>

                <p className="text-sm text-white/40 mb-10 font-light leading-relaxed">
                  Contacta para coordinar tu entrega o solicitar información.
                </p>

                <a
                  href="https://wa.me/526565808662"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-4 bg-[#25D366] text-white text-center font-semibold tracking-widest text-sm hover:bg-[#20BD5A] transition-colors rounded-xl"
                >
                  +52 656 580 8662
                </a>
              </div>
            </ScrollReveal>

            {/* Email */}
            <ScrollReveal delay={100}>
              <div className="p-10 md:p-12 bg-[#1A1A1A] border border-white/5 rounded-2xl h-full">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 flex items-center justify-center bg-[#0096FF]/10 rounded-xl">
                    <Mail className="w-6 h-6 text-[#0096FF]" />
                  </div>
                  <h2 className="text-xl font-bold text-white">Correo</h2>
                </div>

                <p className="text-sm text-white/40 mb-10 font-light leading-relaxed">
                  Envía tu diseño o consulta directa.
                </p>

                <a
                  href="mailto:zenkaicustoms@gmail.com"
                  className="block w-full py-4 text-center font-semibold tracking-widest text-sm border border-[#0096FF]/30 text-[#0096FF] hover:bg-[#0096FF]/10 hover:border-[#0096FF] transition-all rounded-xl"
                >
                  zenkaicustoms@gmail.com
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="px-6 lg:px-12 py-32 md:py-40 bg-[#1A1A1A]/40 relative z-10">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center justify-center gap-3 mb-16">
              <div className="w-12 h-px" style={{ background: 'linear-gradient(90deg, transparent, #FFFFFF40)' }} />
              <Clock className="w-5 h-5 text-white/40" />
              <h2 className="text-xl font-bold text-white">Horarios</h2>
              <div className="w-12 h-px" style={{ background: 'linear-gradient(90deg, #FFFFFF40, transparent)' }} />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto text-center">
            <ScrollReveal delay={0}>
              <div className="p-8 bg-[#0D0D0D]/50 border border-white/5 rounded-xl">
                <h3 className="text-sm font-semibold text-white/60 mb-4 tracking-wide uppercase">Lunes - Viernes</h3>
                <p className="text-lg font-bold text-white">10:00 AM - 7:00 PM</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <div className="p-8 bg-[#0D0D0D]/50 border border-white/5 rounded-xl">
                <h3 className="text-sm font-semibold text-white/60 mb-4 tracking-wide uppercase">Sábado</h3>
                <p className="text-lg font-bold text-white">10:00 AM - 3:00 PM</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="p-8 bg-[#0D0D0D]/50 border border-white/5 rounded-xl">
                <h3 className="text-sm font-semibold text-white/60 mb-4 tracking-wide uppercase">Domingo</h3>
                <p className="text-lg font-bold text-white/40">Cerrado</p>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={300}>
            <div className="text-center mt-16">
              <div className="inline-flex items-center gap-3 px-6 py-4 border border-white/5 bg-[#0D0D0D]/50 rounded-full">
                <MapPin className="w-4 h-4 text-[#C41E3A]" />
                <span className="text-sm text-white/40">
                  Ciudad Juárez, Chihuahua, México
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

const LocationCard = ({ name }: { name: string }) => (
  <div className="flex items-center gap-3 p-4 bg-[#0D0D0D]/50 border border-white/5 hover:border-white/10 transition-colors rounded-xl">
    <div className="w-1.5 h-1.5 rounded-full bg-[#00FFC8]" />
    <span className="text-sm text-white/50">{name}</span>
  </div>
);

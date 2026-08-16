import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface NavItem {
  to: string;
  label: string;
}

interface SectionNavigationProps {
  items: NavItem[];
}

export const SectionNavigation = ({ items }: SectionNavigationProps) => {
  return (
    <section className="chapter-nav py-32 md:py-48 px-6 relative overflow-hidden">
      {/* Soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#C41E3A]/8 blur-[150px] pointer-events-none" />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <ScrollReveal>
          <span className="text-white/30 text-xs tracking-[0.4em] uppercase font-light block mb-8">
            Continuar
          </span>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-16 tracking-tight">
            Explora más colecciones
          </h2>
        </ScrollReveal>

        <div className="flex flex-wrap justify-center gap-5">
          {items.map((item, i) => (
            <ScrollReveal key={item.to} delay={200 + i * 100}>
              <Link
                to={item.to}
                className="group relative inline-flex items-center gap-3 px-8 py-4 border border-white/10 bg-white/[0.02] backdrop-blur-sm hover:border-[#C41E3A]/40 hover:bg-[#C41E3A]/5 transition-all duration-500"
              >
                <span className="text-sm font-semibold tracking-[0.15em] uppercase text-white/70 group-hover:text-white transition-colors duration-500">
                  {item.label}
                </span>
                <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-[#C41E3A] group-hover:translate-x-1 transition-all duration-500" />
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

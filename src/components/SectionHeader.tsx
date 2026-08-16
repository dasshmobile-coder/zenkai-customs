import { ScrollReveal } from './ScrollReveal';

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  description?: string;
  accentColor?: string;
  maxWidth?: string;
}

export const SectionHeader = ({
  eyebrow,
  title,
  subtitle,
  description,
  accentColor = '#C41E3A',
  maxWidth = 'max-w-2xl',
}: SectionHeaderProps) => {
  return (
    <div className="text-center mb-24 md:mb-32 lg:mb-40">
      {/* Eyebrow */}
      <ScrollReveal>
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="w-12 h-px bg-gradient-to-r from-transparent" style={{ background: `linear-gradient(90deg, transparent, ${accentColor}80)` }} />
          <span
            className="text-xs font-medium tracking-[0.3em] uppercase"
            style={{ color: accentColor }}
          >
            {eyebrow}
          </span>
          <div className="w-12 h-px" style={{ background: `linear-gradient(90deg, ${accentColor}80, transparent)` }} />
        </div>
      </ScrollReveal>

      {/* Title */}
      <ScrollReveal delay={100}>
        <h1 className="section-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-8">
          {title}
        </h1>
      </ScrollReveal>

      {/* Subtitle */}
      {subtitle && (
        <ScrollReveal delay={200}>
          <p className={`section-subtitle text-xl sm:text-2xl md:text-3xl text-white/40 ${maxWidth} mx-auto mb-10`}>
            {subtitle}
          </p>
        </ScrollReveal>
      )}

      {/* Decorative divider */}
      <ScrollReveal delay={250}>
        <div className="divider-line w-20 mx-auto mb-10" />
      </ScrollReveal>

      {/* Description */}
      {description && (
        <ScrollReveal delay={300}>
          <p className={`section-description text-base sm:text-lg text-white/50 ${maxWidth} mx-auto`}>
            {description}
          </p>
        </ScrollReveal>
      )}
    </div>
  );
};

import { useState } from 'react';
import { ShoppingBag, Check } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { calcasZenkaiProducts, calcasCustomProducts } from '../data/products';
import { SectionHeader } from '../components/SectionHeader';
import { SectionNavigation } from '../components/SectionNavigation';
import { ScrollReveal } from '../components/ScrollReveal';

export const CalcasPage = () => {
  return (
    <div className="min-h-screen pt-40 md:pt-48 relative">
      {/* Header */}
      <section className="px-6 lg:px-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Vinil adhesivo premium"
            title="CALCAS PERSONALIZADAS"
            subtitle="Diseños exclusivos y personalizados"
            description="Diseños exclusivos y personalizados en vinil de corte profesional. Para autos, laptops, termos y cualquier superficie."
            accentColor="#0096FF"
          />
        </div>
      </section>

      {/* ZENKAI WORKS Section */}
      <section className="px-6 lg:px-12 mb-32 md:mb-48 relative z-10">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-20 md:mb-24">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-12 h-px" style={{ background: 'linear-gradient(90deg, transparent, #C41E3A80)' }} />
                <span className="text-[#C41E3A] text-xs font-semibold tracking-[0.3em] uppercase">
                  Colección exclusiva
                </span>
                <div className="w-12 h-px" style={{ background: 'linear-gradient(90deg, #C41E3A80, transparent)' }} />
              </div>
              <h2 className="section-title text-3xl md:text-4xl lg:text-5xl text-white mb-5">
                ZENKAI WORKS
              </h2>
              <p className="section-description text-white/40 max-w-xl mx-auto">
                Diseños inspirados en cultura japonesa, mitología y autos JDM.
              </p>
              <div className="divider-line w-16 mx-auto mt-8" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14">
            {calcasZenkaiProducts.map((product, index) => (
              <CalcaCard key={product.id} product={product} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* CUSTOM Section */}
      <section className="px-6 lg:px-12 mb-32 md:mb-48 relative z-10">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-20 md:mb-24">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-12 h-px" style={{ background: 'linear-gradient(90deg, transparent, #FFAA0080)' }} />
                <span className="text-[#FFAA00] text-xs font-semibold tracking-[0.3em] uppercase">
                  Tu diseño
                </span>
                <div className="w-12 h-px" style={{ background: 'linear-gradient(90deg, #FFAA0080, transparent)' }} />
              </div>
              <h2 className="section-title text-3xl md:text-4xl lg:text-5xl text-white mb-5">
                Personalizadas
              </h2>
              <p className="section-description text-white/40 max-w-xl mx-auto">
                Diseños únicos para autos, laptops, termos y cualquier superficie lisa.
              </p>
              <div className="divider-line w-16 mx-auto mt-8" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14">
            {calcasCustomProducts.map((product, index) => (
              <CalcaCard key={product.id} product={product} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Colors Section */}
      <section className="px-6 lg:px-12 py-32 md:py-40 bg-[#1A1A1A]/40 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <ScrollReveal>
              <div className="p-8 rounded-xl border border-white/5 bg-[#0D0D0D]/50 h-full">
                <h3 className="text-sm font-semibold text-white mb-6 tracking-wide uppercase">Colores base</h3>
                <div className="flex flex-wrap gap-2">
                  {['Blanco', 'Negro', 'Rojo', 'Verde', 'Azul', 'Rosa', 'Plata'].map((color) => (
                    <span
                      key={color}
                      className="px-3 py-1.5 text-xs text-white/50 border border-white/10 rounded-full"
                    >
                      {color}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div className="p-8 rounded-xl border border-[#FFAA00]/20 bg-[#FFAA00]/5 h-full">
                <h3 className="text-sm font-semibold text-white mb-6 tracking-wide uppercase">Colores especiales (+$20)</h3>
                <div className="flex flex-wrap gap-2">
                  {['Tornasol', 'Cromado', 'Reflectante'].map((color) => (
                    <span
                      key={color}
                      className="px-3 py-1.5 text-xs text-[#FFAA00]/80 border border-[#FFAA00]/30 rounded-full"
                    >
                      {color}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="p-8 rounded-xl border border-white/5 bg-[#0D0D0D]/50 h-full">
                <h3 className="text-sm font-semibold text-white mb-6 tracking-wide uppercase">Material</h3>
                <p className="text-sm text-white/40 leading-relaxed font-light">
                  Vinil adhesivo premium de corte profesional. Resistente al agua y rayos UV.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <SectionNavigation
        items={[
          { to: '/tarjetas', label: 'Ver Tarjetas' },
          { to: '/fits', label: 'Ver Fits' },
        ]}
      />
    </div>
  );
};

interface CalcaCardProps {
  product: typeof calcasZenkaiProducts[0];
  delay: number;
}

const CalcaCard = ({ product, delay }: CalcaCardProps) => {
  const [isAdded, setIsAdded] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product, 1, undefined, selectedColor ? `Color: ${selectedColor}` : undefined);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <ScrollReveal delay={delay}>
      <div className="group bg-[#1A1A1A] border border-white/5 hover:border-white/10 transition-all duration-500 overflow-hidden rounded-xl">
        <div className="product-image-wrapper rounded-none border-0 shadow-none">
          <div className="relative aspect-square overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(0.9)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent" />
          </div>
        </div>

        <div className="p-7">
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#C41E3A] transition-colors duration-300">
            {product.name}
          </h3>
          <p className="text-white/40 text-sm mb-5 leading-relaxed line-clamp-2 font-light">
            {product.description}
          </p>

          {product.colors && product.colors.length > 0 && (
            <div className="mb-5">
              <div className="flex flex-wrap gap-1.5">
                {product.colors.slice(0, 5).map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-2.5 py-1 text-xs transition-all duration-200 border rounded-full ${
                      selectedColor === color
                        ? 'text-[#C41E3A] border-[#C41E3A]/50'
                        : 'text-white/40 border-white/10 hover:border-white/20'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mb-6">
            <span className="text-2xl font-bold text-white">${product.price}</span>
            <span className="text-white/30 text-sm ml-1">MXN</span>
          </div>

          <button
            onClick={handleAddToCart}
            className={`w-full py-3.5 flex items-center justify-center gap-2 text-sm font-medium transition-all duration-300 rounded-lg ${
              isAdded
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'bg-[#C41E3A] text-white hover:bg-[#8B0000]'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4" />
                Agregado
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                Agregar
              </>
            )}
          </button>
        </div>
      </div>
    </ScrollReveal>
  );
};

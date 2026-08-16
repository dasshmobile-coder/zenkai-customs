import { useState } from 'react';
import { ShoppingBag, Check } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { fitsZenkaiProducts, fitsCustomProducts } from '../data/products';
import { SectionHeader } from '../components/SectionHeader';
import { SectionNavigation } from '../components/SectionNavigation';
import { ScrollReveal } from '../components/ScrollReveal';

export const FitsPage = () => {
  return (
    <div className="min-h-screen pt-40 md:pt-48 relative">
      {/* Header */}
      <section className="px-6 lg:px-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Streetwear premium"
            title="ZENKAI WORKS: FITS"
            subtitle="Ropa exclusiva"
            description="Playeras de algodón premium con estampado DTF Full Color. Diseños únicos para quienes buscan expresar su identidad."
            accentColor="#FFAA00"
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
                  Colección de la marca
                </span>
                <div className="w-12 h-px" style={{ background: 'linear-gradient(90deg, #C41E3A80, transparent)' }} />
              </div>
              <h2 className="section-title text-3xl md:text-4xl lg:text-5xl text-white mb-5">
                ZENKAI WORKS FITS
              </h2>
              <p className="section-description text-white/40 max-w-xl mx-auto italic">
                "Nuestras reglas. Nuestra visión. Nuestra vibra."
              </p>
              <div className="divider-line w-16 mx-auto mt-8" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {fitsZenkaiProducts.map((product, index) => (
              <FitCard key={product.id} product={product} delay={index * 0.1} />
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
                <div className="w-12 h-px" style={{ background: 'linear-gradient(90deg, transparent, #00FFC880)' }} />
                <span className="text-[#00FFC8] text-xs font-semibold tracking-[0.3em] uppercase">
                  Tu diseño
                </span>
                <div className="w-12 h-px" style={{ background: 'linear-gradient(90deg, #00FFC880, transparent)' }} />
              </div>
              <h2 className="section-title text-3xl md:text-4xl lg:text-5xl text-white mb-5">
                Personalizadas
              </h2>
              <p className="section-description text-white/40 max-w-xl mx-auto">
                Playeras personalizadas para parejas, cumpleaños, eventos y negocios.
              </p>
              <div className="divider-line w-16 mx-auto mt-8" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {fitsCustomProducts.map((product, index) => (
              <FitCard key={product.id} product={product} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="px-6 lg:px-12 py-32 md:py-40 bg-[#1A1A1A]/40 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <ScrollReveal>
              <div className="text-center p-8 border border-white/5 bg-[#0D0D0D]/50 rounded-xl">
                <div className="text-2xl md:text-3xl font-bold text-white mb-2">$220-$380</div>
                <div className="text-sm text-white/40">Rango de precios</div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <div className="text-center p-8 border border-white/5 bg-[#0D0D0D]/50 rounded-xl">
                <div className="text-lg font-bold text-white mb-2">Premium</div>
                <div className="text-sm text-white/40">Algodón</div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="text-center p-8 border border-white/5 bg-[#0D0D0D]/50 rounded-xl">
                <div className="text-lg font-bold text-white mb-2">DTF</div>
                <div className="text-sm text-white/40">Full Color</div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <div className="text-center p-8 border border-white/5 bg-[#0D0D0D]/50 rounded-xl">
                <div className="text-lg font-bold text-white mb-2">S-XXL</div>
                <div className="text-sm text-white/40">Tallas</div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <SectionNavigation
        items={[
          { to: '/tarjetas', label: 'Ver Tarjetas' },
          { to: '/calcas', label: 'Ver Calcas' },
        ]}
      />
    </div>
  );
};

interface FitCardProps {
  product: typeof fitsZenkaiProducts[0];
  delay: number;
}

const FitCard = ({ product, delay }: FitCardProps) => {
  const [isAdded, setIsAdded] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <ScrollReveal delay={delay}>
      <div className="group bg-[#1A1A1A] border border-white/5 hover:border-white/10 transition-all duration-500 overflow-hidden rounded-xl">
        <div className="product-image-wrapper rounded-none border-0 shadow-none">
          <div className="relative aspect-[3/4] overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(0.9)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent" />
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-wide group-hover:text-[#C41E3A] transition-colors duration-300">
            {product.name}
          </h3>
          <p className="text-white/40 text-xs mb-5 line-clamp-2 font-light leading-relaxed">
            {product.description}
          </p>

          <div className="mb-5">
            <span className="text-xl font-bold text-white">${product.price}</span>
            <span className="text-white/30 text-xs ml-1">MXN</span>
          </div>

          <button
            onClick={handleAddToCart}
            className={`w-full py-3 flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-wide transition-all duration-300 rounded-lg ${
              isAdded
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'bg-[#C41E3A] text-white hover:bg-[#8B0000]'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                Agregado
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                Agregar
              </>
            )}
          </button>
        </div>
      </div>
    </ScrollReveal>
  );
};

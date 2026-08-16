import { useState } from 'react';
import { ShoppingBag, Check } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { tarjetasProducts } from '../data/products';
import { SectionHeader } from '../components/SectionHeader';
import { SectionNavigation } from '../components/SectionNavigation';
import { ScrollReveal } from '../components/ScrollReveal';

export const TarjetasPage = () => {
  return (
    <div className="min-h-screen pt-40 md:pt-48 relative">
      {/* Header */}
      <section className="px-6 lg:px-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Centro de impresión"
            title="TARJETAS DE PRESENTACIÓN"
            subtitle="Premium"
            description="Papel fotográfico glossy con impresión HD Full Color. Para artistas, negocios y profesionales que buscan destacar."
            accentColor="#C41E3A"
          />
        </div>
      </section>

      {/* Products Grid */}
      <section className="px-6 lg:px-12 mb-32 md:mb-48 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
            {tarjetasProducts.map((product, index) => (
              <TarjetaCard
                key={product.id}
                product={product}
                delay={index * 0.12}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 lg:px-12 py-32 md:py-40 bg-[#1A1A1A]/40 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <DetailBlock title="Material" description="Papel fotográfico glossy de alta calidad con acabado profesional." />
            <DetailBlock title="Impresión" description="Tecnología digital HD Full Color con colores vibrantes." />
            <DetailBlock title="Pedido mínimo" description="Desde 200 tarjetas para el mejor precio por unidad." />
            <DetailBlock title="Entrega" description="Entregas personales en Ciudad Juárez y puntos de reunión." />
          </div>
        </div>
      </section>

      {/* Navigation */}
      <SectionNavigation
        items={[
          { to: '/calcas', label: 'Ver Calcas' },
          { to: '/fits', label: 'Ver Fits' },
        ]}
      />
    </div>
  );
};

const TarjetaCard = ({ product, delay }: { product: typeof tarjetasProducts[0]; delay: number }) => {
  const [isAdded, setIsAdded] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <ScrollReveal delay={delay}>
      <div className="group bg-[#1A1A1A] border border-white/5 hover:border-[#C41E3A]/20 transition-all duration-500 overflow-hidden rounded-xl">
        {/* Image */}
        <div className="product-image-wrapper rounded-none border-0 shadow-none">
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(0.9)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent" />

            {/* Min order badge */}
            <div className="absolute top-4 right-4 px-3 py-1.5 bg-[#C41E3A]/90 text-white text-[10px] font-semibold tracking-wider uppercase rounded-full backdrop-blur-sm">
              {product.minOrder} mín.
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-7 lg:p-8">
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#C41E3A] transition-colors duration-300">
            {product.name}
          </h3>
          <p className="text-white/40 text-sm mb-7 leading-relaxed font-light">
            {product.description}
          </p>

          {/* Price */}
          <div className="mb-7">
            <span className="text-3xl font-bold text-white">${product.price}</span>
            <span className="text-white/30 text-sm ml-1">MXN</span>
          </div>

          {/* Add Button */}
          <button
            onClick={handleAddToCart}
            className={`w-full py-4 flex items-center justify-center gap-2 text-sm font-semibold tracking-wide transition-all duration-300 rounded-lg ${
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
                Agregar al carrito
              </>
            )}
          </button>
        </div>
      </div>
    </ScrollReveal>
  );
};

const DetailBlock = ({ title, description }: { title: string; description: string }) => (
  <ScrollReveal>
    <div className="p-7 border border-white/5 bg-[#0D0D0D]/50 rounded-xl h-full">
      <h4 className="text-sm font-semibold text-white mb-3 tracking-wide uppercase">{title}</h4>
      <p className="text-sm text-white/40 leading-relaxed font-light">{description}</p>
    </div>
  </ScrollReveal>
);

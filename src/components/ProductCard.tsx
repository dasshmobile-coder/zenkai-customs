import { useState } from 'react';
import { ShoppingBag, Check } from 'lucide-react';
import type { Product } from '../types';
import { useCart } from '../contexts/CartContext';

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'compact';
}

export const ProductCard = ({ product, variant = 'default' }: ProductCardProps) => {
  const [isAdded, setIsAdded] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product, 1, undefined, selectedColor ? `Color: ${selectedColor}` : undefined);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  if (variant === 'compact') {
    return (
      <div className="group bg-[#1A1A1A] border border-white/5 hover:border-white/10 transition-colors duration-300">
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent" />
        </div>

        <div className="p-5">
          <h3 className="text-sm font-bold text-white mb-1 uppercase tracking-wide">
            {product.name}
          </h3>
          <p className="text-white/40 text-xs mb-4 line-clamp-2">
            {product.description}
          </p>

          <div className="mb-4">
            <span className="text-xl font-bold text-white">${product.price}</span>
            <span className="text-white/40 text-xs ml-1">MXN</span>
          </div>

          <button
            onClick={handleAddToCart}
            className={`w-full py-2.5 flex items-center justify-center gap-2 font-medium text-xs tracking-wide transition-all duration-300 ${
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
    );
  }

  return (
    <div className="group bg-[#1A1A1A] border border-white/5 hover:border-white/10 transition-colors duration-300">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-white mb-1">
          {product.name}
        </h3>
        <p className="text-white/40 text-sm mb-4 leading-relaxed line-clamp-2">
          {product.description}
        </p>

        {/* Colors */}
        {product.colors && product.colors.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1.5">
              {product.colors.slice(0, 4).map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-2 py-1 text-xs transition-all border ${
                    selectedColor === color
                      ? 'text-[#C41E3A] border-[#C41E3A]/50 bg-[#C41E3A]/10'
                      : 'text-white/50 border-white/10 hover:border-white/20'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Price */}
        <div className="mb-6">
          <span className="text-2xl font-bold text-white">${product.price}</span>
          <span className="text-white/40 text-sm ml-1">MXN</span>
        </div>

        {/* Add to cart */}
        <button
          onClick={handleAddToCart}
          className={`w-full py-3 flex items-center justify-center gap-2 font-medium text-sm tracking-wide transition-all duration-300 ${
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
  );
};

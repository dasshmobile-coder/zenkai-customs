import { Minus, Plus, Trash2, Send, User, MessageSquare, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

export const CartPage = () => {
  const {
    state,
    removeItem,
    updateQuantity,
    setCustomerName,
    setCustomerComments,
    total,
    itemCount,
    generateWhatsAppMessage
  } = useCart();

  const handleWhatsAppSend = () => {
    const message = generateWhatsAppMessage();
    const phoneNumber = '526565808662';
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 md:mb-24">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-10 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="text-sm">Volver</span>
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#C41E3A]" />
            <span className="text-[#C41E3A] text-xs tracking-[0.15em] uppercase">Tu selección</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Carrito
          </h1>
          <p className="text-white/40">
            {itemCount} {itemCount === 1 ? 'producto' : 'productos'}
          </p>
        </div>

        {state.items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Items List */}
            <div className="lg:col-span-2 space-y-6">
              {state.items.map((item, index) => (
                <div
                  key={`${item.product.id}-${item.selectedOption?.id || ''}`}
                  className="flex gap-6 p-6 bg-[#1A1A1A] border border-white/5 relative group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:text-[#C41E3A]"
                    aria-label="Eliminar producto"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  {item.product.image && (
                    <div className="relative w-24 h-24 md:w-28 md:h-28 overflow-hidden flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                        style={{ filter: 'brightness(0.95)' }}
                      />
                    </div>
                  )}

                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#C41E3A] transition-colors">
                      {item.product.name}
                    </h3>
                    {item.selectedOption && (
                      <p className="text-sm text-[#0096FF]">{item.selectedOption.name}</p>
                    )}
                    {item.customDetails && (
                      <p className="text-xs text-white/30 mt-1">{item.customDetails}</p>
                    )}
                    <p className="text-[#C41E3A] font-bold mt-2">
                      ${item.product.price} MXN
                    </p>

                    <div className="flex items-center justify-between mt-5 pt-5 border-t border-white/5">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="w-9 h-9 flex items-center justify-center border border-white/10 hover:border-[#C41E3A]/30 transition-colors disabled:opacity-30"
                        >
                          <Minus className="w-4 h-4 text-white/50" />
                        </button>
                        <span className="w-10 text-center font-bold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-9 h-9 flex items-center justify-center border border-white/10 hover:border-[#C41E3A]/30 transition-colors"
                        >
                          <Plus className="w-4 h-4 text-white/50" />
                        </button>
                      </div>
                      <span className="text-lg font-bold text-white">
                        ${(item.product.price * item.quantity).toFixed(0)} MXN
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-8">
                <div className="p-8 bg-[#1A1A1A] border border-white/5">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-6 h-px bg-[#C41E3A]" />
                    <h2 className="text-lg font-bold text-white">
                      Solicitar presupuesto
                    </h2>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm text-white/50 mb-3">
                        Tu nombre *
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                        <input
                          type="text"
                          placeholder="Nombre completo"
                          value={state.customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          className="w-full bg-[#0D0D0D] border border-white/10 pl-11 pr-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#C41E3A] transition-colors text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-white/50 mb-3">
                        Comentarios
                      </label>
                      <div className="relative">
                        <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-white/30" />
                        <textarea
                          placeholder="Tallas, colores, detalles..."
                          value={state.customerComments}
                          onChange={(e) => setCustomerComments(e.target.value)}
                          rows={3}
                          className="w-full bg-[#0D0D0D] border border-white/10 pl-11 pr-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#C41E3A] transition-colors resize-none text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="py-6 mt-6 border-t border-white/5">
                    <div className="flex items-center justify-between">
                      <span className="text-white/50 text-sm">Total estimado:</span>
                      <span className="text-2xl font-bold text-white">
                        ${total.toFixed(0)} MXN
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleWhatsAppSend}
                    className="w-full py-4 bg-[#25D366] flex items-center justify-center gap-3 font-semibold text-white text-sm hover:bg-[#20BD5A] transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    Enviar por WhatsApp
                  </button>

                  <p className="text-xs text-center text-white/30 mt-4">
                    Se abrirá WhatsApp con tu solicitud
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const EmptyCart = () => (
  <div className="text-center py-24">
    <div className="w-20 h-20 mx-auto mb-10 border border-white/10 flex items-center justify-center">
      <ShoppingBag className="w-8 h-8 text-white/20" />
    </div>
    <h2 className="text-2xl font-bold text-white mb-3">
      Carrito vacío
    </h2>
    <p className="text-white/40 mb-12 text-lg font-light">
      Explora nuestros productos
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Link
        to="/tarjetas"
        className="px-8 py-4 bg-[#C41E3A] text-white font-semibold text-sm hover:bg-[#8B0000] transition-colors"
      >
        Ver Tarjetas
      </Link>
      <Link
        to="/calcas"
        className="px-8 py-4 border border-white/10 text-white/60 font-semibold text-sm hover:border-[#C41E3A]/50 hover:text-white transition-all"
      >
        Ver Calcas
      </Link>
      <Link
        to="/fits"
        className="px-8 py-4 border border-white/10 text-white/60 font-semibold text-sm hover:border-[#C41E3A]/50 hover:text-white transition-all"
      >
        Ver Fits
      </Link>
    </div>
  </div>
);

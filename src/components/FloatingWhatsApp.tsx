import { MessageCircle } from 'lucide-react';

export const FloatingWhatsApp = () => {
  const phoneNumber = '526565808662';
  const message = encodeURIComponent('Hola ZENKAI CUSTOMS! Me gustaría obtener más información.');

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Contactar por WhatsApp"
    >
      <div className="relative">
        {/* Main button */}
        <div
          className="w-12 h-12 flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
            boxShadow: '0 10px 30px rgba(37, 211, 102, 0.3)',
          }}
        >
          <MessageCircle className="w-5 h-5 text-white" />
        </div>

        {/* Pulse effect */}
        <div
          className="absolute inset-0 w-12 h-12 rounded-full animate-ping"
          style={{ background: 'rgba(37, 211, 102, 0.25)', animationDuration: '2s' }}
        />
      </div>
    </a>
  );
};

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { itemCount } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const isHome = location.pathname === '/';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#0D0D0D]/95 backdrop-blur-md border-b border-white/5'
          : isHome
            ? 'bg-transparent'
            : 'bg-[#0D0D0D]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex flex-col relative">
              <span className="text-lg font-bold tracking-[0.1em] text-white transition-colors duration-300">
                ZENKAI
              </span>
              <span className="text-[10px] tracking-[0.2em] text-[#C41E3A] font-semibold -mt-0.5">
                CUSTOMS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            <NavLink to="/">Inicio</NavLink>
            <NavLink to="/tarjetas">Tarjetas</NavLink>
            <NavLink to="/calcas">Calcas</NavLink>
            <NavLink to="/fits">Fits</NavLink>
            <NavLink to="/entregas">Entregas</NavLink>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <Link
              to="/carrito"
              className="relative p-2.5 text-white/50 hover:text-white transition-colors duration-300"
              aria-label="Carrito"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#C41E3A] text-white text-[10px] font-semibold flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2.5 text-white/50 hover:text-white transition-colors"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-[#0D0D0D] border-b border-white/5 overflow-hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'max-h-80' : 'max-h-0'
        }`}
      >
        <nav className="flex flex-col py-6 px-6 gap-1">
          <MobileNavLink to="/">Inicio</MobileNavLink>
          <MobileNavLink to="/tarjetas">Tarjetas</MobileNavLink>
          <MobileNavLink to="/calcas">Calcas</MobileNavLink>
          <MobileNavLink to="/fits">Fits</MobileNavLink>
          <MobileNavLink to="/entregas">Entregas</MobileNavLink>
        </nav>
      </div>
    </header>
  );
};

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`relative text-sm tracking-wide font-medium transition-colors duration-300 ${
        isActive ? 'text-white' : 'text-white/40 hover:text-white'
      }`}
    >
      {children}
      <span
        className={`absolute -bottom-1 left-0 h-px bg-[#C41E3A] transition-all duration-300 ${
          isActive ? 'w-full' : 'w-0'
        }`}
      />
    </Link>
  );
};

const MobileNavLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`py-3 text-sm font-medium transition-colors ${
        isActive ? 'text-[#C41E3A]' : 'text-white/50'
      }`}
    >
      {children}
    </Link>
  );
};

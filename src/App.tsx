import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { MusicPlayer } from './components/MusicPlayer';
import { WelcomeModal } from './components/WelcomeModal';
import { ParticleField } from './components/ParticleField';
import { HomePage } from './pages/HomePage';
import { TarjetasPage } from './pages/TarjetasPage';
import { CalcasPage } from './pages/CalcasPage';
import { FitsPage } from './pages/FitsPage';
import { EntregasPage } from './pages/EntregasPage';
import { CartPage } from './pages/CartPage';

function App() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white relative">
      {/* Ambient particle field */}
      <ParticleField />

      {/* Welcome modal */}
      <WelcomeModal />

      {/* Main content */}
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tarjetas" element={<TarjetasPage />} />
          <Route path="/calcas" element={<CalcasPage />} />
          <Route path="/fits" element={<FitsPage />} />
          <Route path="/entregas" element={<EntregasPage />} />
          <Route path="/carrito" element={<CartPage />} />
        </Routes>
      </main>

      {/* Floating elements */}
      <FloatingWhatsApp />
      <MusicPlayer />
    </div>
  );
}

export default App;

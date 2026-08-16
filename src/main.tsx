import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { CartProvider } from './contexts/CartContext';
import { AudioProvider } from './contexts/AudioContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <AudioProvider>
          <App />
        </AudioProvider>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/Header.jsx';
import ProductPage from './components/ProductPage.jsx';
import CtaBanner from './components/CtaBanner.jsx';
import Footer from './components/Footer.jsx';
import { useMotion } from './lib/motion.js';
import './styles.css';
import { fitWidth } from './lib/fitWidth.js';

fitWidth();

function App() {
  useMotion();
  return (
    <>
      <Header />
      <main className="product-main">
        <ProductPage />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

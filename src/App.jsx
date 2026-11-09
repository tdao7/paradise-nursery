import { useState } from 'react';
import { useSelector } from 'react-redux';
import AboutUs from './AboutUs.jsx';
import ProductList from './ProductList.jsx';
import CartItem from './CartItem.jsx';
import { selectCartCount } from './CartSlice.jsx';
import './App.css';

function Header({ page, onNavigate }) {
  const count = useSelector(selectCartCount);
  return (
    <header className="site-header">
      <div className="header-inner">
        <button type="button" className="brand" onClick={() => onNavigate('home')} aria-label="Paradise Nursery home">
          <span className="brand-mark" aria-hidden="true">✳</span>
          <span className="brand-name">PARADISE <span>NURSERY</span></span>
        </button>
        <nav className="primary-nav" aria-label="Main navigation">
          <button type="button" className={page === 'home' ? 'nav-active' : ''} onClick={() => onNavigate('home')}>Home</button>
          <button type="button" className={page === 'plants' ? 'nav-active' : ''} onClick={() => onNavigate('plants')}>Shop Plants</button>
          <button type="button" className={`cart-nav ${page === 'cart' ? 'nav-active' : ''}`} onClick={() => onNavigate('cart')} aria-label={`Shopping cart with ${count} items`}>
            <span aria-hidden="true">♧</span> Cart <span className="cart-badge">{count}</span>
          </button>
        </nav>
      </div>
    </header>
  );
}

function Landing({ onNavigate }) {
  return (
    <main>
      <section className="landing-hero">
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="hero-eyebrow">A GREENER WAY TO FEEL AT HOME</p>
          <h1>Find your piece<br />of <em>paradise.</em></h1>
          <p className="hero-subtitle">Beautiful houseplants. Happier spaces. A little more nature in every day.</p>
          <button className="hero-cta" type="button" onClick={() => onNavigate('plants')}>Get Started <span aria-hidden="true">↗</span></button>
        </div>
        <div className="hero-corner-label">GROW SOMETHING GOOD · EST. 2024</div>
      </section>
      <div className="features-strip">
        <span>✳ Handpicked favorites</span>
        <span>✳ Plants for every space</span>
        <span>✳ Easy-care options</span>
      </div>
      <AboutUs />
      <section className="bottom-cta">
        <p className="eyebrow">START YOUR GREEN JOURNEY</p>
        <h2>Make room for something wonderful.</h2>
        <button className="button-primary" type="button" onClick={() => onNavigate('plants')}>Shop the collection →</button>
      </section>
    </main>
  );
}

export default function App() {
  const [page, setPage] = useState('home');
  const navigate = (nextPage) => {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="app-shell">
      <Header page={page} onNavigate={navigate} />
      {page === 'home' && <Landing onNavigate={navigate} />}
      {page === 'plants' && <ProductList onNavigate={navigate} />}
      {page === 'cart' && <CartItem onNavigate={navigate} />}
      <footer className="site-footer">
        <span>✳ Paradise Nursery</span>
        <span>Grown with care. Shared with love.</span>
        <span>© {new Date().getFullYear()} Paradise Nursery</span>
      </footer>
    </div>
  );
}

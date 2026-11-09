import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, selectCartItems } from './CartSlice.jsx';
import { categories, formatPrice, plants } from './data/plants.js';

export default function ProductList({ onNavigate }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const [activeCategory, setActiveCategory] = useState('All plants');
  const visibleCategories = activeCategory === 'All plants' ? categories : [activeCategory];
  const inCart = (id) => cartItems.some((item) => item.id === id);

  return (
    <main className="shop-page">
      <div className="page-intro">
        <div>
          <p className="eyebrow">THE PLANT SHOP</p>
          <h1>Meet your new favorite greens.</h1>
          <p className="intro-copy">From fragrant herbs to leafy statement plants, there is something here for every home.</p>
        </div>
        <div className="plant-count"><strong>{plants.length}</strong><span>handpicked plants</span></div>
      </div>
      <div className="filter-bar" aria-label="Filter plants by category">
        {['All plants', ...categories].map((category) => (
          <button
            key={category}
            className={`filter-chip ${activeCategory === category ? 'active' : ''}`}
            type="button"
            aria-pressed={activeCategory === category}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      {visibleCategories.map((category) => (
        <section className="plant-category" key={category} aria-label={category}>
          <div className="category-heading"><h2>{category}</h2><span>{plants.filter((plant) => plant.category === category).length} plants</span></div>
          <div className="plant-grid">
            {plants.filter((plant) => plant.category === category).map((plant) => (
              <article className="plant-card" key={plant.id}>
                <div className="plant-image-wrap">
                  <img src={plant.image} alt={plant.name} loading="lazy" />
                  <span className="plant-tag">{plant.tag}</span>
                </div>
                <div className="plant-card-content">
                  <div className="plant-name-row"><h3>{plant.name}</h3><strong>{formatPrice(plant.price)}</strong></div>
                  <p>{plant.description}</p>
                  <button
                    className={`add-button ${inCart(plant.id) ? 'added' : ''}`}
                    type="button"
                    disabled={inCart(plant.id)}
                    onClick={() => dispatch(addItem(plant))}
                  >
                    {inCart(plant.id) ? '✓ Added to cart' : '+ Add to Cart'}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
      <div className="shop-footer-action">
        <span>Something caught your eye?</span>
        <button className="text-link" type="button" onClick={() => onNavigate('cart')}>View your cart →</button>
      </div>
    </main>
  );
}

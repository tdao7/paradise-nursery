import { useDispatch, useSelector } from 'react-redux';
import { removeItem, selectCartCount, selectCartItems, selectCartTotal, updateQuantity } from './CartSlice.jsx';
import { formatPrice } from './data/plants.js';

export default function CartItem({ onNavigate }) {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const totalItems = useSelector(selectCartCount);
  const totalCost = useSelector(selectCartTotal);

  const changeQuantity = (item, delta) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + delta }));
  };

  return (
    <main className="cart-page">
      <div className="page-intro">
        <div>
          <p className="eyebrow">YOUR BASKET</p>
          <h1>Your little corner of paradise.</h1>
          <p className="intro-copy">Review your choices before they head to their new home.</p>
        </div>
      </div>
      {items.length === 0 ? (
        <section className="empty-cart">
          <div className="empty-cart-illustration" aria-hidden="true">♧</div>
          <h2>Your cart is looking a little bare.</h2>
          <p>There is a whole garden waiting to meet you.</p>
          <button className="button-primary" type="button" onClick={() => onNavigate('plants')}>Explore Plants →</button>
        </section>
      ) : (
        <div className="cart-layout">
          <section className="cart-items" aria-label="Items in your cart">
            <h2>Cart items <span>({totalItems})</span></h2>
            {items.map((item) => (
              <article className="cart-row" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div className="cart-row-details">
                  <h3>{item.name}</h3>
                  <p>{formatPrice(item.price)} each</p>
                  <button className="remove-button" type="button" onClick={() => dispatch(removeItem(item.id))}>Remove</button>
                </div>
                <div className="cart-row-controls">
                  <strong>{formatPrice(item.price * item.quantity)}</strong>
                  <div className="quantity-controls" aria-label={`Quantity of ${item.name}`}>
                    <button type="button" onClick={() => changeQuantity(item, -1)} aria-label={`Decrease ${item.name} quantity`}>−</button>
                    <span aria-live="polite">{item.quantity}</span>
                    <button type="button" onClick={() => changeQuantity(item, 1)} aria-label={`Increase ${item.name} quantity`}>+</button>
                  </div>
                </div>
              </article>
            ))}
          </section>
          <aside className="order-summary" aria-label="Order summary">
            <p className="eyebrow">ORDER SUMMARY</p>
            <h2>Good things are growing.</h2>
            <div className="summary-line"><span>Items</span><span>{totalItems}</span></div>
            <div className="summary-line"><span>Subtotal</span><span>{formatPrice(totalCost)}</span></div>
            <div className="summary-line muted"><span>Delivery</span><span>Calculated at checkout</span></div>
            <div className="summary-total"><strong>Total</strong><strong>{formatPrice(totalCost)}</strong></div>
            <button className="button-primary checkout-button" type="button" onClick={() => window.alert('Coming soon! Checkout is not available yet.')}>Checkout →</button>
            <button className="continue-button" type="button" onClick={() => onNavigate('plants')}>← Continue Shopping</button>
          </aside>
        </div>
      )}
    </main>
  );
}

import { test } from 'vitest';
import assert from 'node:assert/strict';
import { configureStore } from '@reduxjs/toolkit';
import reducer, { addItem, removeItem, updateQuantity, selectCartCount, selectCartTotal } from '../src/CartSlice.jsx';

const plant = { id: 'monstera', name: 'Monstera', price: 24, image: 'plant.jpg' };
const makeStore = () => configureStore({ reducer: { cart: reducer } });

test('addItem adds a new plant and increments an existing plant', () => {
  const store = makeStore();
  store.dispatch(addItem(plant));
  store.dispatch(addItem(plant));
  assert.equal(store.getState().cart.items.length, 1);
  assert.equal(selectCartCount(store.getState()), 2);
  assert.equal(selectCartTotal(store.getState()), 48);
});

test('updateQuantity changes a plant quantity and updates totals', () => {
  const store = makeStore();
  store.dispatch(addItem(plant));
  store.dispatch(updateQuantity({ id: 'monstera', quantity: 3 }));
  assert.equal(selectCartCount(store.getState()), 3);
  assert.equal(selectCartTotal(store.getState()), 72);
});

test('removeItem deletes a plant and zero quantity removes the plant', () => {
  const store = makeStore();
  store.dispatch(addItem(plant));
  store.dispatch(removeItem('monstera'));
  assert.equal(selectCartCount(store.getState()), 0);
  store.dispatch(addItem(plant));
  store.dispatch(updateQuantity({ id: 'monstera', quantity: 0 }));
  assert.equal(selectCartCount(store.getState()), 0);
});

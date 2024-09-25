import {ItemType} from '@src/redux/slices/productsSlice';

export async function fetchProducts() {
  const products: ItemType[] = await fetch(
    'http://localhost:3000/products',
  ).then(res => res.json());
  console.log(products);
  return products;
}

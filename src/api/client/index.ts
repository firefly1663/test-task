import {ItemType} from '@src/redux/slices/productsSlice';
import {Platform} from 'react-native';
import * as fromJSON from 'db.json';

export async function fetchProducts() {
  // ADDED THIS LOGIC BECAUSE json-server doesn't work correct on Android
  // https://github.com/facebook/react-native/issues/33217
  // https://github.com/facebook/react-native/issues/32931

  if (Platform.OS === 'ios') {
    const products: ItemType[] = await fetch(
      'http://localhost:3000/products',
    ).then(res => res.json());
    return products;
  } else {
    const {products} = fromJSON;
    return products;
  }
}

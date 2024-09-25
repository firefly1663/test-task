import {calcTotalPrice} from '@src/utils/calcTotalPrice';
import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export type ItemInCartType = ItemType & {
  count: number;
};

export type ItemType = {
  description: string;
  id: number;
  price: number;
  rating: number;
  stock: number;
  title: string;
  thumbnail: string;
};

export type ProductsState = {
  products: ItemType[];
  cartProducts: ItemInCartType[];
  totalPrice: number;
};

const initialState: ProductsState = {
  products: [],
  cartProducts: [],
  totalPrice: 0,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<ItemType[]>) => {
      state.products = action.payload;
    },
    addProductToCart: (state, action: PayloadAction<ItemType>) => {
      const findItem = state.cartProducts.find(
        obj => obj.id === action.payload.id,
      );

      if (findItem) {
        findItem.count++;
      } else {
        state.cartProducts.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = calcTotalPrice(state.cartProducts);
    },
    clickMinus(state, action: PayloadAction<number>) {
      const findItem = state.cartProducts.find(
        obj => obj.id === action.payload,
      );
      if (findItem && findItem.count > 1) {
        findItem.count--;
      }
      state.totalPrice = calcTotalPrice(state.cartProducts);
    },
    removeProductFromCart: (state, action: PayloadAction<number>) => {
      state.cartProducts = state.cartProducts.filter(
        obj => obj.id !== action.payload,
      );
      state.totalPrice = calcTotalPrice(state.cartProducts);
    },
    clearProducts(state) {
      state.cartProducts = [];
      state.totalPrice = calcTotalPrice(state.cartProducts);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  clickMinus,
  removeProductFromCart,
  addProductToCart,
  setProducts,
  clearProducts,
} = productsSlice.actions;

export const productsSliceReducer = productsSlice.reducer;

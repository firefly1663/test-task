import { ItemInCartType } from "@src/redux/slices/productsSlice";

export const calcTotalPrice = (currentProducts: ItemInCartType[]) => {
  return currentProducts.reduce((sum, obj) => obj.price * obj.count + sum, 0);
};
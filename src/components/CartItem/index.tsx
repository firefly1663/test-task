import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {
  addProductToCart,
  clickMinus,
  ItemInCartType,
  removeProductFromCart,
} from '@src/redux/slices/productsSlice';
import {AddIcon, CloseIcon, Icon, RemoveIcon} from '@components/ui/icon';
import '@styles';

const CartItem = ({id, title, price, count, thumbnail}: ItemInCartType) => {
  const dispatch = useDispatch();

  const onClickPlus = () => {
    dispatch(
      addProductToCart({
        id,
      } as ItemInCartType),
    );
  };

  const onClickMinus = () => {
    dispatch(clickMinus(id));
  };

  const deleteItem = () => {
    dispatch(removeProductFromCart(id));
  };

  return (
    <View className="flex-row items-center p-4 my-[5] bg-white rounded-lg">
      <Image source={{uri: thumbnail}} className="w-16 h-16 rounded-lg" />

      <View className="flex-1 py-[5]">
        <View className="flex-1 ml-4 self-center">
          <Text className="text-black text-lg font-semibold">{title}</Text>
        </View>

        <View className="flex-row self-center">
          <View className="flex-row items-center">
            <TouchableOpacity
              disabled={count === 1}
              onPress={onClickMinus}
              className="p-[2] rounded-full bg-gray-200">
              <Icon
                as={RemoveIcon}
                className="text-typography-500 text-black m-2 w-4 h-4"
              />
            </TouchableOpacity>

            <Text className="text-black mx-4 text-lg">{count}</Text>

            <TouchableOpacity
              onPress={onClickPlus}
              className="p-[2] rounded-full bg-gray-200">
              <Icon
                as={AddIcon}
                className="text-typography-500 text-black m-2 w-4 h-4"
              />
            </TouchableOpacity>
          </View>

          <View className="ml-4">
            <Text className="text-black text-lg font-semibold">
              {(count * price).toFixed(2)} $
            </Text>
          </View>

          <TouchableOpacity
            onPress={deleteItem}
            className="ml-4 p-[2] bg-red-500 rounded-full">
            <Icon
              as={CloseIcon}
              className="text-typography-500 text-black m-2 w-4 h-4"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CartItem;

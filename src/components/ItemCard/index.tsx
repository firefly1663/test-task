import ShoppingCartIcon from '@src/assets/icons/ShoppingCart';
import {useAppDispatch, useAppSelector} from '@src/hooks';
import {addProductToCart, ItemType} from '@src/redux/slices/productsSlice';
import {Text, View} from '@gluestack-ui/themed';
import {Image} from '@src/components/ui/image';
import '@styles';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {CheckCircleIcon, Icon} from '../ui/icon';

const ItemCard = ({item}: {item: ItemType}) => {
  const cartItem = useAppSelector(state =>
    state.products.cartProducts.find(obj => obj.id === item.id),
  );
  const addedCount = cartItem ? cartItem.count : 0;
  const dispatch = useAppDispatch();

  const handleAddItemToCart = (item: ItemType) => {
    dispatch(addProductToCart(item));
  };

  return (
    <View className="flex-1 m-2 bg-[white] align-center text-center jusity-center p-[5] px-[7]">
      <Image
        size="xl"
        borderRadius={12}
        alt="imageOfCart"
        source={{
          uri: item.thumbnail,
        }}
        className="self-center"
      />

      <Text className="text-black my-1 fs-[25]">{item.title}</Text>
      <Text className="text-black my-1">Rating: {item.rating}</Text>
      <Text className="text-black my-1">Stock: {item.stock}</Text>
      <View className="flex-row justify-between align-center">
        <Text className="text-black text">Price: {item.price}$</Text>

        {addedCount > 0 ? (
          <Icon
            as={CheckCircleIcon}
            className="text-typography-100 text-regular text-black w-[26] h-[26]"
          />
        ) : (
          <TouchableOpacity onPress={() => handleAddItemToCart(item)}>
            <ShoppingCartIcon color={'black'} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ItemCard;

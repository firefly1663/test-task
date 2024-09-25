import '@styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import React from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
// import CartItem from '../components/CartItem'; // Должен быть адаптирован для React Native
// import {clearItem} from '../redux/cart/slice';
// import CartEmpty from '../components/CartEmpty'; // Должен быть адаптирован для React Native
// import {selectCart} from '../redux/cart/selectors';
import {useAppDispatch, useAppSelector} from '@src/hooks';
import {CartScreenProps} from '@src/navigation/Main';
import {ArrowLeftIcon, Icon} from '@src/components/ui/icon';
import {clearProducts} from '@src/redux/slices/productsSlice';
import CartItem from '@src/components/CartItem';
import {Button, ButtonText} from '@/components/ui/button';

const CartScreen = ({navigation}: CartScreenProps) => {
  const {cartProducts, totalPrice} = useAppSelector(state => state.products);
  const totalCount = cartProducts.reduce(
    (sum: number, current: any) => sum + current.count,
    0,
  );
  const dispatch = useAppDispatch();

  const handleGoBack = () => {
    navigation.goBack();
  };
  const clear = () => {
    dispatch(clearProducts());
  };

  if (!totalCount) {
    // return <CartEmpty />;
  }

  return (
    <SafeAreaView edges={{top: 'additive', bottom: 'maximum'}}>
      <View className="p-5 flex-row justify-between">
        <TouchableOpacity onPress={handleGoBack}>
          <Icon
            as={ArrowLeftIcon}
            className="text-typography-500 text-[black] w-[26] h-[26]"
          />
        </TouchableOpacity>
        <Text className="text-xl text-black">Cart</Text>
        <View className="w-[26]" />
      </View>

      <View className="p-[15]">
        <View>
          <View className="flex-row justify-between">
            <Text className="text-black text-xl self-center">
              Total products: {totalCount}
            </Text>
            <Button
              onPress={clear}
              size="md"
              variant="outline"
              action="primary"
              className="w-1/3 my-[5]
              self-end
              
              ">
              <ButtonText className="text-black">Clear cart</ButtonText>
            </Button>
          </View>
          <FlatList
            data={cartProducts}
            renderItem={({item}) => <CartItem key={item.id} {...item} />}
            keyExtractor={item => item.id.toString()}
          />
          <View>
            <View>
              <Text className="text-black text-xl self-end my-5">
                Total price: {totalPrice.toFixed(2)} $
              </Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;

import {Input, InputField} from '@components/ui/input';
import {FlatList, Text, View} from '@gluestack-ui/themed';
import {fetchProducts} from '@src/api/client';
import ShoppingCartIcon from '@src/assets/icons/ShoppingCart';
import ItemCard from '@src/components/ItemCard';
import {useAppDispatch, useAppSelector} from '@src/hooks';
import {MarketScreenProps} from '@src/navigation/Main';
import {ItemType, setProducts} from '@src/redux/slices/productsSlice';
import '@styles';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useQuery} from 'react-query';
import {useDebounce} from '../hooks/useDebounce';
import {Button, ButtonText} from '@/components/ui/button';

const MarketScreen = ({navigation}: MarketScreenProps) => {
  const [filteredProducts, setFilteredProducts] = useState<ItemType[]>([]);
  const {products, cartProducts} = useAppSelector(state => state.products);
  const totalCount = cartProducts.reduce(
    (sum: number, current: any) => sum + current.count,
    0,
  );
  const dispatch = useAppDispatch();

  const {isLoading, isError, data, error, isSuccess, refetch} = useQuery(
    'myProducts',
    fetchProducts,
  );
  const onChangeCallback = (text: string) => {
    if (text !== '') {
      setFilteredProducts(
        products.filter(h =>
          h.title.toLowerCase().includes(text.toLocaleLowerCase()),
        ),
      );
    } else {
      setFilteredProducts(products);
    }
  };

  const debouncedOnChangeCallback = useDebounce(onChangeCallback, 300);

  useEffect(() => {
    if (data?.length) {
      dispatch(setProducts(data));
    }
  }, [isSuccess]);

  useEffect(() => {
    if (products) {
      setFilteredProducts(products);
    }
  }, [products]);

  const handleOpenCart = () => {
    navigation.navigate('CartScreen');
  };

  const sendRequestAgain = () => {
    console.log('Here');
    refetch();
  };

  if (isError) {
    return (
      <SafeAreaView>
        <View className="h-full text-center">
          <View className="my-auto">
            <Text className="text-black text-2xl text-center">
              Error: {error.message}
            </Text>
            <Button
              onPress={sendRequestAgain}
              size="md"
              variant="outline"
              action="primary"
              className="w-1/3 my-[15]
              self-center
              ">
              <ButtonText className="text-black">Try again</ButtonText>
            </Button>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      className="flex-1"
      edges={{top: 'additive', bottom: 'maximum'}}>
      <View className="p-5 flex-row justify-between">
        <View className="w-[26]" />
        <Text className="text-xl text-black">Market</Text>
        <TouchableOpacity
          onPress={handleOpenCart}
          className="flex-row content-center justify-center">
          <Text className="text-xl text-black mr-[5]">
            {totalCount > 0 && totalCount}
          </Text>
          <ShoppingCartIcon color={'black'} />
        </TouchableOpacity>
      </View>

      <Input
        variant="outline"
        size="md"
        isDisabled={false}
        isInvalid={false}
        isReadOnly={false}
        className="w-[70%] color-black bg-[white] text-black self-center mb-[10]">
        <InputField
          className="py-[5] text-black"
          onChangeText={debouncedOnChangeCallback}
          placeholder="Search..."
        />
      </Input>

      {isLoading ? (
        <View className="h-1/2 justify-end align-center">
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : (
        <View className="w-full pb-[52]">
          <FlatList
            data={filteredProducts}
            renderItem={({item}: {item: ItemType}) => (
              <ItemCard key={item.id} item={item} />
            )}
            keyExtractor={(item: ItemType) => item.id.toString()}
            numColumns={2}
            contentContainerClassName="pb-[200]"
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default MarketScreen;

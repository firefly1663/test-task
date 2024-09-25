import {GluestackUIProvider} from '@src/components/ui/gluestack-ui-provider';
import {RootRouter} from '@navigation/Router';
import '@styles';
import React from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import {store} from '@src/redux/store';
import {Provider} from 'react-redux';
import {StatusBar} from '@gluestack-ui/themed';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: error => {
        console.error('An error occurred:', error);
      },
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 1,
    },
  },
});

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider mode="light">
        <Provider store={store}>
          <RootRouter />
        </Provider>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}

export default App;

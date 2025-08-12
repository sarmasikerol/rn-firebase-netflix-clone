//import liraries
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/router/rootNavigator';
import { Provider } from 'react-redux';
import { store } from './src/store';
// create a component
const App: React.FC = () => {
  const linking = {
    prefixes: ['http://www.netflix.com', 'https://www.netflix.com'],
    config: {
      screens: {
        TAB: '',
        moviedetail: 'detail/:id', // screens isimleri route ile aynı olmalı
      },
    },
  };
  return (
    <Provider store={store}>
      <NavigationContainer linking={linking}>
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  );
};

//make this component available to the app
export default App;

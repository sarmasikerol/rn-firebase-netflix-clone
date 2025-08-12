//import liraries
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MOVIESDETAIL, NOTIFICATIONS, TAB } from '../utils/routes';
import TabNavigator from './tabNavigator';
import Colors from '../theme';
import MoviesDetail from '../screens/movies/moviesDetail';
import Notification from '../screens/notification/notification';

// create a component
const RootNavigator: React.FC = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.BLACK,
        },
        headerTintColor: Colors.WHITE,
        headerBackTitle: 'Back',
      }}
    >
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={TAB}
        component={TabNavigator}
      />
      <Stack.Screen
        options={{
          headerTitle: 'Film Detayı',
        }}
        name={MOVIESDETAIL}
        component={MoviesDetail}
      />
      <Stack.Screen name={NOTIFICATIONS} component={Notification} />
    </Stack.Navigator>
  );
};

//make this component available to the app
export default RootNavigator;

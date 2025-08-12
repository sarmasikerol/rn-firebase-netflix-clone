//import liraries
import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  DOWNLOADS,
  FASTLAUGHTS,
  GAMES,
  HOME,
  NEWHOT,
  NOTIFICATIONS,
} from '../utils/routes';
import Home from '../screens/home';
import Games from '../screens/games';
import NewHots from '../screens/newhot';
import FastLaughts from '../screens/fastlaughts';
import Downloads from '../screens/downloads';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../theme';
import { useSelector } from 'react-redux';

// create a component
const TabNavigator: React.FC = ({ navigation }) => {
  const Tab = createBottomTabNavigator();

  const notifications = useSelector(
    state => state.notifications?.notifications || [],
  );

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerLeft: () => (
          <Image
            source={require('../assets/icons/netflix.jpg')}
            style={{
              width: 50,
              height: 50,
            }}
          />
        ),
        headerRight: () => (
          <View style={{ flexDirection: 'row', paddingHorizontal: 10 }}>
            <Pressable onPress={() => navigation.navigate(NOTIFICATIONS)}>
              <Ionicons
                name={'notifications-outline'}
                size={28}
                color={Colors.WHITE}
              />
              {notifications.filter(item => !item.read).length != 0 && (
                <View
                  style={{
                    backgroundColor: Colors.RED,
                    position: 'absolute',
                    width: 20,
                    height: 20,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                    left: -3,
                    top: -5,
                  }}
                >
                  <Text style={{ color: Colors.WHITE, fontWeight: '500' }}>
                    {notifications?.filter(item => !item.read).length || 0}
                  </Text>
                </View>
              )}
            </Pressable>
            <Pressable>
              <Ionicons
                name={'search-outline'}
                size={28}
                color={Colors.WHITE}
              />
            </Pressable>
            <Pressable>
              <Ionicons
                name={'person-circle-outline'}
                size={28}
                color={Colors.WHITE}
              />
            </Pressable>
          </View>
        ),
        headerTintColor: Colors.WHITE,
        headerStyle: {
          backgroundColor: Colors.BLACK,
        },
        tabBarStyle: { backgroundColor: Colors.BLACK },
        tabBarIcon: ({ color, size }) => {
          let iconName = '';

          if (route.name === HOME) {
            iconName = 'home-outline';
          } else if (route.name === GAMES) {
            iconName = 'game-controller-outline';
          } else if (route.name === NEWHOT) {
            iconName = 'play-circle-outline';
          } else if (route.name === FASTLAUGHTS) {
            iconName = 'happy-outline';
          } else if (route.name === DOWNLOADS) {
            iconName = 'download-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.WHITE,
        tabBarInactiveTintColor: Colors.GRAY,
      })}
    >
      <Tab.Screen name={HOME} component={Home} />
      <Tab.Screen name={GAMES} component={Games} />
      <Tab.Screen name={NEWHOT} component={NewHots} />
      <Tab.Screen name={FASTLAUGHTS} component={FastLaughts} />
      <Tab.Screen name={DOWNLOADS} component={Downloads} />
    </Tab.Navigator>
  );
};

//make this component available to the app
export default TabNavigator;

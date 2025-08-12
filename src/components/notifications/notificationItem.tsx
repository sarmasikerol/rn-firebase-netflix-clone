//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { NotificationItemProps } from '../../model/ui/notificationsItemProps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../theme';
import { useDispatch } from 'react-redux';
import { markAsRead } from '../../store/slice/notificationSlice';
import { useNavigation } from '@react-navigation/native';
import { MOVIESDETAIL } from '../../utils/routes';

// create a component
const NotificationItem: React.FC<NotificationItemProps> = ({ item }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const updateNotification = () => {
    firestore()
      .collection('Notifications')
      .doc(item.doc)
      .update({
        read: true,
      })
      .then(() => console.log('güncellendi'))
      .catch(err => console.log(err));
  };

  return (
    <Pressable
      onPress={() => {
        dispatch(markAsRead(item.id));
        updateNotification();
        navigation.navigate(MOVIESDETAIL, {
          movie: item.movieId,
          type: 'MOVIE',
        });
      }}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 0.5,
        borderColor: Colors.GRAY,
      }}
    >
      <View>
        <Ionicons
          name={'notifications-outline'}
          size={28}
          color={Colors.WHITE}
        />
        {!item.read && (
          <View
            style={{
              width: 15,
              height: 15,
              backgroundColor: Colors.RED,
              borderRadius: 100,
              position: 'absolute',
              bottom: 0,
              right: -3,
            }}
          />
        )}
      </View>
      <View style={{ flex: 1, marginHorizontal: 10, marginVertical: 10 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 20,
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 18, color: Colors.WHITE }}>
            {item.title}
          </Text>
          <Text style={{ fontSize: 18, color: Colors.GRAY }}>{item.time}</Text>
        </View>
        <Text style={{ fontSize: 18, color: Colors.WHITE }}>
          {item.description}
        </Text>
      </View>
    </Pressable>
  );
};

//make this component available to the app
export default NotificationItem;

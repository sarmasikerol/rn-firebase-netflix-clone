//import liraries
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { defaultScreenStyle } from '../../styles/defaultScreenStyle';
import { useDispatch, useSelector } from 'react-redux';
import NotificationItem from '../../components/notifications/notificationItem';
import { addNotifications } from '../../store/slice/notificationSlice';


// create a component
const Notification: React.FC = () => {
  const { notifications } = useSelector(state => state.notifications);

  return (
    <View style={defaultScreenStyle.container}>
      <FlatList
        data={notifications}
        renderItem={({ item }) => <NotificationItem item={item} />}
      />
    </View>
  );
};

//make this component available to the app
export default Notification;

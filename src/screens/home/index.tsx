//import libraries
import React, { useEffect } from 'react';
import { View, FlatList, Platform, PermissionsAndroid } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { defaultScreenStyle } from '../../styles/defaultScreenStyle';
import { homeData } from '../../utils/homeSections';
import SectionItem from '../../components/movies/sectionItem';
import messaging from '@react-native-firebase/messaging'; // firebase import'unu kaldırdım
import { useDispatch } from 'react-redux';
import { addNotifications } from '../../store/slice/notificationSlice';
import { useNavigation } from '@react-navigation/native';
import { MOVIESDETAIL } from '../../utils/routes';

// create a component
const Home: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const saveNotification = async remoteMessage => {
    const read = remoteMessage?.data?.read == 'false' ? false : true;
    dispatch(addNotifications());
    // firestore
    try {
      await firestore()
        .collection('Notifications')
        .add({
          id: remoteMessage?.data?.id,
          title: remoteMessage.notification?.title,
          description: remoteMessage.notification?.body,
          time: remoteMessage?.data?.time,
          read: read,
          movieId: Number(remoteMessage?.data?.movieId),
          createdAt: firestore.Timestamp.now(),
        });
    } catch (error) {
      console.log('Firestore kayıt hatası:', error);
    }
  };

  const getToken = async () => {
    try {
      const token = await messaging().getToken();
      console.log('🔥 FCM Token:', token);
      return token;
    } catch (error) {
      console.log('Token alma hatası:', error);
    }
  };

  const requestUserPermission = async () => {
    if (Platform.OS === 'android') {
      // await eklendi
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      console.log('Android izin durumu:', granted);
    } else {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
    }
  };

  const subscribeToTopic = async () => {
    try {
      await messaging().subscribeToTopic('Haberler');
      console.log('Abone olundu');
    } catch (error) {
      console.log(error);
    }
  };

  const getNotifications = () => {
    firestore()
      .collection('Notifications')
      .get()
      .then(querySnapshot => {
        const savedNotification = [];
        querySnapshot.forEach(documentSnapshot => {
          savedNotification.push({
            id: documentSnapshot.data().id,
            description: documentSnapshot.data().description,
            moviId: documentSnapshot.data().moviId,
            read: documentSnapshot.data().read,
            time: documentSnapshot.data().time,
            title: documentSnapshot.data().title,
            doc: documentSnapshot.id,
          });
        });
        dispatch(addNotifications(savedNotification));
      });
  };

  useEffect(() => {
    getNotifications();
    async function init() {
      await requestUserPermission();
      await getToken();
      await subscribeToTopic();
    }

    init();

    // foreground
    const unsubscribeForeground = messaging().onMessage(async response => {
      console.log('Foreground bildirim:', response);
      await saveNotification(response);
    });

    // background (uygulama açık ama arka planda)
    const unsubscribeBackground = messaging().onNotificationOpenedApp(
      async remoteMessage => {
        if (remoteMessage) {
          console.log('Tapped bildirim:', remoteMessage);
          await saveNotification(remoteMessage);
          navigation.navigate(MOVIESDETAIL, {
            movieId: remoteMessage?.data?.id,
            type: 'MOVIE',
          });
        }
      },
    );

    // kapalıyken açma
    messaging()
      .getInitialNotification()
      .then(async remoteMessage => {
        if (remoteMessage) {
          console.log('App closed -> opened with notification:', remoteMessage);
          await saveNotification(remoteMessage);
          navigation.navigate(MOVIESDETAIL, {
            movieId: remoteMessage?.data?.id,
            type: 'MOVIE',
          });
        }
      });

    // messaging()
    //   .getInitialNotification()
    //   .then(remoteMessage => {
    //     if (remoteMessage) {
    //       navigation.navigate(MOVIESDETAIL, {
    //         id: remoteMessage?.data?.id,
    //         type: 'MOVIE',
    //       });
    //     }
    //   });

    // İki unsubscribe'ı da return et
    return () => {
      unsubscribeForeground();
      unsubscribeBackground();
    };
  }, []);

  return (
    <View style={defaultScreenStyle.container}>
      <FlatList
        data={homeData}
        renderItem={({ item }) => <SectionItem sectionItem={item} />}
      />
    </View>
  );
};

export default Home;

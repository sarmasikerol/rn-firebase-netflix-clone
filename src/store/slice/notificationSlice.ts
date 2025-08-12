import { createSlice } from '@reduxjs/toolkit';
import { NotificationTypes } from '../../model/data/notificationsTypes';

const initialState: NotificationTypes = {
  pending: false,
  notifications: [],
};

const NotificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotifications: (state, action) => {
      console.log(action.payload);
      state.notifications = action.payload;
    },
    markAsRead: (state, action) => {
      const notificationId = action.payload;
      const notification = state.notifications.find(
        not => not.id === notificationId,
      );
      if (notification) {
        notification.read = true;
      }
    },
  },
});

export const { addNotifications, markAsRead } = NotificationSlice.actions;
export default NotificationSlice.reducer;

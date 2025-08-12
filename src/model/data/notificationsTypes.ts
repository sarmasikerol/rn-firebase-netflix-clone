interface Notification {
  id: string;
  title: string;
  time: string;
  path?: string;
  description: string;
  read: boolean;
  doc: string;
}

interface NotificationTypes {
  notifications: Notification[];
  pending: boolean;
}

export type { NotificationTypes, Notification };

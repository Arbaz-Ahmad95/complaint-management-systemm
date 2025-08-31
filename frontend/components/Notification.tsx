"use client";

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
}

const Notification: React.FC<NotificationProps> = ({ message, type }) => {
  return (
    <div className={`notification ${type === 'error' ? 'notification-error' : 'notification-success'}`}>
      {message}
    </div>
  );
};

export default Notification;
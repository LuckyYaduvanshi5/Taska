import React from 'react';
import { Snackbar } from 'react-native-paper';

interface ToastProps {
  visible: boolean;
  message: string;
  onDismiss: () => void;
  type?: 'success' | 'error' | 'info';
}

export function Toast({ visible, message, onDismiss, type = 'info' }: ToastProps) {
  const getStyle = () => {
    switch (type) {
      case 'success':
        return { backgroundColor: '#4caf50' };
      case 'error':
        return { backgroundColor: '#f44336' };
      default:
        return { backgroundColor: '#2196f3' };
    }
  };

  return (
    <Snackbar
      visible={visible}
      onDismiss={onDismiss}
      action={{
        label: 'Dismiss',
        onPress: onDismiss,
      }}
      style={getStyle()}
      duration={3000}
    >
      {message}
    </Snackbar>
  );
} 
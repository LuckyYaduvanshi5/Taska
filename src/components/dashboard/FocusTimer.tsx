import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, ProgressBar } from 'react-native-paper';

export function FocusTimer() {
  const [isActive, setIsActive] = React.useState(false);
  const [time, setTime] = React.useState(25 * 60); // 25 minutes in seconds
  
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime(time => time - 1);
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isActive, time]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <View style={styles.container}>
      <Text variant="displaySmall" style={styles.timer}>
        {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
      </Text>
      
      <ProgressBar 
        progress={time / (25 * 60)} 
        style={styles.progress} 
      />
      
      <Button 
        mode="contained"
        onPress={() => setIsActive(!isActive)}
        style={styles.button}
      >
        {isActive ? 'Pause' : 'Start Focus'}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  timer: {
    marginVertical: 16,
  },
  progress: {
    width: '100%',
    height: 8,
    marginBottom: 16,
  },
  button: {
    width: '100%',
  },
}); 
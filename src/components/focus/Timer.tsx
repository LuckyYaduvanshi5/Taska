import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, ProgressBar } from 'react-native-paper';

interface TimerProps {
  duration: number; // in minutes
  onComplete: () => void;
  onCancel: () => void;
}

export function Timer({ duration, onComplete, onCancel }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration * 60); // Convert to seconds
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && !isPaused && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            clearInterval(interval);
            setIsActive(false);
            onComplete();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, isPaused, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = 1 - timeLeft / (duration * 60);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
  };

  return (
    <View style={styles.container}>
      <Text variant="displayLarge" style={styles.timer}>
        {formatTime(timeLeft)}
      </Text>

      <ProgressBar
        progress={progress}
        style={styles.progress}
        color="#6200ee"
      />

      <View style={styles.buttonContainer}>
        {!isActive ? (
          <Button mode="contained" onPress={handleStart}>
            Start
          </Button>
        ) : (
          <>
            {isPaused ? (
              <Button mode="contained" onPress={handleResume}>
                Resume
              </Button>
            ) : (
              <Button mode="contained" onPress={handlePause}>
                Pause
              </Button>
            )}
          </>
        )}
        <Button 
          mode="outlined" 
          onPress={onCancel} 
          style={styles.cancelButton}
        >
          Cancel
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  timer: {
    marginVertical: 20,
    fontWeight: 'bold',
  },
  progress: {
    width: '100%',
    height: 8,
    marginVertical: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  cancelButton: {
    marginLeft: 10,
  },
}); 
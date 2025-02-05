import React from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Switch, TouchableRipple } from 'react-native-paper';

interface SettingsItemProps {
  title: string;
  description?: string;
  icon?: string;
  onPress?: () => void;
  value?: boolean;
  onValueChange?: (value: boolean) => void;
  right?: React.ReactNode;
}

export function SettingsItem({
  title,
  description,
  icon,
  onPress,
  value,
  onValueChange,
  right,
}: SettingsItemProps) {
  const isSwitch = typeof value !== 'undefined' && onValueChange;

  return (
    <TouchableRipple onPress={isSwitch ? undefined : onPress}>
      <List.Item
        title={title}
        description={description}
        left={props => icon && <List.Icon {...props} icon={icon} />}
        right={props =>
          right ? (
            right
          ) : isSwitch ? (
            <Switch value={value} onValueChange={onValueChange} />
          ) : null
        }
      />
    </TouchableRipple>
  );
} 
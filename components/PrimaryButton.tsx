import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors, common } from '../theme';

type Props = { label: string; onPress: () => void; disabled?: boolean; variant?: 'primary' | 'secondary' };

export function PrimaryButton({ label, onPress, disabled = false, variant = 'primary' }: Props) {
  return (
    <Pressable accessibilityRole="button" accessibilityState={{ disabled }} disabled={disabled} onPress={onPress}
      style={({ pressed }) => [common.button, variant === 'secondary' && styles.secondary, disabled && { backgroundColor: colors.muted }, pressed && !disabled && { opacity: 0.8 }]}>
      <Text style={[common.buttonText, variant === 'secondary' && styles.secondaryText, disabled && { color: colors.secondary }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  secondary: { backgroundColor: colors.brandLight, borderWidth: 1, borderColor: colors.brand },
  secondaryText: { color: colors.brand },
});

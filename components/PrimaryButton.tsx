import React from 'react';
import { Pressable, Text } from 'react-native';
import { colors, common } from '../theme';

type Props = { label: string; onPress: () => void; disabled?: boolean };

export function PrimaryButton({ label, onPress, disabled = false }: Props) {
  return (
    <Pressable accessibilityRole="button" accessibilityState={{ disabled }} disabled={disabled} onPress={onPress}
      style={({ pressed }) => [common.button, disabled && { backgroundColor: colors.muted }, pressed && !disabled && { backgroundColor: colors.brandDark }]}>
      <Text style={[common.buttonText, disabled && { color: colors.secondary }]}>{label}</Text>
    </Pressable>
  );
}

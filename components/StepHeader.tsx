import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';

type Props = { step: string; onBack: () => void };

export function StepHeader({ step, onBack }: Props) {
  return (
    <View style={styles.row}>
      <Pressable accessibilityRole="button" accessibilityLabel="Назад" onPress={onBack} style={({ pressed }) => [styles.back, pressed && styles.pressed]}>
        <Ionicons name="arrow-back" size={24} color={colors.ink} />
      </Pressable>
      <Text style={styles.step}>{step}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 },
  back: { width: 48, height: 48, borderRadius: 16, borderWidth: 1, borderColor: colors.muted, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center' },
  pressed: { opacity: 0.7 },
  step: { color: colors.secondary, fontSize: 12, lineHeight: 16, fontWeight: '700' },
});

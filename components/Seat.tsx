import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';
import { seatLabel } from '../data/trips';

type Props = { number: number; occupied: boolean; selected: boolean; onPress: () => void };

export function Seat({ number, occupied, selected, onPress }: Props) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={`Место ${seatLabel(number)}`} accessibilityState={{ disabled: occupied, selected }}
      disabled={occupied} onPress={onPress} style={({ pressed }) => [styles.seat, occupied && styles.occupied, selected && styles.selected, pressed && !occupied && { opacity: 0.75 }]}>
      <Text style={[styles.number, occupied && styles.occupiedNumber, selected && styles.selectedNumber]}>{seatLabel(number)}</Text>
      <View style={[styles.bar, occupied && styles.occupiedBar, selected && styles.selectedBar]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  seat: { width: 48, height: 48, borderRadius: 12, borderWidth: 1, borderColor: colors.brand, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 7, gap: 4 },
  occupied: { backgroundColor: colors.muted, borderColor: colors.muted },
  selected: { backgroundColor: colors.brand },
  number: { color: colors.brand, fontSize: 16, fontWeight: '700', lineHeight: 20 },
  occupiedNumber: { color: colors.secondary },
  selectedNumber: { color: colors.white },
  bar: { width: 32, height: 4, backgroundColor: colors.brand },
  occupiedBar: { backgroundColor: colors.line },
  selectedBar: { backgroundColor: colors.white },
});

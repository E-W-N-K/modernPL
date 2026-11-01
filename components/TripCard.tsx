import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { Trip } from '../data/trips';
import { colors, common } from '../theme';

type Props = { trip: Trip; onPress: () => void };

export function TripCard({ trip, onPress }: Props) {
  return (
    <View style={[common.card, styles.card]}>
      <View style={styles.heading}>
        <View style={styles.iconBox}><MaterialCommunityIcons name={trip.transport === 'train' ? 'train' : 'bus'} size={25} color={colors.brand} /></View>
        <View style={{ flex: 1 }}><Text style={styles.name}>{trip.title}</Text><Text style={styles.muted}>{trip.description}</Text></View>
      </View>
      <View style={styles.times}><Text style={styles.time}>{trip.departure}</Text><View style={styles.line} /><Text style={styles.time}>{trip.arrival}</Text></View>
      <View style={styles.places}><Text style={styles.muted}>Минск</Text><Text style={styles.muted}>{trip.duration}</Text><Text style={styles.muted}>Брест</Text></View>
      <View style={styles.rule} />
      <View style={styles.bottom}>
        <View><Text style={styles.price}>{trip.price}</Text><Text style={styles.free}>10 свободных мест</Text></View>
        <Pressable accessibilityRole="button" accessibilityLabel={`Выбрать ${trip.title}`} onPress={onPress} style={({ pressed }) => [styles.next, pressed && { backgroundColor: colors.brandDark }]}><Ionicons name="arrow-forward" color={colors.white} size={24} /></Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 16 },
  heading: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconBox: { width: 40, height: 40, borderRadius: 12, backgroundColor: colors.brandLight, alignItems: 'center', justifyContent: 'center' },
  name: { color: colors.ink, fontSize: 16, fontWeight: '700' },
  muted: { color: colors.secondary, fontSize: 12, lineHeight: 18 },
  times: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 28 },
  time: { color: colors.ink, fontSize: 28, fontWeight: '700' },
  line: { height: 4, backgroundColor: colors.line, flex: 1 },
  places: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 },
  rule: { height: 4, backgroundColor: colors.background, marginTop: 20, marginBottom: 16 },
  bottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  price: { color: colors.ink, fontSize: 20, fontWeight: '700' },
  free: { color: colors.brand, fontSize: 12, marginTop: 8 },
  next: { width: 88, height: 56, backgroundColor: colors.brand, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
});

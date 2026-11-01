import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { seats, seatLabel, trips } from '../data/trips';
import { StepHeader } from '../components/StepHeader';
import { Seat } from '../components/Seat';
import { PrimaryButton } from '../components/PrimaryButton';
import { colors, common } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Seats'>;

export function SeatsScreen({ navigation, route }: Props) {
  const { transport } = route.params;
  const trip = trips[transport];
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <SafeAreaView style={common.screen}>
      <ScrollView contentContainerStyle={common.content}>
        <StepHeader step="03 / МЕСТО" onBack={() => navigation.goBack()} />
        <Text style={common.title}>Выберите место</Text>
        <Text style={[common.subtitle, styles.subtitle]}>{trip.title} · 12 окт · {trip.departure}</Text>
        <View style={styles.legend}>
          <Legend color={colors.white} border label="Свободно" />
          <Legend color={colors.brand} label="Выбрано" />
          <Legend color={colors.muted} label="Занято" />
        </View>
        <View style={[common.card, styles.seatCard]}>
          <View style={styles.seatCardTop}><Text style={styles.area}>{trip.seatArea}</Text><Ionicons name="arrow-forward" size={22} color={colors.secondary} /></View>
          <View style={styles.grid}>
            {seats.map((seat) => <View key={seat} style={[styles.cell, seat % 4 === 3 && styles.aisle]}><Seat number={seat} occupied={trip.occupied.includes(seat)} selected={selected === seat} onPress={() => setSelected(selected === seat ? null : seat)} /></View>)}
          </View>
          <Text style={styles.aisleText}>П Р О Х О Д</Text>
        </View>
        <View style={styles.summary}><View><Text style={styles.summaryTitle}>{selected ? `Место ${seatLabel(selected)}` : 'Место не выбрано'}</Text><Text style={styles.summarySub}>{selected ? `${transport === 'train' ? 'Вагон 03' : 'Салон'} · 1 пассажир` : 'Нажмите на свободное место'}</Text></View><Text style={styles.summaryPrice}>{selected ? trip.price : '–'}</Text></View>
        <View style={styles.confirm}><PrimaryButton label="Подтвердить выбор" disabled={selected === null} onPress={() => selected !== null && navigation.navigate('Confirmation', { transport, seat: selected })} /></View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Legend({ color, border = false, label }: { color: string; border?: boolean; label: string }) {
  return <View style={styles.legendItem}><View style={[styles.legendSwatch, { backgroundColor: color, borderColor: border ? colors.brand : color }]} /><Text style={styles.legendLabel}>{label}</Text></View>;
}

const styles = StyleSheet.create({
  subtitle: { marginTop: 8 },
  legend: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 32, marginBottom: 32 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  legendSwatch: { width: 16, height: 16, borderRadius: 4, borderWidth: 1 },
  legendLabel: { fontSize: 12, color: colors.secondary },
  seatCard: { padding: 16 },
  seatCardTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  area: { color: colors.secondary, fontSize: 12, fontWeight: '700' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 32, rowGap: 16 },
  cell: { width: '25%', alignItems: 'center' },
  aisle: { paddingLeft: 12 },
  aisleText: { color: colors.secondary, fontSize: 12, textAlign: 'center', marginTop: 16 },
  summary: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: 24 },
  summaryTitle: { color: colors.ink, fontSize: 16, fontWeight: '700' },
  summarySub: { color: colors.secondary, fontSize: 12, marginTop: 8 },
  summaryPrice: { color: colors.ink, fontSize: 18, fontWeight: '700' },
  confirm: { marginTop: 28 },
});

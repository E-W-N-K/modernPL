import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
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
type Filter = 'all' | 'favorites';

export function SeatsScreen({ navigation, route }: Props) {
  const { transport } = route.params;
  const trip = trips[transport];
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [filter, setFilter] = useState<Filter>('all');
  const [passengerCount, setPassengerCount] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const visibleSeats = filter === 'all' ? seats : seats.filter((seat) => favoriteIds.includes(seat));
  const total = (trip.priceValue * passengerCount).toFixed(2).replace('.', ',');

  function toggleFavorite(seat: number) {
    setFavoriteIds((prev) => prev.includes(seat) ? prev.filter((id) => id !== seat) : [...prev, seat]);
  }

  function toggleSeat(seat: number) {
    setSelectedSeats((prev) => prev.includes(seat)
      ? prev.filter((id) => id !== seat)
      : prev.length < passengerCount ? [...prev, seat] : prev);
  }

  function decreaseCount() {
    setPassengerCount((prev) => Math.max(1, prev - 1));
    setSelectedSeats((prev) => prev.slice(0, Math.max(1, passengerCount - 1)));
  }

  function increaseCount() {
    setPassengerCount((prev) => Math.min(4, prev + 1));
  }

  return (
    <SafeAreaView style={common.screen}>
      <FlatList
        data={visibleSeats}
        extraData={{ favoriteIds, selectedSeats }}
        keyExtractor={(seat) => String(seat)}
        numColumns={4}
        columnWrapperStyle={styles.gridRow}
        contentContainerStyle={common.content}
        ListHeaderComponent={
          <>
            <StepHeader step="03 / МЕСТО" onBack={() => navigation.goBack()} />
            <Text style={common.title}>Выберите место</Text>
            <Text style={[common.subtitle, styles.subtitle]}>{trip.title} · 12 окт · {trip.departure}</Text>
            <View style={styles.legend}>
              <Legend color={colors.white} border label="Свободно" />
              <Legend color={colors.brand} label="Выбрано" />
              <Legend color={colors.muted} label="Занято" />
            </View>
            <View style={styles.counter}>
              <View><Text style={styles.counterTitle}>Пассажиры</Text><Text style={styles.counterHint}>От 1 до 4 билетов</Text></View>
              <View style={styles.counterActions}>
                <Pressable accessibilityRole="button" accessibilityLabel="Уменьшить число пассажиров" onPress={decreaseCount} style={styles.counterButton}><Text style={styles.counterSymbol}>−</Text></Pressable>
                <Text style={styles.counterValue}>{passengerCount}</Text>
                <Pressable accessibilityRole="button" accessibilityLabel="Увеличить число пассажиров" onPress={increaseCount} style={styles.counterButton}><Text style={styles.counterSymbol}>+</Text></Pressable>
              </View>
            </View>
            <View style={styles.filterRow}>
              {(['all', 'favorites'] as Filter[]).map((item) => (
                <Pressable key={item} accessibilityRole="tab" accessibilityState={{ selected: filter === item }} onPress={() => setFilter(() => item)} style={[styles.filterTab, filter === item && styles.filterActive]}>
                  <Text style={[styles.filterText, filter === item && styles.filterTextActive]}>{item === 'all' ? 'Все места' : `Избранные (${favoriteIds.length})`}</Text>
                </Pressable>
              ))}
            </View>
            <View style={styles.areaRow}><Text style={styles.area}>{trip.seatArea}</Text><Ionicons name="arrow-forward" size={22} color={colors.secondary} /></View>
          </>
        }
        renderItem={({ item: seat }) => {
          const occupied = trip.occupied.includes(seat);
          return (
            <View style={styles.cell}>
              <Seat number={seat} occupied={occupied} selected={selectedSeats.includes(seat)} onPress={() => toggleSeat(seat)} />
              <Pressable accessibilityRole="button" accessibilityLabel={`${favoriteIds.includes(seat) ? 'Убрать из избранного' : 'В избранное'} место ${seatLabel(seat)}`} accessibilityState={{ selected: favoriteIds.includes(seat), disabled: occupied }} disabled={occupied} onPress={() => toggleFavorite(seat)} style={styles.favoriteButton}>
                <Ionicons name={favoriteIds.includes(seat) ? 'heart' : 'heart-outline'} size={20} color={occupied ? colors.line : colors.brand} />
              </Pressable>
            </View>
          );
        }}
        ListEmptyComponent={<Text style={styles.empty}>Пока нет избранных мест. Отметьте свободное место сердечком на вкладке «Все места».</Text>}
        ListFooterComponent={
          <>
            {selectedSeats.length > 0 && <Text style={styles.selectedHint}>Выбрано: {selectedSeats.map(seatLabel).join(', ')}</Text>}
            <View style={styles.summary}>
              <View><Text style={styles.summaryTitle}>{selectedSeats.length === passengerCount ? 'Места выбраны' : `Выберите ещё ${passengerCount - selectedSeats.length}`}</Text><Text style={styles.summarySub}>Пассажиры: {passengerCount} · за билет {trip.price}</Text></View>
              <Text style={styles.summaryPrice}>{total} BYN</Text>
            </View>
            <View style={styles.confirm}><PrimaryButton label="Подтвердить выбор" disabled={selectedSeats.length !== passengerCount} onPress={() => navigation.navigate('Confirmation', { transport, selectedSeats })} /></View>
          </>
        }
      />
    </SafeAreaView>
  );
}

function Legend({ color, border = false, label }: { color: string; border?: boolean; label: string }) {
  return <View style={styles.legendItem}><View style={[styles.legendSwatch, { backgroundColor: color, borderColor: border ? colors.brand : color }]} /><Text style={styles.legendLabel}>{label}</Text></View>;
}

const styles = StyleSheet.create({
  subtitle: { marginTop: 8 },
  legend: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 24, marginBottom: 24 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  legendSwatch: { width: 16, height: 16, borderRadius: 4, borderWidth: 1 },
  legendLabel: { fontSize: 12, color: colors.secondary },
  counter: { backgroundColor: colors.white, borderRadius: 16, padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  counterTitle: { color: colors.ink, fontSize: 16, fontWeight: '700' },
  counterHint: { color: colors.secondary, fontSize: 12, marginTop: 4 },
  counterActions: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  counterButton: { width: 36, height: 36, borderRadius: 12, backgroundColor: colors.brandLight, alignItems: 'center', justifyContent: 'center' },
  counterSymbol: { fontSize: 22, color: colors.brand, fontWeight: '700' },
  counterValue: { fontSize: 18, color: colors.ink, fontWeight: '700' },
  filterRow: { flexDirection: 'row', gap: 8, marginTop: 24, marginBottom: 20 },
  filterTab: { flex: 1, borderRadius: 12, paddingVertical: 12, alignItems: 'center', backgroundColor: colors.muted },
  filterActive: { backgroundColor: colors.brand },
  filterText: { color: colors.secondary, fontWeight: '700' },
  filterTextActive: { color: colors.white },
  areaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  area: { color: colors.secondary, fontSize: 12, fontWeight: '700' },
  gridRow: { justifyContent: 'flex-start' },
  cell: { width: '25%', alignItems: 'center', marginBottom: 12 },
  favoriteButton: { padding: 6 },
  empty: { color: colors.secondary, textAlign: 'center', lineHeight: 20, paddingVertical: 32 },
  selectedHint: { color: colors.brand, fontSize: 14, fontWeight: '700', marginTop: 12 },
  summary: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: 24 },
  summaryTitle: { color: colors.ink, fontSize: 16, fontWeight: '700' },
  summarySub: { color: colors.secondary, fontSize: 12, marginTop: 8 },
  summaryPrice: { color: colors.ink, fontSize: 18, fontWeight: '700' },
  confirm: { marginTop: 28 },
});

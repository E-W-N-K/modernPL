import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { seatLabel, trips } from '../data/trips';
import { StepHeader } from '../components/StepHeader';
import { PrimaryButton } from '../components/PrimaryButton';
import { colors, common } from '../theme';
import { useAuth } from '../context/AuthContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Confirmation'>;

export function ConfirmationScreen({ navigation, route }: Props) {
  const { email } = useAuth();
  const { transport, selectedSeats } = route.params;
  const trip = trips[transport];
  const total = (trip.priceValue * selectedSeats.length).toFixed(2).replace('.', ',');
  return (
    <SafeAreaView style={common.screen}>
      <ScrollView contentContainerStyle={common.content}>
        <StepHeader step="04 / ИТОГ" onBack={() => navigation.goBack()} />
        <View style={styles.check}><Ionicons name="checkmark" size={44} color={colors.brand} /></View>
        <Text style={styles.title}>Отличный выбор!</Text>
        <Text style={styles.subtitle}>Ваш маршрут собран</Text>
        {email && <Text style={styles.account}>Для пользователя {email}</Text>}
        <View style={[common.card, styles.card]}>
          <Text style={styles.route}>Минск → Брест</Text>
          <Text style={styles.date}>12 октября 2026 · {trip.departure}–{trip.arrival}</Text>
          <View style={styles.rule} />
          <Text style={styles.trip}>{trip.title}</Text>
          <Text style={styles.place}>{transport === 'train' ? 'Вагон 03' : 'Салон'} · {selectedSeats.length === 1 ? 'место' : 'места'} {selectedSeats.map(seatLabel).join(', ')}</Text>
          <View style={styles.priceRow}><Text style={styles.priceCaption}>Стоимость {selectedSeats.length} бил.</Text><Text style={styles.price}>{total} BYN</Text></View>
        </View>
        <View style={styles.notice}><Text style={styles.noticeText}>Это демонстрация выбора места. Билет не оплачен и не забронирован.</Text></View>
        <View style={styles.again}><PrimaryButton label="Найти другую поездку" onPress={() => navigation.popTo('Search', { transport })} /></View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  check: { width: 72, height: 72, borderRadius: 24, backgroundColor: colors.brandLight, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', marginTop: 8 },
  title: { color: colors.ink, fontSize: 28, fontWeight: '700', textAlign: 'center', marginTop: 20 },
  subtitle: { color: colors.secondary, fontSize: 16, textAlign: 'center', marginTop: 16 },
  account: { color: colors.brand, fontSize: 12, fontWeight: '700', textAlign: 'center', marginTop: 8 },
  card: { marginTop: 28, padding: 24 },
  route: { color: colors.ink, fontSize: 20, fontWeight: '700' },
  date: { color: colors.secondary, fontSize: 12, marginTop: 12 },
  rule: { height: 4, backgroundColor: colors.muted, marginVertical: 24 },
  trip: { color: colors.ink, fontSize: 16, fontWeight: '700' },
  place: { color: colors.ink, fontSize: 16, marginTop: 8 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 28 },
  priceCaption: { color: colors.secondary, fontSize: 12 },
  price: { color: colors.brand, fontSize: 20, fontWeight: '700' },
  notice: { backgroundColor: colors.warning, borderRadius: 12, padding: 16, marginTop: 24 },
  noticeText: { color: colors.warningText, fontSize: 12, lineHeight: 18 },
  again: { marginTop: 24 },
});

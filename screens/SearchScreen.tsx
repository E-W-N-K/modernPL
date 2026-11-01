import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { Transport } from '../data/trips';
import { StepHeader } from '../components/StepHeader';
import { PrimaryButton } from '../components/PrimaryButton';
import { colors, common } from '../theme';
import { useAuth } from '../context/AuthContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Search'>;

export function SearchScreen({ navigation, route }: Props) {
  const { email } = useAuth();
  const [transport, setTransport] = useState<Transport>(route.params?.transport ?? 'train');
  const [from, setFrom] = useState('Минск');
  const [to, setTo] = useState('Брест');
  const [date, setDate] = useState('12 октября 2026');

  return (
    <SafeAreaView style={common.screen}>
      <ScrollView contentContainerStyle={common.content} keyboardShouldPersistTaps="handled">
        <StepHeader step="01 / ПОИСК" onBack={() => navigation.goBack()} />
        <Text style={common.title}>Куда отправимся?</Text>
        {email && <Text style={styles.signedIn}>Вы вошли как {email}</Text>}
        <Text style={[common.subtitle, styles.subtitle]}>Выберите транспорт и маршрут</Text>
        <View style={styles.tabs}>
          {(['train', 'bus'] as Transport[]).map((item) => (
            <Pressable key={item} accessibilityRole="tab" accessibilityState={{ selected: transport === item }} onPress={() => setTransport(() => item)} style={[styles.tab, transport === item && styles.tabActive]}>
              <MaterialCommunityIcons name={item === 'train' ? 'train' : 'bus'} size={22} color={transport === item ? colors.brand : colors.secondary} />
              <Text style={[styles.tabText, transport === item && styles.tabTextActive]}>{item === 'train' ? 'Поезд' : 'Автобус'}</Text>
            </Pressable>
          ))}
        </View>
        <Text style={styles.label}>Откуда</Text>
        <View style={styles.field}><Ionicons name="location-outline" size={22} color={colors.secondary} /><TextInput style={styles.input} value={from} onChangeText={(value) => setFrom(() => value)} accessibilityLabel="Откуда" /></View>
        <Text style={styles.label}>Куда</Text>
        <View style={styles.field}><Ionicons name="location-outline" size={22} color={colors.secondary} /><TextInput style={styles.input} value={to} onChangeText={(value) => setTo(() => value)} accessibilityLabel="Куда" /></View>
        <Text style={styles.label}>Дата поездки</Text>
        <View style={styles.field}><Ionicons name="calendar-outline" size={22} color={colors.secondary} /><TextInput style={styles.input} value={date} onChangeText={(value) => setDate(() => value)} accessibilityLabel="Дата поездки" /></View>
        <View style={styles.passenger}><Ionicons name="person-outline" size={22} color={colors.brand} /><Text style={styles.passengerText}>1 взрослый</Text></View>
        <View style={styles.searchButton}><PrimaryButton label="Найти рейсы" onPress={() => navigation.navigate('Results', { transport })} /></View>
        <Text style={styles.note}>Прямые рейсы · цены за одного пассажира</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  signedIn: { color: colors.brand, fontSize: 12, fontWeight: '700', marginTop: 8 },
  subtitle: { marginTop: 8 },
  tabs: { backgroundColor: colors.muted, borderRadius: 20, padding: 4, flexDirection: 'row', gap: 8, marginTop: 24, marginBottom: 16 },
  tab: { flex: 1, height: 48, borderRadius: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  tabActive: { backgroundColor: colors.white },
  tabText: { color: colors.secondary, fontSize: 16, fontWeight: '700' },
  tabTextActive: { color: colors.brand },
  label: { color: colors.secondary, fontSize: 12, fontWeight: '700', marginTop: 16, marginBottom: 8 },
  field: { height: 56, backgroundColor: colors.white, borderColor: colors.line, borderWidth: 1, borderRadius: 12, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', gap: 16 },
  input: { flex: 1, fontSize: 16, color: colors.ink, paddingVertical: 0 },
  passenger: { height: 48, backgroundColor: colors.brandLight, borderRadius: 12, marginTop: 24, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', gap: 16 },
  passengerText: { color: colors.ink, fontSize: 16 },
  searchButton: { marginTop: 24 },
  note: { color: colors.secondary, textAlign: 'center', fontSize: 12, marginTop: 24 },
});

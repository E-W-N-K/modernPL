import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { trips } from '../data/trips';
import { StepHeader } from '../components/StepHeader';
import { TripCard } from '../components/TripCard';
import { colors, common } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Results'>;

export function ResultsScreen({ navigation, route }: Props) {
  const { transport } = route.params;
  return (
    <SafeAreaView style={common.screen}>
      <ScrollView contentContainerStyle={common.content}>
        <StepHeader step="02 / РЕЙСЫ" onBack={() => navigation.goBack()} />
        <Text style={common.title}>Минск → Брест</Text>
        <Text style={[common.subtitle, styles.subtitle]}>12 октября, пн · 1 взрослый</Text>
        <View style={styles.found}><MaterialCommunityIcons name={transport === 'train' ? 'train' : 'bus'} size={25} color={colors.brand} /><Text style={styles.foundText}>Найден 1 прямой рейс</Text></View>
        <View style={styles.card}>
          {transport === 'train'
            ? <TripCard trip={trips.train} onPress={() => navigation.navigate('Seats', { transport: 'train' })} />
            : <TripCard trip={trips.bus} onPress={() => navigation.navigate('Seats', { transport: 'bus' })} />}
        </View>
        <View style={styles.hint}><MaterialCommunityIcons name="ticket-confirmation-outline" size={24} color={colors.brand} /><View style={{ flex: 1 }}><Text style={styles.hintTitle}>Место выбираете вы</Text><Text style={styles.hintText}>Схема {transport === 'train' ? 'вагона' : 'салона'}, свободные места и стоимость – на следующем шаге.</Text></View></View>
        <Pressable accessibilityRole="button" onPress={() => navigation.goBack()} style={styles.change}><Text style={common.link}>Изменить поиск</Text></Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  subtitle: { marginTop: 8 },
  found: { height: 48, backgroundColor: colors.brandLight, borderRadius: 12, flexDirection: 'row', alignItems: 'center', gap: 16, paddingHorizontal: 16, marginTop: 24 },
  foundText: { color: colors.brand, fontSize: 16, fontWeight: '700' },
  card: { marginTop: 24 },
  hint: { borderRadius: 16, backgroundColor: colors.white, padding: 16, flexDirection: 'row', gap: 16, marginTop: 24 },
  hintTitle: { color: colors.ink, fontSize: 16, fontWeight: '700' },
  hintText: { color: colors.secondary, fontSize: 12, lineHeight: 18, marginTop: 8 },
  change: { marginTop: 40, paddingVertical: 8 },
});

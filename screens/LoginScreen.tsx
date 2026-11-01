import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { PrimaryButton } from '../components/PrimaryButton';
import { colors, common } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export function LoginScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={common.screen}>
      <ScrollView contentContainerStyle={[common.content, styles.content]} keyboardShouldPersistTaps="handled">
        <View style={styles.brandRow}>
          <View style={styles.logo}><MaterialCommunityIcons name="ticket-confirmation-outline" size={28} color={colors.white} /></View>
          <View><Text style={styles.brand}>ПОПУТИ</Text><Text style={styles.brandSub}>ПОЕЗДА И АВТОБУСЫ</Text></View>
        </View>
        <View style={styles.hero}>
          <View style={styles.routeLine}><View style={styles.dot} /><View style={styles.track} /><MaterialCommunityIcons name="train" size={28} color={colors.brand} /><View style={styles.track} /><View style={styles.dot} /></View>
          <View style={styles.cities}><Text style={styles.city}>Минск</Text><Text style={styles.city}>Брест</Text></View>
          <Text style={styles.heroCaption}>Хорошая поездка начинается здесь</Text>
        </View>
        <Text style={common.title}>Поехали вместе</Text>
        <Text style={[common.subtitle, styles.intro]}>Войдите, чтобы выбрать свой маршрут</Text>
        <Text style={styles.label}>Электронная почта</Text>
        <View style={styles.inputWrap}><Ionicons name="mail-outline" size={22} color={colors.secondary} /><TextInput style={styles.input} autoCapitalize="none" keyboardType="email-address" defaultValue="student@example.com" accessibilityLabel="Электронная почта" /></View>
        <Text style={styles.label}>Пароль</Text>
        <View style={styles.inputWrap}><Ionicons name="lock-closed-outline" size={22} color={colors.secondary} /><TextInput style={styles.input} secureTextEntry defaultValue="password" accessibilityLabel="Пароль" /></View>
        <View style={styles.loginButton}><PrimaryButton label="Войти" onPress={() => navigation.navigate('Search', { transport: 'train' })} /></View>
        <Text style={styles.note}>Учебный прототип · без создания аккаунта</Text>
        <Text style={styles.tagline}>Ближе к тем, кто ждёт</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: 40 },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  logo: { width: 48, height: 48, borderRadius: 16, backgroundColor: colors.brand, alignItems: 'center', justifyContent: 'center' },
  brand: { color: colors.ink, fontSize: 20, fontWeight: '700' },
  brandSub: { color: colors.secondary, fontSize: 12, fontWeight: '700', marginTop: 3 },
  hero: { height: 144, backgroundColor: colors.brandLight, borderRadius: 24, marginTop: 32, padding: 16, justifyContent: 'center' },
  routeLine: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  dot: { width: 20, height: 20, borderRadius: 8, backgroundColor: colors.brand },
  track: { height: 4, backgroundColor: colors.brand, flex: 1 },
  cities: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  city: { color: colors.brand, fontSize: 12, fontWeight: '700' },
  heroCaption: { color: colors.secondary, textAlign: 'center', fontSize: 12, marginTop: 8 },
  intro: { marginTop: 8, marginBottom: 24 },
  label: { color: colors.secondary, fontSize: 12, fontWeight: '700', marginBottom: 8, marginTop: 12 },
  inputWrap: { backgroundColor: colors.white, borderColor: colors.line, borderWidth: 1, borderRadius: 12, height: 56, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', gap: 16 },
  input: { flex: 1, color: colors.ink, fontSize: 16, paddingVertical: 0 },
  loginButton: { marginTop: 32 },
  note: { color: colors.secondary, fontSize: 12, textAlign: 'center', marginTop: 24 },
  tagline: { color: colors.brand, fontSize: 12, fontWeight: '700', textAlign: 'center', marginTop: 28 },
});

import { StyleSheet } from 'react-native';

export const colors = {
  brand: '#176B52',
  brandDark: '#10503D',
  brandLight: '#EAF4EE',
  ink: '#172C26',
  secondary: '#5B7067',
  line: '#C9D7CF',
  muted: '#E1E8E3',
  background: '#F3F6F2',
  white: '#FFFFFF',
  warning: '#F9EDCA',
  warningText: '#725318',
};

export const common = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 20, paddingBottom: 32 },
  title: { color: colors.ink, fontSize: 28, lineHeight: 34, fontWeight: '700' },
  subtitle: { color: colors.secondary, fontSize: 12, lineHeight: 20 },
  button: { backgroundColor: colors.brand, minHeight: 56, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  buttonText: { color: colors.white, fontSize: 16, lineHeight: 24, fontWeight: '700' },
  link: { color: colors.brand, fontSize: 16, fontWeight: '700', textAlign: 'center' },
  card: { backgroundColor: colors.white, borderColor: colors.muted, borderWidth: 1, borderRadius: 24 },
});

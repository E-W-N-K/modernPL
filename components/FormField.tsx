import React, { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

type Props = { label: string; error?: string; children: ReactNode };

export function FormField({ label, error, children }: Props) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      {children}
      {error ? <Text style={styles.error} accessibilityRole="alert">{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  field: { marginTop: 12 },
  label: { color: colors.secondary, fontSize: 12, fontWeight: '700', marginBottom: 8 },
  error: { color: '#A33A30', fontSize: 12, marginTop: 6 },
});

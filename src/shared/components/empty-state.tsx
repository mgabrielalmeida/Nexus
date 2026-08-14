import type { PropsWithChildren, ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { useAppTheme } from '@/shared/theme';

import { AppText } from './app-text';

export type EmptyStateProps = PropsWithChildren<{
  description: string;
  icon?: ReactNode;
  title: string;
}>;

export function EmptyState({
  children,
  description,
  icon,
  title,
}: EmptyStateProps) {
  const theme = useAppTheme();

  return (
    <View
      style={[
        styles.container,
        {
          gap: theme.spacing.md,
          paddingHorizontal: theme.spacing.lg,
        },
      ]}
    >
      {icon ? (
        <View
          style={[
            styles.icon,
            {
              backgroundColor: theme.colors.surfaceMuted,
              borderRadius: theme.radius.pill,
            },
          ]}
        >
          {icon}
        </View>
      ) : null}
      <View style={{ gap: theme.spacing.xs }}>
        <AppText style={styles.centeredText} variant="heading">
          {title}
        </AppText>
        <AppText color="textMuted" style={styles.centeredText} variant="body">
          {description}
        </AppText>
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  centeredText: {
    textAlign: 'center',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 420,
    width: '100%',
  },
  icon: {
    alignItems: 'center',
    height: 72,
    justifyContent: 'center',
    width: 72,
  },
});

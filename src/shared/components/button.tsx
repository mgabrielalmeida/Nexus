import type { ComponentProps } from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { useAppTheme } from '@/shared/theme';

import { AppText } from './app-text';

type PressableProps = ComponentProps<typeof Pressable>;

export type ButtonProps = Omit<PressableProps, 'children'> & {
  label: string;
  variant?: 'primary' | 'secondary';
};

export function Button({
  disabled = false,
  label,
  style,
  variant = 'primary',
  ...props
}: ButtonProps) {
  const theme = useAppTheme();
  const isPrimary = variant === 'primary';

  return (
    <Pressable
      {...props}
      accessibilityRole="button"
      disabled={disabled}
      style={(state) => [
        styles.base,
        {
          backgroundColor: isPrimary
            ? state.pressed
              ? theme.colors.primaryPressed
              : theme.colors.primary
            : state.pressed
              ? theme.colors.surfaceMuted
              : theme.colors.surface,
          borderColor: isPrimary ? theme.colors.primary : theme.colors.border,
          borderRadius: theme.radius.md,
          opacity: disabled ? 0.5 : 1,
          paddingHorizontal: theme.spacing.lg,
        },
        typeof style === 'function' ? style(state) : style,
      ]}
    >
      <AppText
        color={isPrimary ? 'onPrimary' : 'primary'}
        numberOfLines={1}
        variant="label"
      >
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    borderWidth: 1,
    justifyContent: 'center',
    minHeight: 48,
  },
});

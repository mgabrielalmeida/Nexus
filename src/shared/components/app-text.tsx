import type { ComponentProps } from 'react';
import { Text } from 'react-native';

import { type ThemeColors, useAppTheme } from '@/shared/theme';

type TextProps = ComponentProps<typeof Text>;
type TextVariant = 'title' | 'heading' | 'body' | 'label' | 'caption';

export type AppTextProps = TextProps & {
  color?: keyof ThemeColors;
  variant?: TextVariant;
};

export function AppText({
  color = 'text',
  style,
  variant = 'body',
  ...props
}: AppTextProps) {
  const theme = useAppTheme();

  return (
    <Text
      {...props}
      style={[theme.typography[variant], { color: theme.colors[color] }, style]}
    />
  );
}

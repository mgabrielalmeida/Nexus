import type { PropsWithChildren } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAppTheme } from '@/shared/theme';

export type ScreenProps = PropsWithChildren<{
  padded?: boolean;
  style?: StyleProp<ViewStyle>;
}>;

export function Screen({ children, padded = true, style }: ScreenProps) {
  const theme = useAppTheme();

  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={[
        {
          backgroundColor: theme.colors.background,
          flex: 1,
          padding: padded ? theme.spacing.md : 0,
        },
        style,
      ]}
    >
      {children}
    </SafeAreaView>
  );
}

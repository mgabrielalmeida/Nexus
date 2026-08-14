import { Stack } from 'expo-router';

import { useAppTheme } from '@/shared/theme';

export default function TasksLayout() {
  const theme = useAppTheme();

  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: theme.colors.background },
        headerShown: false,
      }}
    />
  );
}

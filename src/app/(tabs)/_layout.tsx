import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';

import { useAppTheme } from '@/shared/theme';

export default function TabLayout() {
  const theme = useAppTheme();

  return (
    <Tabs
      initialRouteName="finances"
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: theme.colors.background },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textMuted,
        tabBarLabelStyle: { fontWeight: '600' },
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
        },
      }}
    >
      <Tabs.Screen
        name="finances"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons color={color} name="wallet-outline" size={size} />
          ),
          title: 'Finanças',
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              color={color}
              name="checkmark-circle-outline"
              size={size}
            />
          ),
          title: 'Tarefas',
        }}
      />
      <Tabs.Screen
        name="habits"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons color={color} name="repeat-outline" size={size} />
          ),
          title: 'Hábitos',
        }}
      />
    </Tabs>
  );
}

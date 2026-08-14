import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs initialRouteName="finances" screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="finances" options={{ title: 'Finanças' }} />
      <Tabs.Screen name="tasks" options={{ title: 'Tarefas' }} />
      <Tabs.Screen name="habits" options={{ title: 'Hábitos' }} />
    </Tabs>
  );
}

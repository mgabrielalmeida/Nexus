import Ionicons from '@expo/vector-icons/Ionicons';

import { EmptyState, Screen } from '@/shared/components';
import { useAppTheme } from '@/shared/theme';

export default function TasksRoute() {
  const theme = useAppTheme();

  return (
    <Screen style={{ alignItems: 'center', justifyContent: 'center' }}>
      <EmptyState
        description="Sua agenda pessoal será construída aqui."
        icon={
          <Ionicons
            color={theme.colors.primary}
            name="checkmark-circle-outline"
            size={32}
          />
        }
        title="Tarefas"
      />
    </Screen>
  );
}

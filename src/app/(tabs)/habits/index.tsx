import Ionicons from '@expo/vector-icons/Ionicons';

import { EmptyState, Screen } from '@/shared/components';
import { useAppTheme } from '@/shared/theme';

export default function HabitsRoute() {
  const theme = useAppTheme();

  return (
    <Screen style={{ alignItems: 'center', justifyContent: 'center' }}>
      <EmptyState
        description="Seu acompanhamento diário será construído aqui."
        icon={
          <Ionicons
            color={theme.colors.primary}
            name="repeat-outline"
            size={32}
          />
        }
        title="Hábitos"
      />
    </Screen>
  );
}

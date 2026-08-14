import Ionicons from '@expo/vector-icons/Ionicons';

import { EmptyState, Screen } from '@/shared/components';
import { useAppTheme } from '@/shared/theme';

export default function FinancesRoute() {
  const theme = useAppTheme();

  return (
    <Screen style={{ alignItems: 'center', justifyContent: 'center' }}>
      <EmptyState
        description="Seu painel financeiro será construído aqui."
        icon={
          <Ionicons
            color={theme.colors.primary}
            name="wallet-outline"
            size={32}
          />
        }
        title="Finanças"
      />
    </Screen>
  );
}

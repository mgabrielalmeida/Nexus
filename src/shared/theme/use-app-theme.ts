import { type ColorSchemeName, useColorScheme } from 'react-native';

import { darkTheme, lightTheme } from './theme';

export function resolveAppTheme(
  colorScheme: ColorSchemeName | null | undefined,
) {
  return colorScheme === 'dark' ? darkTheme : lightTheme;
}

export function useAppTheme() {
  return resolveAppTheme(useColorScheme());
}

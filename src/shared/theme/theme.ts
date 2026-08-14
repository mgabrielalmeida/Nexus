import { radius, spacing, typography } from './tokens';

const lightColors = {
  background: '#F6F7FB',
  surface: '#FFFFFF',
  surfaceMuted: '#EEF1F7',
  text: '#181B24',
  textMuted: '#626978',
  border: '#DDE1EA',
  primary: '#4F46E5',
  primaryPressed: '#4338CA',
  onPrimary: '#FFFFFF',
  success: '#16835A',
  danger: '#C23B4A',
  placeholder: '#8A91A0',
} as const;

export type ThemeColors = Record<keyof typeof lightColors, string>;

const darkColors: ThemeColors = {
  background: '#0F1117',
  surface: '#181B24',
  surfaceMuted: '#20242F',
  text: '#F5F6FA',
  textMuted: '#A8AFBF',
  border: '#303644',
  primary: '#8B83FF',
  primaryPressed: '#7770E6',
  onPrimary: '#11131B',
  success: '#49C58A',
  danger: '#FF7C89',
  placeholder: '#7D8596',
};

export type AppTheme = {
  dark: boolean;
  colors: ThemeColors;
  spacing: typeof spacing;
  radius: typeof radius;
  typography: typeof typography;
};

export const lightTheme: AppTheme = {
  dark: false,
  colors: lightColors,
  spacing,
  radius,
  typography,
};

export const darkTheme: AppTheme = {
  dark: true,
  colors: darkColors,
  spacing,
  radius,
  typography,
};

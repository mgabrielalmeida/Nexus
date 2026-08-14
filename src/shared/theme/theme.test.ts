import { darkTheme, lightTheme, resolveAppTheme } from './index';

describe('resolveAppTheme', () => {
  it('returns the dark theme for the dark color scheme', () => {
    expect(resolveAppTheme('dark')).toBe(darkTheme);
  });

  it('uses the light theme as the default', () => {
    expect(resolveAppTheme(null)).toBe(lightTheme);
  });
});

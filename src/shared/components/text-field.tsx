import { useState, type ComponentProps } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { useAppTheme } from '@/shared/theme';

import { AppText } from './app-text';

type NativeTextInputProps = ComponentProps<typeof TextInput>;

export type TextFieldProps = NativeTextInputProps & {
  error?: string;
  label: string;
};

export function TextField({
  error,
  label,
  onBlur,
  onFocus,
  style,
  ...props
}: TextFieldProps) {
  const theme = useAppTheme();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={{ gap: theme.spacing.xs }}>
      <AppText variant="label">{label}</AppText>
      <TextInput
        {...props}
        accessibilityLabel={props.accessibilityLabel ?? label}
        onBlur={(event) => {
          setIsFocused(false);
          onBlur?.(event);
        }}
        onFocus={(event) => {
          setIsFocused(true);
          onFocus?.(event);
        }}
        placeholderTextColor={theme.colors.placeholder}
        style={[
          styles.input,
          {
            backgroundColor: theme.colors.surface,
            borderColor: error
              ? theme.colors.danger
              : isFocused
                ? theme.colors.primary
                : theme.colors.border,
            borderRadius: theme.radius.md,
            color: theme.colors.text,
            paddingHorizontal: theme.spacing.md,
          },
          style,
        ]}
      />
      {error ? (
        <AppText color="danger" variant="caption">
          {error}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    fontSize: 16,
    minHeight: 48,
  },
});

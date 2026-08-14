import { fireEvent, render } from '@testing-library/react-native';

import { Button, EmptyState, TextField } from './index';

describe('visual foundation', () => {
  it('handles button presses', async () => {
    const onPress = jest.fn();
    const { getByRole } = await render(
      <Button label="Continuar" onPress={onPress} />,
    );

    fireEvent.press(getByRole('button'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not handle presses while a button is disabled', async () => {
    const onPress = jest.fn();
    const { getByRole } = await render(
      <Button disabled label="Continuar" onPress={onPress} />,
    );

    fireEvent.press(getByRole('button'));

    expect(onPress).not.toHaveBeenCalled();
  });

  it('renders empty-state and field feedback', async () => {
    const { getByText } = await render(
      <>
        <EmptyState description="Nada por aqui." title="Sem dados" />
        <TextField error="Campo obrigatório" label="Nome" />
      </>,
    );

    expect(getByText('Sem dados')).toBeTruthy();
    expect(getByText('Nada por aqui.')).toBeTruthy();
    expect(getByText('Campo obrigatório')).toBeTruthy();
  });
});

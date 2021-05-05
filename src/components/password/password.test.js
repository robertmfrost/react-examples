import { render, screen, fireEvent } from '@testing-library/react';
import Password from './';
import { changed, match, requirements } from './passwordRequirements.json';

test('matches snapshot', () => {
  const { asFragment } = render(<Password />);
  expect(asFragment()).toMatchSnapshot();
});

test('form submit produces just min-character error when only that check fails', () => {
  render(<Password />);
  screen.getByTestId('password-new-input').value = 'Wrd1!';
  screen.getByTestId('password-retype-input').value = 'Wrd1!';
  fireEvent.submit(screen.getByTestId('password-form'));
  requirements.filter(r => r.rule !== '.{6,}').forEach(r => {
    expect(screen.queryByText(r.message)).toBeNull();
  });
  expect(screen.getByText(requirements.find(r => r.rule === '.{6,}').message)).toBeInTheDocument();
});

test('form submit produces just uppercase error when only that check fails', () => {
  render(<Password />);
  screen.getByTestId('password-new-input').value = 'password1!';
  screen.getByTestId('password-retype-input').value = 'password1!';
  fireEvent.submit(screen.getByTestId('password-form'));
  requirements.filter(r => r.rule !== '[A-Z]').forEach(r => {
    expect(screen.queryByText(r.message)).toBeNull();
  });
  expect(screen.getByText(requirements.find(r => r.rule === '[A-Z]').message)).toBeInTheDocument();
});

test('form submit produces just lowercase error when only that check fails', () => {
  render(<Password />);
  screen.getByTestId('password-new-input').value = 'PASSWORD1!';
  screen.getByTestId('password-retype-input').value = 'PASSWORD1!';
  fireEvent.submit(screen.getByTestId('password-form'));
  requirements.filter(r => r.rule !== '[a-z]').forEach(r => {
    expect(screen.queryByText(r.message)).toBeNull();
  });
  expect(screen.getByText(requirements.find(r => r.rule === '[a-z]').message)).toBeInTheDocument();
});

test('form submit produces just number error when only that check fails', () => {
  render(<Password />);
  screen.getByTestId('password-new-input').value = 'Password!';
  screen.getByTestId('password-retype-input').value = 'Password!';
  fireEvent.submit(screen.getByTestId('password-form'));
  requirements.filter(r => r.rule !== '[0-9]').forEach(r => {
    expect(screen.queryByText(r.message)).toBeNull();
  });
  expect(screen.getByText(requirements.find(r => r.rule === '[0-9]').message)).toBeInTheDocument();
});

test('form submit produces just special character error when only that check fails', () => {
  render(<Password />);
  screen.getByTestId('password-new-input').value = 'Password1';
  screen.getByTestId('password-retype-input').value = 'Password1';
  fireEvent.submit(screen.getByTestId('password-form'));
  requirements.filter(r => r.rule !== '[!@#$%^&*()_\\-+={[}\\]|:;\"\'<,>.]').forEach(r => {
    expect(screen.queryByText(r.message)).toBeNull();
  });
  expect(screen.getByText(requirements.find(r => r.rule === '[!@#$%^&*()_\\-+={[}\\]|:;\"\'<,>.]').message)).toBeInTheDocument();
});

test('form submit produces all errors when no checks pass', () => {
  render(<Password />);
  screen.getByTestId('password-new-input').value = ' ';
  screen.getByTestId('password-retype-input').value = '';
  fireEvent.submit(screen.getByTestId('password-form'));
  requirements.forEach(r => {
    expect(screen.getByText(r.message)).toBeInTheDocument();
  });
  expect(screen.getByText(match)).toBeInTheDocument();
});

test('form submit produces success message when all checks pass', () => {
  render(<Password />);
  screen.getByTestId('password-new-input').value = 'Password1!';
  screen.getByTestId('password-retype-input').value = 'Password1!';
  fireEvent.submit(screen.getByTestId('password-form'));
  expect(screen.getByText(changed)).toBeInTheDocument();
});

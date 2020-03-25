import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders Search Books text', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Search Books/);
  expect(linkElement).toBeInTheDocument();
});

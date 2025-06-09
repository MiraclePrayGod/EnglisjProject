import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Word Hero title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Word Hero/i);
  expect(titleElement).toBeInTheDocument();
});

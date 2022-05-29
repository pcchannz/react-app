import { render, screen, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders without crashing', async () => {
  render(<MemoryRouter><App /></MemoryRouter>);
  await act(async() => await new Promise(resolve => setTimeout(resolve, 1000)));
});

test('renders app home page', () => {
  render(<MemoryRouter><App /></MemoryRouter>);
  const linkElement = screen.getByText(/Demo/i);
  expect(linkElement).toBeInTheDocument();
})

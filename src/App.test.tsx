import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

test('data standby', async () => {
  render(<App />);
  const div = screen.getByLabelText('data');
  await waitFor(() => expect(div?.getAttribute('class')).toEqual('App standby'));
});

test('data sucess', async () => {
  render(<App />);
  const div = screen.getByLabelText('data');
  await waitFor(() => expect(div?.getAttribute('class')).toEqual('App sucess'));
});

test('data fail', async () => {
  render(<App />);
  const div = screen.getByLabelText('data');
  await waitFor(() => expect(div?.getAttribute('class')).toEqual('App fail'));
});
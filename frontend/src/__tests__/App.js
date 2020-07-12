import React from 'react';
import { render } from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom'
import {UserContextProvider} from '../contexts/userContext'
import App from '../App';

test('renders site sub-heading', () => {
  const { getByText } = render(
  <Router>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </Router>);
  const subHeading = getByText(/The most comprehensive listing of Canadian solid wood and pulp manufacturers/i);
  expect(subHeading).toBeInTheDocument();
});
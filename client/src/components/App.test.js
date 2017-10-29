import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


jest.mock('scroll-to-element', () => 'scroll-to-element');


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);

});

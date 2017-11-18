import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './App';

jest.mock('scroll-to-element', () => 'scroll-to-element');

it('renders without crashing', () => {
  shallow(<App />);
});

it('renders site heading', () => {
  const wrapper = mount(<App />);
  const heading = <h2 className="heading-brand">Madison's Lumber Directory</h2>;
  expect(wrapper).toContainReact(heading);
});
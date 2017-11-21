import React from 'react';
import { shallow, mount } from 'enzyme';
import AlertMessages from '../components/shared/AlertMessages';
import renderer from 'react-test-renderer';


const successMsg = ['Success', 'This works...']
const errorMsg = ['Error!', 'This displays something bad...']
const infoMsg = ['Info', 'This is a true fact...']

it('renders without crashing', () => {
  shallow(<AlertMessages />);
});

it('returns null when no props are passed', () => {
  const component = renderer.create(<AlertMessages />);
  let tree = component.toJSON();
  expect(tree).toBeNull();
});

it('renders success message correctly', () => {
  const component = renderer.create(
    <AlertMessages success={successMsg} />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders error message correctly', () => {
  const component = renderer.create(
    <AlertMessages error={errorMsg} />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders info message correctly', () => {
  const component = renderer.create(
    <AlertMessages info={infoMsg} />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders mixed type message correctly', () => {
  const component = renderer.create(
    <AlertMessages
      success={successMsg}
      error={errorMsg}
      info={infoMsg} />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
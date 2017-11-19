import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import 'bootstrap/dist/css/bootstrap.css';


import AlertMessages from '../components/shared/AlertMessages.js'

import { Button, Welcome } from '@storybook/react/demo';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>);

storiesOf('AlertMessages', module)
  .add('with success', () => <AlertMessages success={['Success!', 'Yay it looks like it works...']} />)
  .add('with error', () => <AlertMessages errors={['Error!', 'Aww that sucks...']} />)
  .add('with info', () => <AlertMessages info={['Info!', 'This fact is very interesting. True fact.']} />)
  .add('with nothing', () => <AlertMessages />)
  .add('with mixed content', () => <AlertMessages success={['Success!', 'I can handle various message types']}
                                                  info={['Info!', 'The previous story did not leave a trace on the DOM. True fact.']}/>);
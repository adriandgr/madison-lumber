import { configure } from 'enzyme';
import 'jest-enzyme';
import Adapter from 'enzyme-adapter-react-16';

jest.mock('scroll-to-element', () => 'scroll-to-element');

configure({ adapter: new Adapter() });

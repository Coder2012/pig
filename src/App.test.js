import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const setup =(props={}, state=null) => {
  const wrapper = shallow(<App {...props} />);
  if (state ) wrapper.setState(state)
  return wrapper;
}

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('Current score starts at 0', () => {
  const wrapper = setup();
  const currentScore = wrapper.state('currentScore');
  expect(currentScore).toBe(0);
});

it('CurrentScore should be added to player score on pass', () => {
  const wrapper = setup();
  const player = wrapper.state().players[0];
  const initialPlayerScore = 10;//player.score;
  console.log('player score', player.score);
  
  wrapper.find('[data-test="test-roll-button"]').simulate('click');
  const currentScore = wrapper.state('currentScore');

  wrapper.find('[data-test="test-pass-button"]').simulate('click');
  
  expect(initialPlayerScore + currentScore).toBe(wrapper.state().players[0].score);
});

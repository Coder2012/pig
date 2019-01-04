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

it('Should swap player index after pass button clicked', () => {
  const wrapper = setup();
  const player1Id = wrapper.state().players[0].id;
  const player2Id = wrapper.state().players[1].id;
  
  wrapper.find('[data-test="test-pass-button"]').simulate('click');

  const currentPlayerId = wrapper.state().turn;

  expect(currentPlayerId).toBe(player2Id);
});

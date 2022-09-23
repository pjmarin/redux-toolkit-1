import { createStore } from 'redux';

const defaultState = {
  originalAmount: 0
};

function amount(state, action) {
  state = state || defaultState;
  if(action.type === 'INCREMENT ORIGIN AMOUNT') {
    return {...state, originalAmount: state.originalAmount + action.data};
  } else if(action.type === 'DECREMENT ORIGIN AMOUNT') {
    return {...state, originalAmount: state.originalAmount - action.data};
  }

  return state;
}

const store = createStore(amount);

export default store;
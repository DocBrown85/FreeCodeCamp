// define ADD, addMessage(), messageReducer(), and store here:
const ADD = 'ADD';

const addMessage = (message) => {
  return {type: ADD, message: message};
};

const messageReducer = (state, action) => {
  switch(action.type) {
    case ADD:
      return [...state, action.message];
    default:
      return state;
  }
};

const defaultState = [];
let store = Redux.createStore(messageReducer, defaultState);

//store.dispatch(addMessage());

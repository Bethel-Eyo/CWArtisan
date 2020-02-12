import React from 'react';
import AppNavigator from './app/navigation/AppNavigator';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

const initialState = {
  action: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'OPEN_JOB_HIST':
      return {...state, action: 'openJobHist'};
    default:
      return state;
  }
};

const store = createStore(reducer);

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;

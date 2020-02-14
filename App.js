import React from 'react';
import AppNavigator from './app/navigation/AppNavigator';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

const initialState = {
  action: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'HOME_MODE':
      return {...state, action: 'homeMode'};
    case 'OPEN_JOB_HIST':
      return {...state, action: 'openJobHist'};
    case 'OPEN_JOB_TRACKER':
      return {...state, action: 'openJobTracker'};
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

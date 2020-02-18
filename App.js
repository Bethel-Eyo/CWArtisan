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
    case 'HOME_JOB_TRACKER':
      return {...state, action: 'homeJobTracker'};
    case 'OPEN_WALLET':
      return {...state, action: 'openWallet'};
    case 'CONFIRM_ARRIVAL':
      return {...state, action: 'confirmArrival'};
    case 'UNDO_CONFIRM_ARRIVAL':
      return {...state, action: 'undoConfirmArrival'};
    case 'ACTIVATE_CONFIRM_DIAGNOSIS':
      return {...state, action: 'activateConfirmDiagnosis'};
    case 'CONFIRM_DIAGNOSIS':
      return {...state, action: 'confirmDiagnosis'};
    case 'UNDO_CONFIRM_DIAGNOSIS':
      return {...state, action: 'undoConfirmDiagnosis'};
    case 'ACTIVATE_CONFIRM_JOB_DONE':
      return {...state, action: 'activateConfirmJobDone'};
    case 'CONFIRM_JOB_DONE':
      return {...state, action: 'confirmJobDone'};
    case 'UNDO_CONFIRM_JOB_DONE':
      return {...state, action: 'undoConfirmJobDone'};
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

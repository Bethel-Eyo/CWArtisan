import React from 'react';
import AppNavigator from './app/navigation/AppNavigator';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import styled from 'styled-components';

const initialState = {
  action: '',
};

const reducer = (state = initialState, action) => {};

const store = createStore(reducer);

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;

// const Text = styled.Text``;

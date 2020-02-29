import React from 'react';
import {StyleSheet, StatusBar} from 'react-native';

import DrawerNavigator from './navigation/DrawerNavigator';
import {enableScreens} from 'react-native-screens';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {Provider} from 'react-redux';
import taskReducers from './store/reducers/TaskReducer';
import ReduxThunk from 'redux-thunk';
import {combineReducers, createStore, applyMiddleware} from 'redux';

enableScreens();
const App = () => {
  const roottReducer = combineReducers({
    tasks: taskReducers,
  });
  const store = createStore(roottReducer, applyMiddleware(ReduxThunk));
  return (
    <>
      <StatusBar backgroundColor="#7047a3" />
      <Provider store={store}>
        <SafeAreaProvider>
          <NavigationContainer>
            <DrawerNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </Provider>
    </>
  );
};

export default App;

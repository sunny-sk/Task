import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import Colors from './constants/Color';
import DrawerNavigator from './navigation/DrawerNavigator';
import {enableScreens} from 'react-native-screens';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import taskReducers from './store/reducers/TaskReducer';
import authReducers from './store/reducers/AuthReducers';
import {combineReducers, createStore, applyMiddleware} from 'redux';

enableScreens();
const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  const rootReducer = combineReducers({
    tasks: taskReducers,
    auth: authReducers,
  });
  const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
  console.log('in app.js');
  return (
    <>
      <StatusBar backgroundColor={Colors.primary} />
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

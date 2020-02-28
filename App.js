import React from 'react';
import {StyleSheet, StatusBar} from 'react-native';

import DrawerNavigator from './navigation/DrawerNavigator';
import {enableScreens} from 'react-native-screens';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

enableScreens();
const App = () => {
  return (
    <>
      <StatusBar backgroundColor="#7047a3" />
      <SafeAreaProvider>
        <NavigationContainer>
          <DrawerNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </>
  );
};

export default App;

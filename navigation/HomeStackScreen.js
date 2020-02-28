import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Text} from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import CreateTaskScreen from '../screens/CreateTaskScreen';
import Entypo from 'react-native-vector-icons/Entypo';

const HomeStack = createStackNavigator();

export function HomeStackScreens() {
  return (
    <HomeStack.Navigator keyboardHandlingEnabled={false}>
      <HomeStack.Screen
        name="Home" //use to navigate routeName
        component={HomeScreen}
        options={{
          title: 'Tasks', //change title and higher periority then the name
          headerStyle: {
            backgroundColor: '#7047a3',
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center', // make header title on center,
          headerTitleStyle: {
            // fontWeight: 'bold',
          },
        }}
      />

      <HomeStack.Screen
        name="CreateTask"
        component={CreateTaskScreen}
        options={{
          headerTitle: props => (
            <Text>
              <Entypo name="edit" />
            </Text>
          ),
        }}
      />
    </HomeStack.Navigator>
  );
}

export default HomeStackScreens;

import React from 'react';
import {Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import CreateTaskScreen from '../screens/CreateTaskScreen';
import ProfileScreen from '../screens/ProfileScreen';

import Entypo from 'react-native-vector-icons/Entypo';

const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();

export function HomeStackScreens() {
  return (
    <HomeStack.Navigator
      headerMode="screen"
      mode="modal"
      options={{}}
      keyboardHandlingEnabled={false}>
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
          headerStyle: {
            backgroundColor: '#7047a3',
          },
          // headerTitle: props => (
          //   <Text>
          //     <Entypo name="edit" />
          //   </Text>
          // ),
          title: 'Create Task',
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
        }}
      />
    </HomeStack.Navigator>
  );
}

export function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator keyboardHandlingEnabled={false}>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTitle: ({tintColor}) => (
            <Text>
              <Entypo name="user" color={tintColor} size={23} />
            </Text>
          ),

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
    </ProfileStack.Navigator>
  );
}

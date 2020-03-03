import React, {useState} from 'react';
import {View, Text, Image} from 'react-native';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import FormScreen from '../screens/FormScrren';

import {HomeStackScreens, ProfileStackScreen} from './StackScreen';

import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{height: 120, width: '100%'}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            style={{height: 80, width: 80}}
            source={require('../assets/images/logoOriginalTransparent.png')}
          />
        </View>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

function DrawerNavigator(props) {
  return (
    <>
      <Drawer.Navigator
        drawerContent={props => CustomDrawerContent(props)}
        initialRouteName="Home"
        drawerType="slide"
        drawerStyle={{
          backgroundColor: '#fff', //drawer background color
        }}
        drawerContentOptions={{
          activeTintColor: '#7047a3',
          // activeBackgroundColor: '#000',
          inactiveTintColor: '#000',
          inactiveBackgroundColor: '#fff',
          labelStyle: {
            //text style for drawer
            fontSize: 15,
          },
        }}>
        {/* <Drawer.Screen
          // name="From" // routing name
          component={FormScreen} //screen name
          options={{
            title: 'Form',
            drawerIcon: props => {
              return (
                <Text>
                  <Entypo
                    name="Form"
                    size={23}
                    color={props.focused ? '#7047a3' : 'black'}
                  />
                </Text>
              );
            },
          }}
        /> */}
        <Drawer.Screen
          name="Home" // routing name
          component={HomeStackScreens} //screen name
          options={{
            title: 'Home',
            drawerIcon: props => {
              return (
                <Text>
                  <Entypo
                    name="home"
                    size={23}
                    color={props.focused ? '#7047a3' : 'black'}
                  />
                </Text>
              );
            },
          }}
        />
        <Drawer.Screen
          name="Profile" // routing name
          component={ProfileStackScreen} //screen name
          options={{
            title: 'Profile',
            drawerIcon: props => {
              return (
                <Text>
                  <AntDesign
                    name="user"
                    size={23}
                    color={props.focused ? '#7047a3' : 'black'}
                  />
                </Text>
              );
            },
          }}
        />
      </Drawer.Navigator>
    </>
  );
}

export default DrawerNavigator;

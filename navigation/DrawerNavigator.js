import React, {useState} from 'react';
import {View, Image} from 'react-native';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import HomeStackScreens from './HomeStackScreen';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{height: 120, width: '100%'}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            style={{height: 80, width: 80}}
            source={require('../asset/images/logoOriginalTransparent.png')}
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
        drawerType="front" // back|| front||slide
        hideStatusBar={false}
        // drawerPosition=''
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
        <Drawer.Screen
          name="Home" // routing name
          component={HomeStackScreens} //screen name
          options={{
            title: 'Home',
            drawerIcon: props => {
              return (
                <Entypo
                  name="home"
                  size={23}
                  color={props.focused ? '#7047a3' : 'black'}
                />
              );
            },
          }}
        />
      </Drawer.Navigator>
    </>
  );
}

export default DrawerNavigator;

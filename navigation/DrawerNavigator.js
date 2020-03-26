import React, {useState, useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import Colors from '../constants/Color';
import SplashScreen from 'react-native-splash-screen';

import AuthScreen from '../screens/AuthScreen';
import FormScreen from '../screens/FormScrren';
import {HomeStackScreens, ProfileStackScreen} from './StackScreen';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {useSelector, useDispatch} from 'react-redux';
import {authenticate} from '../store/action/AuthActions';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(data) {
  return (
    <DrawerContentScrollView {...data.props}>
      <View style={{height: 130, width: '100%'}}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            marginTop: 10,
            alignItems: 'center',
          }}>
          <Image
            style={{height: 80, width: 80}}
            source={require('../assets/images/icon.png')}
          />
          <Text style={{marginTop: 10}}>{data.auth.email}</Text>
        </View>
      </View>
      <DrawerItemList {...data.props} />
    </DrawerContentScrollView>
  );
}

function DrawerNavigator(props) {
  const dispatch = useDispatch();
  const [auth, setAuth] = useState({});
  const authData = useSelector(state => {
    return state.auth;
  });
  useEffect(() => {
    setAuth({...authData});
  }, [authData]);

  useEffect(() => {
    const tryLogin = async () => {
      let userData = await AsyncStorage.getItem('userData');
      if (!userData) {
        console.log('not loggedIn');
        return;
      } else {
        userData = JSON.parse(userData);

        const expirationDate = new Date(userData.expirationDate);
        if (
          expirationDate <= new Date() ||
          !userData.token ||
          !userData.userId
        ) {
          console.log('prev invalid logged In');
          return;
        }
        console.log('looged in');

        dispatch(authenticate(userData));
      }
    };
    tryLogin();
  }, [dispatch]);

  return (
    <>
      <Drawer.Navigator
        drawerContent={props => CustomDrawerContent({props, auth})}
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
        {!auth.email ? (
          <Drawer.Screen
            name="Auth" // routing name
            component={AuthScreen} //screen name
            options={{
              title: 'Auth',
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
        ) : null}
      </Drawer.Navigator>
    </>
  );
}

export default DrawerNavigator;

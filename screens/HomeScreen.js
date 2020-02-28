import React, {useState} from 'react';

import {TouchableOpacity, View, Text, Switch, Button} from 'react-native';
import {CheckBox, Divider} from 'react-native-elements';

import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

const HomeScreen = props => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'no park',
      task: 'do not go park',
      icCompleted: false,
      type: 'normal',
      date: '28/02/2020',
    },
    {
      id: 2,
      title: 'finish office work',
      task: 'all api should be integrate',
      icCompleted: false,
      type: 'normal',
      date: '28/02/2020',
    },
  ]);
  props.navigation.setOptions({
    headerLeft: () => {
      return (
        <TouchableOpacity
          onPress={() => {
            props.navigation.toggleDrawer();
          }}
          style={{marginLeft: 10}}>
          <Entypo name="menu" size={35} color={'white'} />
        </TouchableOpacity>
      );
    },

    headerRight: () => {
      return (
        <TouchableOpacity
          onPress={() => {
            props.navigation.toggleDrawer();
          }}
          style={{marginRight: 10}}>
          <AntDesign name="notification" size={25} color={'white'} />
        </TouchableOpacity>
      );
    },
  });
  return (
    <>
      <View style={{padding: 10}}>
        <View style={{backgroundColor: 'white'}}>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                padding: 10,
                width: '80%',
                justifyContent: 'center',
              }}>
              <Text style={{textAlign: 'center'}}>
                this is my data of task 1
              </Text>
            </View>
            <View style={{width: '20%'}}>
              <CheckBox
                style={{backgroundColor: 'white'}}
                center
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checked={true}
                checkedColor={'green'}
              />
            </View>
          </View>
          <View
            style={{
              width: '100%',
              backgroundColor: 'green',
              height: 1.5,
            }}></View>
        </View>
        <Divider style={{backgroundColor: 'black'}} />
      </View>
    </>
  );
};

export default HomeScreen;

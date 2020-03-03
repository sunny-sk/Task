import React, {useState, useEffect} from 'react';

import {
  TouchableOpacity,
  ScrollView,
  View,
  Text,
  Switch,
  Button,
} from 'react-native';
import {CheckBox, Divider} from 'react-native-elements';

import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../constants/Color';

import {useSelector, useDispatch} from 'react-redux';
import {completeTask} from '../store/action/TaskActions';

const HomeScreen = props => {
  const [tasks, setTasks] = useState([]);
  const [completedTask, setCompletedTask] = useState([]);
  const availableData = useSelector(state => {
    return state.tasks;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    setTasks([...availableData.tasks]);
  }, [availableData]);

  const onCompleteTask = id => {
    dispatch(completeTask(id));
  };

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
      <View style={{padding: 10, height: '100%'}}>
        {/* remaining tasks */}
        <View style={{}}>
          <ScrollView>
            {tasks.map((task, index) => (
              <View style={{flexDirection: 'row'}} key={task.id}>
                <View
                  style={{
                    padding: 10,
                    width: '80%',
                    justifyContent: 'center',
                  }}>
                  <Text style={{textAlign: 'center'}}>{task.task}</Text>
                </View>
                <View style={{width: '20%'}}>
                  <CheckBox
                    onPress={() => {
                      onCompleteTask(index);
                    }}
                    style={{backgroundColor: 'white'}}
                    center
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checked={task.isCompleted}
                    checkedColor={'green'}
                  />
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
        {/* <Divider style={{backgroundColor: 'black'}} /> */}

        {/* create Task  */}
        <View
          style={{
            backgroundColor: Colors.main,
            height: 50,
            width: 50,
            borderRadius: 50,
            position: 'absolute',
            bottom: 40,
            right: '10%',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('CreateTask');
            }}>
            <Text
              style={{
                textAlign: 'center',
              }}>
              <AntDesign name="plus" size={30} color="#fff" />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default HomeScreen;

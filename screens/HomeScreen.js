import React, {useState, useEffect, useCallback} from 'react';

import {
  TouchableOpacity,
  ScrollView,
  View,
  Text,
  TouchableNativeFeedback,
  ActivityIndicator,
  Alert,
  StyleSheet,
  StatusBar,
  Modal,
  TouchableHighlight,
} from 'react-native';
import {CheckBox, Divider} from 'react-native-elements';

import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../constants/Color';
import customSnackBar from '../components/snackbar';
import {useSelector, useDispatch} from 'react-redux';

import {
  completeTask,
  deleteTask,
  addTask,
  getTasks,
} from '../store/action/TaskActions';

const HomeScreen = props => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [prevTaskFetchLoading, setPrevTaskFetchLoading] = useState(false);
  const availableData = useSelector(state => {
    return state.tasks;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      // Screen was focused
      console.log('Home screen screen focused');
      // load tasks
      loadTasks();
    });

    return unsubscribe;
  }, [loadTasks]);

  useEffect(() => {
    console.log('load');
    setTasks([...availableData.tasks]);
  }, [availableData]);

  //@desc load task
  const loadTasks = async () => {
    console.log('task Loading');
    try {
      setPrevTaskFetchLoading(true);
      await dispatch(getTasks());
      setPrevTaskFetchLoading(false);
    } catch (error) {
      setPrevTaskFetchLoading(false);
      customSnackBar.errorBar(loadTasks, error);
    }
  };

  //@desc complete task
  const onCompleteTask = async task => {
    console.log('on task complete');
    try {
      setIsLoading(true);
      await dispatch(completeTask(task));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  //@desc navigate to create task screen
  const onCreateTask = () => {
    const {navigation} = props;
    navigation.navigate('CreateTask');
  };

  //@ undo deleted task
  const undoDeletedTask = async task => {
    try {
      setIsLoading(true);
      await dispatch(addTask(task));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
      Snackbar.show({
        text: error.message,
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: Colors.cancel,
        action: {
          text: 'try again',
          textColor: '#fff',
          onPress: () => {},
        },
      });
    }
  };

  //@desc delete task
  const onDeleteTask = async task => {
    try {
      setIsLoading(true);
      await dispatch(deleteTask(task));
      setIsLoading(false);
      customSnackBar.undoBar(undoDeletedTask, task);
    } catch (error) {
      setIsLoading(false);
    }
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
      return isLoading ? (
        <TouchableOpacity style={{marginRight: 15}}>
          <ActivityIndicator size="small" color="#fff" />
        </TouchableOpacity>
      ) : null;
      // return !isLoading ? (
      //   <TouchableOpacity
      //     style={{marginRight: 20}}
      //     onPress={() => {
      //       setShowModal(true);
      //     }}>
      //     <Ionicons name="ios-options" size={25} color={'white'} />
      //   </TouchableOpacity>
      // ) : (
      //   <TouchableOpacity style={{marginRight: 15}}>
      //     <ActivityIndicator size="small" color="#fff" />
      //   </TouchableOpacity>
      // );
    },
  });

  return (
    <>
      <View style={{padding: 10, height: '100%'}}>
        {/* remaining tasks */}
        {prevTaskFetchLoading ? (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator size="large" color={Colors.primary} />
          </View>
        ) : (
          <View>
            {tasks.length <= 0 ? (
              <Text
                style={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 18,
                  marginTop: '20%',
                }}>
                No Task found
              </Text>
            ) : (
              <View style={{height: '95%'}}>
                <ScrollView>
                  {tasks.map((task, index) => {
                    return (
                      <View
                        style={{
                          flexDirection: 'row',
                          borderWidth: 1,
                          borderColor: '#c6c6c6',
                          borderRadius: 3,
                          marginBottom: 5,
                        }}
                        key={index}>
                        <View
                          style={{
                            padding: 10,
                            width: '70%',
                            justifyContent: 'center',
                          }}>
                          <Text style={{textAlign: 'center'}}>
                            {task.title}
                          </Text>
                        </View>
                        <View style={{justifyContent: 'center'}}>
                          <TouchableOpacity
                            onPress={() => {
                              Alert.alert('', 'are you sure', [
                                {
                                  text: 'Cancel',
                                  onPress: () => console.log('Cancel Pressed'),
                                  style: 'cancel',
                                },
                                {
                                  text: 'OK',
                                  onPress: () => {
                                    onDeleteTask(task);
                                  },
                                },
                              ]);
                            }}>
                            <MaterialCommunityIcons
                              name="delete-sweep-outline"
                              size={25}
                              color="#C50707"
                            />
                          </TouchableOpacity>
                        </View>
                        <View style={{width: '20%'}}>
                          <CheckBox
                            onPress={() => {
                              onCompleteTask(task);
                            }}
                            style={{backgroundColor: 'white'}}
                            center
                            checkedIcon="dot-circle-o"
                            uncheckedIcon="circle-o"
                            checked={task.isCompleted}
                            checkedColor={'green'}
                            uncheckedColor={Colors.cancel}
                          />
                        </View>
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
            )}
          </View>
        )}
        {/* <Divider style={{backgroundColor: 'black'}} /> */}

        {/* create Task button  */}

        <View
          style={{
            overflow: 'hidden',
            position: 'absolute',
            bottom: 20,
            right: '10%',
            borderRadius: 50,
          }}>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple('#000000', false)}
            onPress={onCreateTask}>
            <View
              style={{
                backgroundColor: Colors.primary,
                borderRadius: 50,
                padding: 10,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                }}>
                <AntDesign name="plus" size={30} color="#fff" />
              </Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;

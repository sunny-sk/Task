import React, {useState, useEffect} from 'react';

import {
  TouchableOpacity,
  ScrollView,
  View,
  Text,
  TouchableNativeFeedback,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {CheckBox, Divider} from 'react-native-elements';

import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../constants/Color';
import Snackbar from 'react-native-snackbar';

import {useSelector, useDispatch} from 'react-redux';
import {completeTask, deleteTask, getTasks} from '../store/action/TaskActions';

const HomeScreen = props => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [prevTaskFetchLoading, setPrevTaskFetchLoading] = useState(false);
  const availableData = useSelector(state => {
    return state.tasks;
  });

  const dispatch = useDispatch();
  useEffect(() => {
    setTasks([...availableData.tasks]);
  }, [availableData]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        setPrevTaskFetchLoading(true);
        await dispatch(getTasks());
        setPrevTaskFetchLoading(false);
      } catch (error) {
        setPrevTaskFetchLoading(false);
        Snackbar.show({
          text: error.message,
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: Colors.cancel,
          action: {
            text: 'try again',
            textColor: '#fff',
            onPress: () => {
              /* Do something. */
            },
          },
        });
      }
    };
    loadTasks();
  }, [dispatch]);

  //@desc complete task
  const onCompleteTask = id => {
    setIsLoading(true);
    setTimeout(() => {
      dispatch(completeTask(id));
      setIsLoading(false);
    }, 1000);
  };

  //@desc navigate to create task screen
  const onCreateTask = () => {
    const {navigation} = props;
    navigation.navigate('CreateTask');
  };

  //@desc delete task
  const onDeleteTask = task => {
    setIsLoading(true);
    setTimeout(() => {
      dispatch(deleteTask(task.id));
      setIsLoading(false);
    }, 2000);
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
      return !isLoading ? (
        <TouchableOpacity
          onPress={() => {
            props.navigation.toggleDrawer();
          }}
          style={{marginRight: 10}}>
          <AntDesign name="notification" size={25} color={'white'} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={{marginRight: 15}}>
          <ActivityIndicator size="small" color="#fff" />
        </TouchableOpacity>
      );
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
                  marginTop: '20%',
                }}>
                No Task found
              </Text>
            ) : (
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
                        <Text style={{textAlign: 'center'}}>{task.title}</Text>
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
                            onCompleteTask(index);
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
            )}
          </View>
        )}
        {/* <Divider style={{backgroundColor: 'black'}} /> */}

        {/* create Task button  */}

        <View
          style={{
            overflow: 'hidden',
            position: 'absolute',
            bottom: 40,
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

export default HomeScreen;

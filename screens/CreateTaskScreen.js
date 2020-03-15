import * as React from 'react';
import {
  Button,
  TextInput,
  View,
  ActivityIndicator,
  Text,
  Alert,
  Keyboard,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
} from 'react-native';
import Colors from '../constants/Color';

import {useSelector, useDispatch} from 'react-redux';
import {addTask} from '../store/action/TaskActions';

import Buttons from '../components/button';

function CreateTask(props) {
  const [title, setTitle] = React.useState('');
  const [data, setData] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const dispatch = useDispatch();

  const onAddTask = () => {
    if (title === '' && data === '') {
      Alert.alert('Warning', 'Please fill all fields');
      return;
    }
    Keyboard.dismiss();
    console.log('onAdd post clicked');
    setIsLoading(true);
    setTimeout(() => {
      dispatch(addTask({title: title}));
      setIsLoading(false);
      props.navigation.goBack();
    });
  };

  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <View
          style={{
            marginTop: 10,
            height: '100%',
            backgroundColor: '#fff',
          }}>
          <View
            style={{
              width: '90%',
              marginLeft: '5%',
            }}>
            <TextInput
              placeholder="Title"
              style={{
                marginTop: 30,
                borderBottomWidth: 1,
                borderBottomColor: '#c6c6c6',
              }}
              value={title}
              onChangeText={setTitle}
            />
          </View>

          <View style={{marginVertical: 10}}>
            {isLoading ? (
              <ActivityIndicator size="small" color={Colors.primary} />
            ) : null}
          </View>
          {!isLoading ? (
            <View style={{width: '60%', marginLeft: '20%'}}>
              <Buttons
                click={() => {
                  onAddTask();
                }}
                style={{
                  color: 'white',
                  backgroundColor: Colors.Dazzy.primary,
                  paddingHorizontal: 6,
                  paddingVertical: 8,
                }}
                ripple="#fff"
                {...props}>
                ADD
              </Buttons>
            </View>
          ) : null}
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}

export default CreateTask;

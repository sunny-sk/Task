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
import Snackbar from 'react-native-snackbar';

import Buttons from '../components/button';

function CreateTask(props) {
  const [title, setTitle] = React.useState('');
  const [data, setData] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const dispatch = useDispatch();

  const onAddTask = async () => {
    try {
      if (title === '' && data === '') {
        Alert.alert('Warning', 'Please fill all fields');
        return;
      }
      Keyboard.dismiss();
      setIsLoading(true);
      await dispatch(addTask({title: title}));
      setIsLoading(false);
      props.navigation.goBack();
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

          <View style={{marginTop: 30}}>
            {isLoading ? (
              <View style={{marginVertical: 10}}>
                <ActivityIndicator size="small" color={Colors.primary} />
              </View>
            ) : (
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
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}

export default CreateTask;

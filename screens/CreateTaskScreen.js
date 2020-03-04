import * as React from 'react';
import {
  Button,
  TextInput,
  View,
  ActivityIndicator,
  Text,
  Alert,
} from 'react-native';
import Colors from '../constants/Color';

import {useSelector, useDispatch} from 'react-redux';
import {addTask} from '../store/action/TaskActions';

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
    console.log('onAdd post clicked');
    setIsLoading(true);
    dispatch(addTask({title: title}));
    setIsLoading(false);
    props.navigation.goBack();
  };

  return (
    <>
      <View style={{marginHorizontal: 10, backgroundColor: '#fff'}}>
        <View
          style={{
            width: '90%',
            marginLeft: '5%',
            marginTop: '20%',
          }}>
          {/* <Text style={{color: '#c6c6c6'}}>Title</Text> */}
          <TextInput
            placeholder="Title"
            style={{
              // borderWidth: 1,
              marginTop: 1,

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
        <Button title="Add Task" onPress={onAddTask} />
      </View>
    </>
  );
}

export default CreateTask;

import * as React from 'react';
import {Button, TextInput, View, ActivityIndicator, Alert} from 'react-native';
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
      <TextInput
        placeholder="title"
        style={{padding: 10, backgroundColor: 'white'}}
        value={title}
        onChangeText={setTitle}
      />

      <View style={{marginVertical: 10}}>
        {isLoading ? (
          <ActivityIndicator size="small" color={Colors.primary} />
        ) : null}
      </View>
      <Button title="Add Task" onPress={onAddTask} />
    </>
  );
}

export default CreateTask;

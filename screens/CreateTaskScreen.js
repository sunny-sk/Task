import * as React from 'react';
import {Button, TextInput, View, ActivityIndicator} from 'react-native';

import Colors from '../constants/Color';

function CreateTask(props) {
  const [title, setTitle] = React.useState('');
  const [data, setData] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <>
      <TextInput
        placeholder="title"
        style={{padding: 10, backgroundColor: 'white'}}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        placeholder="data"
        style={{padding: 10, backgroundColor: 'white'}}
        value={data}
        onChangeText={setData}
      />

      <View style={{marginVertical: 10}}>
        {isLoading ? (
          <ActivityIndicator size="small" color={Colors.primary} />
        ) : null}
      </View>
      <Button title="Add Task" onPress={() => {}} />
    </>
  );
}

export default CreateTask;

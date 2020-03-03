import React, {useReducer, useCallback} from 'react';
import {
  TextInput,
  View,
  Text,
  Button,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
const SET = 'SET';

const formReducer = (state, action) => {
  if (action.type === SET) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updateValidates = {
      ...state.inputValidity,
      [action.input]: action.isvalid,
    };
    let formIsValid = true;
    for (const key in updateValidates) {
      formIsValid = formIsValid && updateValidates[key];
    }
    return {
      inputValues: updatedValues,
      inputValidity: updateValidates,
      formIsValid: formIsValid,
    };
  }
  return state;
};

const ClockScreen = () => {
  const [formsState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      name: '',
      email: '',
      mobileno: '',
    },
    inputValidity: {
      name: false,
      email: false,
      mobileno: false,
    },
    formIsValid: false,
  });

  const submit = useCallback(() => {
    if (!formsState.formIsValid) {
      Alert.alert('warning', 'not valid');
      return;
    }
    console.log('clicked');
  }, [formsState]);

  const textChangeHandler = (identifier, text) => {
    let isvalid = false;
    if (text.trim().length > 0) {
      isvalid = true;
    }
    dispatchFormState({
      type: SET,
      value: text,
      isvalid: isvalid,
      input: identifier,
    });
  };

  return (
    <>
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
        {/* // keyboardVerticalOffset={100}> */}
        <ScrollView>
          <View
            style={{
              borderWidth: 1,
              padding: 5,
              marginVertical: 4,
              borderRadius: 10,
            }}>
            <TextInput
              keyboardType="default"
              value={formsState.inputValues.title}
              placeholder="name"
              onChangeText={textChangeHandler.bind(this, 'name')}
            />
            {!formsState.inputValidity.name && (
              <Text style={{fontSize: 12}}>Please enter a valid name</Text>
            )}
          </View>
          <View
            style={{
              borderWidth: 1,
              padding: 5,
              marginVertical: 4,
              borderRadius: 10,
            }}>
            <TextInput
              keyboardType="default"
              value={formsState.inputValues.email}
              onChangeText={textChangeHandler.bind(this, 'email')}
              placeholder="email"
            />
          </View>
          <View
            style={{
              borderWidth: 1,
              padding: 5,
              marginVertical: 4,
              borderRadius: 10,
            }}>
            <TextInput
              keyboardType="numeric"
              maxLength={10}
              value={formsState.inputValues.mobileno}
              onChangeText={textChangeHandler.bind(this, 'mobileno')}
              placeholder="mobileno"
            />
          </View>
          <View
            style={{
              borderWidth: 1,
              padding: 5,
              marginVertical: 4,
              borderRadius: 10,
            }}>
            <TextInput
              keyboardType="numeric"
              maxLength={10}
              value={formsState.inputValues.mobileno}
              onChangeText={textChangeHandler.bind(this, 'mobileno')}
              placeholder="mobileno"
            />
          </View>
          <View
            style={{
              borderWidth: 1,
              padding: 5,
              marginVertical: 4,
              borderRadius: 10,
            }}>
            <TextInput
              keyboardType="numeric"
              maxLength={10}
              value={formsState.inputValues.mobileno}
              onChangeText={textChangeHandler.bind(this, 'mobileno')}
              placeholder="mobileno"
            />
          </View>
          <View
            style={{
              borderWidth: 1,
              padding: 5,
              marginVertical: 4,
              borderRadius: 10,
            }}>
            <TextInput
              keyboardType="numeric"
              maxLength={10}
              value={formsState.inputValues.mobileno}
              onChangeText={textChangeHandler.bind(this, 'mobileno')}
              placeholder="mobileno"
            />
          </View>
          <View
            style={{
              borderWidth: 1,
              padding: 5,
              marginVertical: 4,
              borderRadius: 10,
            }}>
            <TextInput
              keyboardType="numeric"
              maxLength={10}
              value={formsState.inputValues.mobileno}
              onChangeText={textChangeHandler.bind(this, 'mobileno')}
              placeholder="mobileno"
            />
          </View>
          <Button
            title="submit"
            onPress={() => {
              submit();
            }}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default ClockScreen;

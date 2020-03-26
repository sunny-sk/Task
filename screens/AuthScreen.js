import React, {Component, useState, useEffect} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Image,
  ActivityIndicator,
  Platform,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import Colors from '../constants/Color';
import {useSelector, useDispatch} from 'react-redux';
import Buttons from '../components/button';
import {signup, login} from '../store/action/AuthActions';
import customSnackBar from '../components/snackbar';

function AuthScreen(props) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [loginLoader, setLoginLoader] = useState(false);
  const [signupLoader, setSignupLoader] = useState(false);

  const dispatch = useDispatch();

  const onLogin = async () => {
    if (email === '' || password === '') {
      Alert.alert('warning', 'please fill all filed');
      return;
    }

    try {
      setLoginLoader(true);
      setError(null);
      await dispatch(login({email, password}));
      setLoginLoader(false);
      props.navigation.navigate('Home');
    } catch (error) {
      setLoginLoader(false);
      setError(error.message);
    }
  };

  const onRegister = async () => {
    if (email === '' || password === '') {
      Alert.alert('warning', 'please fill all filed');
      return;
    }
    try {
      setSignupLoader(true);
      setError(null);
      await dispatch(signup({email, password}));
      setSignupLoader(false);
      props.navigation.navigate('Home');
    } catch (error) {
      setSignupLoader(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    if (error) {
      console.log(error);
      customSnackBar.errorBar(onRegister, error);
    }
  }, [error]);

  // useEffect(() => {
  //   Keyboard.addListener('keyboardDidShow', () => {
  //     setKeyboardShow(true);
  //     console.log('keyboad show');
  //   });
  //   Keyboard.addListener('keyboardDidHide', () => {
  //     setKeyboardShow(false);
  //     console.log('keyboad hide');
  //   });
  // }, [Keyboard]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.Os == 'ios' ? 'padding' : 'height'}
      style={{...styles.container}}>
      <View>
        <View style={styles.screen}>
          <View style={{marginVertical: '4%'}}></View>
          <Image
            style={{height: 80, width: 80}}
            source={require('../assets/images/icon.png')}
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="password (i.e alphanumeric)"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
          </View>
          {loginLoader ? (
            <View>
              <ActivityIndicator size="small" color={Colors.primary} />
            </View>
          ) : null}
          {signupLoader ? (
            <View>
              <ActivityIndicator size="small" color="#0FACF3" />
            </View>
          ) : null}

          <View style={styles.btnContainer}>
            <View style={styles.buttonContainer}>
              <Buttons
                click={() => {
                  onLogin();
                }}
                style={{
                  color: 'white',
                  backgroundColor: Colors.primary,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                }}
                {...props}>
                LOGIN
              </Buttons>
            </View>
            <View style={styles.buttonContainer}>
              <Buttons
                click={() => {
                  onRegister();
                }}
                style={{
                  color: 'white',
                  backgroundColor: '#0FACF3',
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                }}
                {...props}>
                REGISTER
              </Buttons>
            </View>
          </View>
        </View>
        <View
          style={{
            position: 'absolute',
            top: '90%',
            width: '100%',
          }}></View>
      </View>
    </KeyboardAvoidingView>
  );
}
export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screen: {
    width: '100%',
    alignItems: 'center',
    marginVertical: '30%',
  },

  buttonContainer: {
    marginVertical: 10,
    width: '40%',
    marginHorizontal: '30%',
  },
  inputContainer: {
    width: '80%',
    marginTop: '2%',
  },
  input: {
    borderBottomColor: 'gray',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 30,
    padding: 7,
    paddingLeft: 30,
  },
  btnContainer: {
    width: '100%',
  },
});

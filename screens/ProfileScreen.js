import React, {useState} from 'react';

import {
  TouchableOpacity,
  ActivityIndicator,
  View,
  Text,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';
import {CheckBox, Divider, Input, Icon} from 'react-native-elements';

import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../constants/Color';

const ProfileScreen = props => {
  const [isLoading, setIsLoading] = useState(false);

  const onSave = () => {
    setIsLoading(isLoading => !isLoading);
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
            onSave();
          }}
          style={{marginRight: 15}}>
          {isLoading ? (
            <ActivityIndicator size={'small'} color="white" />
          ) : (
            <AntDesign name="save" size={30} color={'white'} />
          )}
        </TouchableOpacity>
      );
    },
  });
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{height: '100%', backgroundColor: 'white'}}>
        <View style={{height: '30%', backgroundColor: Colors.main}}>
          <View
            style={{
              backgroundColor: '#fff',
              height: '80%',
              width: '70%',
              marginLeft: '15%',
              marginTop: '11%',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}>
            <View
              style={{
                backgroundColor: 'red',
                height: '45%',
                width: '30%',
                marginLeft: '35%',
                marginTop: '7%',
                borderRadius: 50,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  marginTop: 15,
                }}>
                <AntDesign name="user" size={35} color={'white'} />
              </Text>
            </View>
            <Text style={{textAlign: 'center', marginTop: 14}}>SUNNY</Text>
          </View>
        </View>
        {/* second part */}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});

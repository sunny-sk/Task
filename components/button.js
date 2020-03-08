import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  TouchableNativeFeedback,
  StyleSheet,
} from 'react-native';

const Buttons = props => {
  return (
    <View
      style={{
        borderRadius: 20,
        overflow: 'hidden',
        borderColor: props.style.backgroundColor,
        width: '100%',
      }}>
      <TouchableNativeFeedback
        onPress={props.click}
        background={TouchableNativeFeedback.Ripple(props.ripple, false)}
        borderRadius={10}>
        <View
          style={{
            ...styles.button,
            backgroundColor: props.style.backgroundColor
              ? props.style.backgroundColor
              : '#131200',
          }}>
          <Text style={{color: props.style.color, textAlign: 'center'}}>
            {props.children}
          </Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
});

export default Buttons;

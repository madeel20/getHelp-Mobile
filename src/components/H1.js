import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Theme from '../theme/index';
function H1({text,style}) {
  return (
    <Text style={{...styles.textStyle,...style}}>{text}</Text>
  );
}
const styles = StyleSheet.create({
  textStyle: {
    fontSize: Theme.h1FontSize,
    marginVertical: Theme.textPadding,
    color:Theme.headingColor,
  },
});

export default H1;
        
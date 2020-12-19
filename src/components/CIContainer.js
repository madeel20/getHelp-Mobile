import React from 'react';
import { StyleSheet, View } from 'react-native';
function CIContainer({children,style={}}) {
  return (
    <View style={[styles.container,style]}>
      {children}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'white'
  },
});

export default CIContainer;

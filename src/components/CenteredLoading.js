import React from 'react';
import { StyleSheet, ActivityIndicator, View } from 'react-native';
import theme from '../theme';
function CenteredLoading(props) {
  return (
    <View style={styles.conatiner}>
      <ActivityIndicator style={{marginTop:'50%'}} size={props.size} color={theme.themeColor} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height:'100%'
  },
});

export default CenteredLoading;

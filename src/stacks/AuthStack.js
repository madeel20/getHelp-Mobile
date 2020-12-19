import React from "react";
import SignUp from "../screens/auth/SignUp";
import SignIn from "../screens/auth/SignIn";
import {createStackNavigator} from '@react-navigation/stack';
const RootStack = createStackNavigator();
const AuthStack =({navigation}) => (
	<RootStack.Navigator
    screenOptions={{headerShown: false}}
    initialRouteName="SignUp">
    <RootStack.Screen name="SignIn" component={SignIn} />
	<RootStack.Screen name="SignUp" component={SignUp} />
  </RootStack.Navigator>
  );

export default AuthStack;
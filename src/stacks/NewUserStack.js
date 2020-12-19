import React, { useState } from "react";
import FirstStep from "../screens/NewUser/FirstStep";
// import SecondStep from "../screens/NewUser/SecondStep";
import ThirdStep from "../screens/NewUser/ThirdStep";
import FourthStep from "../screens/NewUser/FourthStep";
import {createStackNavigator} from '@react-navigation/stack';
const RootStack = createStackNavigator();
const NewUserStack = ({ onFinish }) => {
	const [step, setStep] = useState(0);
	const onNext = () => {
		setStep(prevState => prevState + 1);
	};
	const getCurrentStep = index => {
		switch (index) {
			case 0:
				return <FirstStep onNext={onNext} />;
			// case 1:
			// 	return <SecondStep onFinish={onFinish} onNext={onNext} />;
			case 1:
				return <ThirdStep onNext={onNext} />;
			case 2:
				return <FourthStep onFinish={onFinish} onNext={onNext} />;
			default:
				return null;
		}
	};
	return (
		<RootStack.Navigator
			screenOptions={{ headerShown: false }}>
			<RootStack.Screen name="SignIn" component={() =>  getCurrentStep(step)} />
		</RootStack.Navigator>
	);
};

export default NewUserStack;
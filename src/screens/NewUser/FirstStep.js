import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setNewUserData } from "../../Store/Actions/UsersActions";
import CIContainer from "../../components/CIContainer";
import { Text, TextInput, View } from "react-native";
import CInput from '../../components/CInput'
import Styles from "./styles";
import H1 from "../../components/H1";
import { TouchableOpacity } from "react-native-gesture-handler";
import NumericInput from 'react-native-numeric-input'
const FirstStep = ({ onNext }) => {
	const dispatch = useDispatch();
	const [fullName, setFullName] = useState("");
	const [grade, setGrade] = useState("");
	const handleSubmit = (e) => {
		if (fullName === "" || grade === "") {
			alert("Please fill all the fields.");
			return;
		}
		if ((parseInt(grade) > 12 || parseInt(grade) < 1)) { alert("Invalid Grade!"); return; }
		dispatch(setNewUserData({ fullName, grade }));
		onNext();
	};
	return (
		<CIContainer>
			<View style={Styles.innerContainer}>
				<H1 style={Styles.heading} text="Welcome" />
				<Text style={Styles.paraText}> Let's setup you account. </Text>
				<CInput
					onChangeText={text => setFullName(text)}
					value={fullName}
					placeHolder={"Full Name"}
				/>
				<Text style={Styles.paraText}>Grade</Text>
				<NumericInput iconStyle={Styles.arrowIcons} type='up-down' value={grade} onChange={value => setGrade(value)} minValue={1} maxValue={12} />
				<TouchableOpacity style={Styles.btn} onPress={handleSubmit}>
					<Text style={Styles.btnText}>
						Next
					</Text>
				</TouchableOpacity>
			</View>
		</CIContainer>
	);
};

export default FirstStep;
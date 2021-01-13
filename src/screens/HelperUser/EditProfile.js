import React, { useEffect, useState } from "react";
import { loadSubjects } from "../../Store/Actions/SubjectActions";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileDetails, } from "../../Store/Actions/UsersActions";
import CIContainer from "../../components/CIContainer";
import CenteredLoading from "../../components/CenteredLoading";
import H1 from "../../components/H1";
import CInput from "../../components/CInput";
import { TouchableOpacity } from "react-native-gesture-handler";
import Styles from "./styles";
import { Text, View } from "react-native";
import CLayout from "../../components/CLayout";
import theme from "../../theme";
const EditProfile = ({navigation}) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(loadSubjects());
	}, []);
	const stateProps = useSelector(({ User }) => {
		return {
			...User
		};
	});
	const { data, loading, updatingDetailsLoading } = stateProps;
	const [fullName, setFullName] = useState(data.fullName || "");
	const [grade, setGrade] = useState(data.grade || "");
	const handleSubmit = (e) => {
		if (fullName === "" || grade === "") {
			alert("Please fill all the fields.");
			return;
		}
		if ((parseInt(grade) > 12 || parseInt(grade) < 1) || isNaN(grade)) { alert("Invalid Grade!"); return; }
		dispatch(updateProfileDetails({ grade, fullName }, () => {
			alert("Profile Updated!");
		}));
	};
	return (
		<CLayout>
			<View style={[Styles.innerContainer,{paddingHorizontal:5}]}>
				{loading || updatingDetailsLoading ?
					<CenteredLoading size="large" />
					:
					<>
						<H1 style={Styles.heading} text="Edit Profile" />
						<CInput
							value={data?.email}
							editable={false}
							
						/>
						<CInput
							onChangeText={text => setFullName(text)}
							value={fullName}
							placeHolder={"Full Name"}
						/>
						<CInput
							onChangeText={text => setGrade(text)}
							value={grade.toString()}
							placeHolder={"Grade"}
							keyboardType="numeric"
						/>
						<TouchableOpacity style={Styles.btn} onPress={handleSubmit}>
							<Text style={Styles.btnText}>
								Save
								</Text>
						</TouchableOpacity>
						<Text onPress={() => navigation.navigate('Home')} style={[Styles.paraText, { alignSelf: 'center', fontSize: theme.linkFontSize, color: 'grey' }]}>Go Back to Home</Text>

					</>}
			</View>
		</CLayout>
	);
};

export default EditProfile;
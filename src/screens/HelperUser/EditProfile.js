import React, { useEffect, useState } from "react";
import { loadSubjects } from "../../Store/Actions/SubjectActions";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileDetails, } from "../../Store/Actions/UsersActions";
import CIContainer from "../../components/CIContainer";
import CenteredLoading from "../../components/CenteredLoading";
import H1 from "../../components/H1";
import CInput from "../../components/CInput";
import { TouchableOpacity } from "react-native-gesture-handler";
const EditProfile = () => {
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
		if (parseInt(grade) > 10) { setError("Invalid Grade!"); setOpen(true); return; }
		dispatch(updateProfileDetails({ grade, fullName }, () => {
			setError("");
			setMsg("Profile Updated!");
			setOpen(true);
		}));
	};
	return (
		<CIContainer>
			<View style={Styles.innerContainer}>
				{loading || updatingDetailsLoading ?
					<CenteredLoading size="large" />
					:
					<>
						<H1 style={Styles.heading} text="Edit Profile" />
						<CInput
							onChangeText={text => setFullName(text)}
							value={fullName}
							placeHolder={"Full Name"}
						/>
						<CInput
							onChangeText={text => setGrade(text)}
							value={grade}
							placeHolder={"Grade"}
						/>
						<TouchableOpacity style={Styles.btn} onPress={handleSubmit}>
							<Text style={Styles.btnText}>
								Save
								</Text>
						</TouchableOpacity>
						<TouchableOpacity><Text>Go back to home</Text></TouchableOpacity>
					</>}
			</View>
		</CIContainer>
	);
};

export default EditProfile;
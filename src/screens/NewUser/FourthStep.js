import React, { useState } from "react";
import { auth, database } from "../../firebase/index";
import { useDispatch, useSelector } from "react-redux";
import { insertDetails, setNewUserData } from "../../Store/Actions/UsersActions";
import { helperStatus, UserRoles } from "../../utils/Constants";
import CenteredLoading from "../../components/CenteredLoading";
import CIContainer from "../../components/CIContainer";
import { Text, View } from "react-native";
import Styles from "./styles";
import H1 from "../../components/H1";
import CInput from "../../components/CInput";
import { TouchableOpacity } from "react-native-gesture-handler";
const FourthStep = ({ onNext, onFinish }) => {
	const dispatch = useDispatch();
	const [meetLink, setLink] = useState("");
	const stateProps = useSelector(({ User }) => {
		return {
			...User
		};
	});
	const { newData, loading } = stateProps;
	const handleSubmit = (e) => {
		if (meetLink === "") {
			alert("Please insert a link first.");
			return;
		}
		dispatch(insertDetails({ ...newData, id: auth().currentUser.uid, email: auth().currentUser.email, meetLink, role: UserRoles.HELPER_USER }, () => {
			database()
				.ref("helpers").child(auth().currentUser.uid)
				.update({ status: helperStatus.AVAILABLE });
			onFinish();
		}));
	};
	return (
		<CIContainer>
			<View style={Styles.innerContainer}>
				<H1 style={Styles.heading} text="Welcome" />
				<Text style={Styles.paraText}> Let's setup you account. </Text>
				{loading ?
					<CenteredLoading size="large" />
					:
					<>
						<Text style={Styles.paraText}>Go to meet.google.com using the same Google Account you signed up with and get a Google Meet
                            link. This will be the permanent link you use to host help sessions.</Text>
						<Text>Paste your Google Meet link.</Text>

						<CInput
							onChangeText={text => setLink(text)}
							value={meetLink}
							placeHolder={"Your google meet link"}
						/>
						<Text style={Styles.paraText}>Format: https:// your meet link</Text>
						<TouchableOpacity style={Styles.btn} onPress={handleSubmit}>
							<Text style={Styles.btnText}>
								Finish
							</Text>
						</TouchableOpacity>
					</>
				}
			</View>
		</CIContainer>
	);
};

export default FourthStep;
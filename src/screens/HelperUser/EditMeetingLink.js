import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CIContainer from "../../components/CIContainer";
import { updateMeetingLink } from "../../Store/Actions/UsersActions";
import CenteredLoading from "../../components/CenteredLoading";
import Styles from "./styles";
import H1 from "../../components/H1";
import CInput from "../../components/CInput";
import { TouchableOpacity } from "react-native-gesture-handler";
import CLayout from "../../components/CLayout";
import { View, Text } from "react-native";
import theme from "../../theme";
const EditMeetingLink = ({ navigation }) => {
	const dispatch = useDispatch();
	const stateProps = useSelector(({ User }) => {
		return {
			...User
		};
	});
	const { data, meetingLoading } = stateProps;
	const [meetLink, setMeetLink] = useState(data.meetLink || "");
	const handleSubmit = (e) => {
		if (meetLink === "") {
			alert("Meeting link cannot be empty!");
			return;
		}
		dispatch(updateMeetingLink({ meetLink }, () => {
			alert("Meeting link updated!");
		}));
	};
	return (
		<CLayout>
			<View style={Styles.innerContainer}>
				{meetingLoading ?
					<CenteredLoading size="large" />
					:
					<>
						<H1 style={Styles.heading} text="Edit Meeting Link" />
						<Text>Paste your Google Meet link.</Text>
						<CInput
							onChangeText={text => setMeetLink(text)}
							value={meetLink}
							placeHolder={"Your google meet link"}
						/>
						<Text style={[Styles.paraText, { alignSelf: 'center' }]}>Format: https:// your meet link</Text>
						<TouchableOpacity style={Styles.btn} onPress={handleSubmit}>
							<Text style={Styles.btnText}>
								Save
								</Text>
						</TouchableOpacity>
						<Text onPress={() => navigation.navigate('Home')} style={[Styles.paraText, { alignSelf: 'center', fontSize: theme.linkFontSize, color: 'grey' }]}>Go Back to Home</Text>
					</>
				}
			</View>
		</CLayout>
	);
};

export default EditMeetingLink;
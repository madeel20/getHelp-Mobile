import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { loadSubjects } from "../../../Store/Actions/SubjectActions";
import { updateHelpStatus } from "../../../Store/Actions/HelpActions";
import { helpGigStatus } from "../../../utils/Constants";
import { auth, database } from "../../../firebase";
import CIContainer from "../../../components/CIContainer";
import H1 from "../../../components/H1";
import { View, Text, ActivityIndicator } from "react-native";
import Styles from "./styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { themeColor } from "../../../theme";
const WaitingForHelp = ({ onCancel }) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(loadSubjects());
	}, []);
	const stateProps = useSelector(({ GetHelp }) => {
		return {
			...GetHelp
		};
	});
	const { cancellationLoading } = stateProps;
	const handleCancel = async () => {
		try {
			// check if any helper is waiting to accept the request .. then un assign him
			let gig = await database().ref("helpGigs").child(auth().currentUser.uid).once("value");
			gig = gig.val() ? gig.val() : {};
			if (gig && gig.lastHelperAssigned) {
				await database().ref("helpers").child(gig.lastHelperAssigned).update({
					assignedUser: "",
				});
			}
			console.log(dispatch,updateHelpStatus,{ status: helpGigStatus.CANCELLED, lastHelperAssigned: "", helpersAsked: [], helperId: "", dateTime: "" })
			dispatch(updateHelpStatus({ status: helpGigStatus.CANCELLED, lastHelperAssigned: "", helpersAsked: [], helperId: "", dateTime: "" }, () => {
				onCancel();
			}));
		}
		catch (err) {
			console.log(err)
		}
	};

	return (
		<CIContainer>
			<View style={Styles.innerContainer}>
				<H1 text="Searching For Helpers…" />
				<Text>	Please wait </Text>
				<ActivityIndicator size="large" color={themeColor} />
				{cancellationLoading ?
					<ActivityIndicator size="large" color={themeColor} />
					:
					<TouchableOpacity style={Styles.btn} onPress={handleCancel}>
						<Text style={Styles.btnText}>
							Cancel
							</Text>
					</TouchableOpacity>
				}
				<Text>Please be ready to share your screen with the problem you try to solve.</Text>
				<Text>If your problem is on paper, please take a photo using your phone and show the photo on your screen.</Text>
			</View>
		</CIContainer>
	);
};

export default WaitingForHelp;
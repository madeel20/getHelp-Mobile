import React, { useEffect, useRef, useState } from "react";
import WaitingForHelp from "./WaitingForHelp";
import RequestHelp from "./RequestHelp";
import { useDispatch, useSelector } from "react-redux";
import { helperStatus, helpGigStatus, websiteLink } from "../../../utils/Constants";
import { auth, database } from "../../../firebase";
import { getHelpGig, updateHelperUserStatus } from "../../../Store/Actions/UsersActions";
import HelpAccepted from "./HelpAccepted";
import CLayout from "../../../components/CLayout";
import { View } from "react-native";
import styles from "../../HelperUser/styles";
import H1 from "../../../components/H1";
import { TouchableOpacity } from "react-native-gesture-handler";
import theme from "../../../theme";
import { Text } from "react-native";
const GetHelp = ({ navigation }) => {
	const dispatch = useDispatch();
	const [isHelpRequestAssigned, setHelpRequestAssigned] = useState(false);
	const isNotificationAlreadyShown = useRef(false);
	const [isRequestTimedOut, setIsRequestTimedOut] = useState(false);
	const stateProps = useSelector(({ User }) => {
		return { ...User };
	});
	const { helpGig, data } = stateProps;
	useEffect(() => {
		// dispatch(updateHelperUserStatus({ status: helperStatus.NOT_AVAILABLE }))
	}, [])
	useEffect(() => {
		if (helpGig && helpGig.status === helpGigStatus.ACTIVE) {
			setHelpRequestAssigned(true);
		}
		if (helpGig && helpGig.status === helpGigStatus.TIMEOUT && !isNotificationAlreadyShown.current) {
			alert("Sorry, No Helper is currently available! Try Again.");
			setIsRequestTimedOut(true);
			isNotificationAlreadyShown.current = true;
			database().ref("helpGigs").child(auth().currentUser.uid).update({ status: helpGigStatus.CANCELLED });

		}
	}, [helpGig]);
	useEffect(() => {
		database()
			.ref("helpGigs").child(auth().currentUser.uid).on("value", (snapshot) => {
				if (snapshot && snapshot.val() && Object.entries(snapshot.val()).length > 0) {
					dispatch(getHelpGig(snapshot.val()));
				}
			});
	}, []);
	if (isRequestTimedOut) {
		return (
			<CLayout>
				<View style={styles.innerContainer}>
					<H1 style={{ fontSize: theme.h2FontSize, textAlign: 'center' }} text={`Whoops, No match found!`} />
					<TouchableOpacity style={styles.btn} onPress={() => setIsRequestTimedOut(false)}>
						<Text style={styles.btnText}>
							Please Try Again later
							</Text>
					</TouchableOpacity>
				</View>
			</CLayout>
		);
	}
	if (helpGig && helpGig.status === helpGigStatus.ASSIGNED && ((new Date().getTime() - new Date(helpGig.dateTime).getTime()) / 1000) < 900) {
		return <CLayout><HelpAccepted helperId={helpGig.helperId} user={data} helpGig={helpGig} onCancel={() => { setHelpRequestAssigned(false); navigation.navigate('Home'); }} /></CLayout>;
	}
	if (isHelpRequestAssigned && helpGig && (helpGig.status === helpGigStatus.ACTIVE || helpGig.status === helpGigStatus.REQUESTED_TO_ASSIGN)) {
		return <CLayout><WaitingForHelp onCancel={() => { setHelpRequestAssigned(false); navigation.navigate('Home'); }} /></CLayout>;
	}
	else {
		return <CLayout><RequestHelp onRequest={() => { setHelpRequestAssigned(true); isNotificationAlreadyShown.current =false; }} /></CLayout>;
	}
};
export default GetHelp;
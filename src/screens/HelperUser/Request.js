import React, { useEffect, useState } from "react";
import { auth, database, firestore } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { insertIntoAcceptedGigs, setAssignedUserOfHelperUser, updateHelpGig } from "../../Store/Actions/HelpActions";
import { helpGigStatus, websiteLink } from "../../utils/Constants";
import CIContainer from "../../components/CIContainer";
import H1 from "../../components/H1";
import { View, Text } from "react-native";
import CenteredLoading from "../../components/CenteredLoading";
import { TouchableOpacity } from "react-native-gesture-handler";
import CLayout from "../../components/CLayout";
import Styles from "./styles";
import { themeColor } from "../../theme";

const Request = ({ onAccepted }) => {
	const dispatch = useDispatch();
	const [currentRequest, setCurrentRequest] = useState({});
	const [requestUser, setRequestUser] = useState({});
	const [loading, setLoading] = useState(false);
	const stateProps = useSelector(({ User }) => {
		return { ...User };
	});
	const { data, helperUserData } = stateProps;
	useEffect(() => {
		if (helperUserData.hasOwnProperty('assignedUser') && helperUserData.assignedUser !== "") {
			setLoading(true);
			database().ref("helpGigs").child(helperUserData.assignedUser).once("value").then(res => {
				setCurrentRequest(res.val());
				firestore().collection("users").where("id", "==", helperUserData.assignedUser).get().then(res => {
					setRequestUser(res.docs[0].data());
					alert(res.docs[0].data().fullName + " needs your help!");
					setLoading(false);
				});
			}
			);
		}
	}, [helperUserData.assignedUser]);
	const handleCancel = () => {
		setLoading(true);
		dispatch(updateHelpGig(helperUserData.assignedUser, { status: helpGigStatus.ACTIVE }, () => {
			dispatch(setAssignedUserOfHelperUser({ assignedUser: "" }, () => {
				setLoading(false);
			}));
		}));
	};
	const handleAccept = () => {
		setLoading(true);
		dispatch(updateHelpGig(helperUserData.assignedUser, { status: helpGigStatus.ASSIGNED, helperId: auth().currentUser.uid }, () => {
			dispatch(insertIntoAcceptedGigs(helperUserData.assignedUser, () => {
				dispatch(setAssignedUserOfHelperUser({ assignedUser: "" }, () => {
					onAccepted();
					setLoading(false);
				}));
			}));
		}));
	};
	return (
		<CLayout>
			<View style={Styles.innerContainer}>
				<H1 text={`Hi, ${data.fullName}`} />
				{loading ?
					<CenteredLoading />
					:
					<>
						<Text>{requestUser.fullName} needs your help in {currentRequest.subjectName} of Grade {currentRequest.grade}.</Text>
						<View>
							<TouchableOpacity style={Styles.btn} onPress={handleAccept}>
								<Text style={Styles.btnText}>
									Accept
							</Text>
							</TouchableOpacity>
							<TouchableOpacity style={[Styles.btn, { marginTop: 10, backgroundColor: 'white', borderColor: themeColor }]} onPress={handleCancel}>
								<Text style={[Styles.btnText, { color: themeColor }]}>
									Decline
							</Text>
							</TouchableOpacity>

						</View>
					</>
				}
			</View>
		</CLayout>
	);
};

export default Request;
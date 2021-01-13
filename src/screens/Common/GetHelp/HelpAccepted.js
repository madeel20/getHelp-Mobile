import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { loadSubjects } from "../../../Store/Actions/SubjectActions";
import { updateHelpStatus } from "../../../Store/Actions/HelpActions";
import { helpGigStatus, websiteLink } from "../../../utils/Constants";
import { database, firestore } from "../../../firebase";
import CenteredLoading from "../../../components/CenteredLoading";
import { Linking, Text, View } from "react-native";
import H1 from "../../../components/H1";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Styles from "./styles";
import theme, { themeColor } from "../../../theme";

const HelpAccepted = ({ helperId, helpGig, onCancel, user }) => {
	const dispatch = useDispatch();
	const [helperUser, setHelperUser] = useState({});
	const [loading, setLoading] = useState(false);
	const [acceptedGigObj, setAcceptedObj] = useState([]);
	useEffect(() => {
		dispatch(loadSubjects());
	}, []);
	useEffect(() => {
		setLoading(true);
		firestore().collection("users").where("id", "==", helperId).get().then(res => {
			if (res.docs.length > 0) {
				setHelperUser(res.docs[0].data());
				setLoading(false);
				alert(res.docs[0].data().fullName + " has accepted you request!");
			}
		});
	}, []);
	useEffect(() => {
		if (helpGig && helpGig.acceptedGigsId) {
			database.ref("acceptedGigs").child(helpGig.acceptedGigsId).once("value").then(res => {
				setAcceptedObj({ ...res.val() });
			})
		}
	}, [helpGig])
	const handleDone = async () => {
		setLoading(true);
		dispatch(updateHelpStatus({ status: helpGigStatus.CANCELLED, lastHelperAssigned: "", helpersAsked: [], helperId: "", dateTime: "" }, () => {
			onCancel();
		}));
	};
	const handleNo = () => {
		setLoading(true);
		database().ref("acceptedGigs").child(helpGig.acceptedGigsId).update({ thumbsUp: false }).then(() => {
			setLoading(false);
			setAcceptedObj({});
			handleDone();
		});
	};
	const handleYes = () => {
		setLoading(true);
		database().ref("acceptedGigs").child(helpGig.acceptedGigsId).update({ thumbsUp: true }).then(() => {
			setLoading(false);
			setAcceptedObj({});
			// setOpen(false);
			// start listener again
			// setIntervalFlag(Math.random());
			handleDone();
		});
	};
	return (
		<>
			<View style={Styles.innerContainer}>
				{loading ?
					<CenteredLoading />
					: <>
						<H1 style={{ fontSize: theme.h2FontSize, textAlign: 'center' }} text={`Congrats! ${helperUser.fullName} would like to help you!`} />
						<Text style={[Styles.paraText, { marginTop: 5 }]}>When you go to the meeting, make sure you’re logged onto the same personal Google account ({user?.email}). School accounts do not allow you to join Google meets.</Text>
						<Text style={[Styles.btn, { color: 'white' }]} onPress={() => {
							Linking.openURL(helperUser.meetLink)
								.catch(err => {
									console.error("Failed opening page because: ", err)
									alert('Meeting link is invalid!')
								})
						}} > Go To Meeting </Text>
						{/* <TouchableOpacity style={Styles.btn} onPress={handleDone}>
							<Text style={Styles.btnText}>
								Done
							</Text>
						</TouchableOpacity>
						<Text style={[Styles.paraText,{marginTop:10}]}>Click ‘DONE”’ after the meeting session is finished.</Text> */}
						{Object.entries(acceptedGigObj).length > 0 && !acceptedGigObj.hasOwnProperty('thumbsUp') &&
							<View style={{ marginTop: 20, padding: 5 }}>
								<Text>After you finish with the Google meeting, if you found the session helpful, please remember to give {helperUser.fullName} a thumbs up.</Text>
								<View style={{ flexDirection: 'row' }}>
									<TouchableOpacity style={Styles.btn} onPress={handleYes}>
										<Icon name="thumb-up" color={themeColor} />
									</TouchableOpacity>
									<TouchableOpacity style={Styles.btn} onPress={handleNo}>
										<Text>Not this time</Text>
									</TouchableOpacity>
								</View>
							</View>
						}
					</>
				}
			</View>
		</>
	);
};

export default HelpAccepted;
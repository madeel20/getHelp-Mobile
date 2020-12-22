import React, { useEffect, useState } from "react";
import { Linking, Text, View } from "react-native";
import { Switch, TouchableOpacity } from "react-native-gesture-handler";
import { Title, Button } from 'react-native-paper';
import { useDispatch, useSelector } from "react-redux";
import CLayout from "../../components/CLayout";
import H1 from "../../components/H1";
import { auth, database } from "../../firebase";
import { getHelperUserData, updateHelperUserStatus } from "../../Store/Actions/UsersActions";
import theme, { themeColor } from "../../theme";
import { helperStatus } from "../../utils/Constants";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Request from "./Request";
import Styles from './styles'
const Home = ({ navigation }) => {
	const dispatch = useDispatch();
	const stateProps = useSelector(({ User }) => {
		return { ...User };
	});
	const [isRequestAccepted, setIsRequestAccepted] = useState(false);
	const { data, activeStatus, helperUserData } = stateProps;
	useEffect(() => {
		try {
			database()
				.ref("helpers").child(auth().currentUser.uid).on("value", (snapshot) => {
					dispatch(updateHelperUserStatus({ status: snapshot && snapshot.val() && Object.entries(snapshot.val()).length > 1 ? snapshot.val().status : helperStatus.AVAILABLE }));
					dispatch(getHelperUserData(snapshot && snapshot.val() && Object.entries(snapshot.val()).length > 2 ? snapshot.val() : { assignedUser: "" }));
				});
		}
		catch (e) {
			console.log(e);
		}
	}, []);
	if (helperUserData.assignedUser !== "" && helperUserData.assignedTime && (new Date().getTime() - new Date(helperUserData.assignedTime).getTime()) / 1000 < 120) {
		return <Request onAccepted={() => setIsRequestAccepted(true)} />;
	}
	if (isRequestAccepted) {
		return (
			<CLayout>
				<View style={Styles.innerContainer}>
					<Text style={[Styles.paraText, { fontSize: theme.h2FontSize }]}>Hey, {data.fullName || ""} go to your google meet link to help! </Text>
					<Text style={[Styles.paraText, { fontSize: theme.h3FontSize, marginHorizontal: 5 }]} onPress={() => {
						Linking.openURL(data.meetLink||"")
							.catch(err => {
								console.error("Failed opening page because: ", err)
								alert('Meeting link is invalid!')
							})
					}} style={Styles.link}>{data.meetLink || ""}</Text>
					<Button style={[Styles.btn]} onPress={() => setIsRequestAccepted(false)} >
						<Text style={Styles.btnText}>Done</Text></Button>
					<Text style={[Styles.paraText, { marginTop: 5 }]}>
						Click ‘DONE”’ after the meeting session is finished.
						</Text>
				</View>
			</CLayout>
		);
	}
	return (
		<CLayout>
			<View style={Styles.innerContainer}>
				<H1 text={"HI, " + (data.fullName || "...")} />
				<View style={Styles.subContainers}>
					<View style={Styles.subChildContainer}>
						<Text>	Are you available to help? </Text>
						<Switch
							trackColor={{ false: "#767577", true: "grey" }}
							thumbColor={activeStatus ? themeColor : "#f4f3f4"}
							ios_backgroundColor="#3e3e3e"
							onValueChange={() => dispatch(updateHelperUserStatus({ status: !activeStatus }))}
							value={activeStatus}
						/>
					</View>
					<TouchableOpacity onPress={() => navigation.navigate('Get Help')} style={Styles.subChildContainer}>
						<View>
							<Text>	I need help! </Text>
							<Icon name="near-me" color="black" size={25} style={{ alignSelf: 'center' }} />
						</View>
					</TouchableOpacity>
				</View>
				<Text style={Styles.paraText}>If you switch toggle to ‘yes,’ keep this tab open; </Text>
				<Text style={Styles.paraText}>You can focus on other tabs. You’ll receive a notification if someone needs help.</Text>
				<Text style={Styles.paraText}>Your Google Meet link to help others is shown at the top of the tool bar under your name</Text>
			</View>
		</CLayout>
	);
};

export default Home;
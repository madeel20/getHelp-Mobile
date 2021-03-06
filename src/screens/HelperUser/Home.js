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
 	if (helperUserData.assignedUser !== "" && helperUserData.assignedTime && (new Date().getTime() - new Date(helperUserData.assignedTime).getTime()) / 1000 < 120) {
		return <Request onAccepted={() => setIsRequestAccepted(true)} />;
	}
	if (isRequestAccepted) {
		return (
			<CLayout>
				<View style={Styles.innerContainer}>
					<Text style={[Styles.paraText, { fontSize: theme.h2FontSize }]}>Hey {data.fullName || ""}, go to your google meet link to help! </Text>
					<Text style={[Styles.paraText]}>Make sure you're logged into the same personal Google account ({data?.email}) so you can host your Google meet.</Text>
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
						<Text style={{marginBottom:10}}>	Are you available to help? </Text>
						<Switch
							trackColor={{ false: "#767577", true: "grey" }}
							thumbColor={activeStatus ? themeColor : "#f4f3f4"}
							ios_backgroundColor="#3e3e3e"
							onValueChange={() => dispatch(updateHelperUserStatus({ status: !activeStatus }))}
							value={activeStatus}
						/>
						<Text  style={[Styles.paraText,{marginTop:10}]}>Please use the “Edit Subjects” tab inside the drawer to select or update subjects you would like to help with.</Text>
					</View>
					<TouchableOpacity onPress={() => {dispatch(updateHelperUserStatus({ status: helperStatus.NOT_AVAILABLE })); navigation.navigate('Get Help')}} style={Styles.subChildContainer}>
						<View>
							<Text>	I need help! </Text>
							<Icon name="near-me" color="black" size={25} style={{ alignSelf: 'center' }} />
						</View>
					</TouchableOpacity>
				</View>
				<Text style={Styles.paraText}>If you switch toggle to ‘yes,’ keep this tab open; </Text>
				<Text style={Styles.paraText}>You can be on another app, but you’ll receive a notification if someone needs help from you.</Text>
				<Text style={Styles.paraText}>Your Google Meet link to help others is shown at the sidebar under your name.</Text>
			</View>
		</CLayout>
	);
};

export default Home;
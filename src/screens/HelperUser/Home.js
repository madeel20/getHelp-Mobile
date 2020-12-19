import React, {useEffect, useState} from "react";
import {  Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {Title,Button} from 'react-native-paper';
import {useDispatch, useSelector} from "react-redux";
import CLayout from "../../components/CLayout";
import {auth, database} from "../../firebase";
import {getHelperUserData, updateHelperUserStatus} from "../../Store/Actions/UsersActions";
import {helperStatus} from "../../utils/Constants";
import Request from "./Request";
const Home = ()=>{
	const dispatch = useDispatch();
	const stateProps = useSelector(({User})=>{
		return {...User};
	});
	const [isRequestAccepted,setIsRequestAccepted] = useState(false);
	const { data, activeStatus,helperUserData } = stateProps;
	useEffect(()=>{
		try {
			database()
				.ref("helpers").child(auth().currentUser.uid).on("value", (snapshot) => {
					dispatch(updateHelperUserStatus({status: snapshot && snapshot.val() && Object.entries(snapshot.val()).length>1?snapshot.val().status : helperStatus.AVAILABLE}));
					dispatch(getHelperUserData(snapshot && snapshot.val() && Object.entries(snapshot.val()).length>2?snapshot.val():{assignedUser:""}));
				});
		}
		catch (e) {
			console.log(e);
		}
	},[]);
	if(helperUserData.assignedUser!=="" && helperUserData.assignedTime && (new Date().getTime() - new Date(helperUserData.assignedTime).getTime())/1000 < 120){
		return <Request onAccepted={()=>setIsRequestAccepted(true)}/>;
	}
	if(isRequestAccepted) {
		return (
			<View>
				<View>
					<Text>Hey, {data.fullName} go to your google meet link to help! </Text>
					<Button  onPress={()=>setIsRequestAccepted(false)} >Done</Button>
				</View>
			</View>
		);
	}
	return (
		<CLayout>
		<View>
			<Text >{data.fullName}</Text>
			<View>
				<View>
					<Text>	Are you available to help? </Text>
					{/* <Switch
						checked={activeStatus}
						onChange={(e)=>dispatch(updateHelperUserStatus({status:!activeStatus}))}
						color="primary"
						name="checkedB"
						inputProps={{ "aria-label": "primary checkbox" }}
					/> */}
				</View>
				<TouchableOpacity><View>
					<Text>	I need help! </Text>
					{/* <NearMeIcon fontSize="large" /> */}
				</View>
				</TouchableOpacity>
			</View>
			<Text>If you switch toggle to ‘yes,’ keep this tab open; </Text>
			<Text>You can focus on other tabs. You’ll receive a notification if someone needs help.</Text>
			<Text>Your Google Meet link to help others is shown at the top of the tool bar under your name</Text>
		</View>
		</CLayout>
	);
};

export default Home;
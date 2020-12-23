import React, {useEffect, useRef, useState} from "react";
import WaitingForHelp from "./WaitingForHelp";
import RequestHelp from "./RequestHelp";
import {useDispatch, useSelector} from "react-redux";
import {helperStatus, helpGigStatus, websiteLink} from "../../../utils/Constants";
import {auth, database} from "../../../firebase";
import {getHelpGig, updateHelperUserStatus} from "../../../Store/Actions/UsersActions";
import HelpAccepted from "./HelpAccepted";
import CLayout from "../../../components/CLayout";
const GetHelp = ({navigation})=> {
	const dispatch = useDispatch();
	const [isHelpRequestAssigned,setHelpRequestAssigned] = useState(false);
	const isNotificationAlreadyShown = useRef(false);
	const stateProps = useSelector(({User})=>{
		return {...User};
	});
	const {helpGig} = stateProps;
	useEffect(()=>{
		dispatch(updateHelperUserStatus({status:helperStatus.NOT_AVAILABLE}))
		if(helpGig && helpGig.status === helpGigStatus.ACTIVE){
			setHelpRequestAssigned(true);
		}
		if(helpGig && helpGig.status === helpGigStatus.TIMEOUT && !isNotificationAlreadyShown.current){
			alert("Sorry, No Helper is currently available! Try Again.");
			isNotificationAlreadyShown.current = true;
		}
	},[helpGig]);
	useEffect(()=>{
		database()
			.ref("helpGigs").child(auth().currentUser.uid).on("value", (snapshot) => {
				if(snapshot && snapshot.val() && Object.entries(snapshot.val()).length > 0) {
					dispatch(getHelpGig(snapshot.val()));
				}
			});
	},[]);
	if(helpGig && helpGig.status === helpGigStatus.ASSIGNED && ((new Date().getTime() - new Date(helpGig.dateTime).getTime())/1000) < 900 ){
		return <CLayout><HelpAccepted helperId={helpGig.helperId}  onCancel={()=>{ setHelpRequestAssigned(false); navigation.navigate('Home');}} /></CLayout>;
	}
	if(isHelpRequestAssigned  && helpGig && (helpGig.status === helpGigStatus.ACTIVE ||helpGig.status === helpGigStatus.REQUESTED_TO_ASSIGN  )){
		return <CLayout><WaitingForHelp onCancel={()=>{setHelpRequestAssigned(false);navigation.navigate('Home');}} /></CLayout>;
	}
	else {
		return <CLayout><RequestHelp onRequest={()=>{setHelpRequestAssigned(true); }} /></CLayout>;
	}
};
export default GetHelp;
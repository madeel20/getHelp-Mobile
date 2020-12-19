import {useDispatch} from "react-redux";
import React, {useEffect, useState} from "react";
import {loadSubjects} from "../../../Store/Actions/SubjectActions";
import {updateHelpStatus} from "../../../Store/Actions/HelpActions";
import { helpGigStatus, websiteLink} from "../../../utils/Constants";
import {firestore} from "../../../firebase";
import CenteredLoading from "../../../components/CenteredLoading";
import { Text, View } from "react-native";
import CIContainer from "../../../components/CIContainer";
import H1 from "../../../components/H1";
import { TouchableOpacity } from "react-native-gesture-handler";

const HelpAccepted =({helperId,onCancel})=>{
	const dispatch = useDispatch();
	const [helperUser,setHelperUser] = useState({});
	const [loading,setLoading] = useState(false);
	useEffect(()=>{
		dispatch(loadSubjects());
	},[]);
	useEffect(()=>{
		setLoading(true);
		firestore().collection("users").where("id","==",helperId).get().then(res=>{
			if(res.docs.length>0){
				setHelperUser(res.docs[0].data());
				setLoading(false);
				alert(res.docs[0].data().fullName +" has accepted you request!");
			}
		});
	},[]);
	const handleDone = async ()=>{
		dispatch(updateHelpStatus({status: helpGigStatus.CANCELLED,lastHelperAssigned:"",helpersAsked:[],helperId:"",dateTime:""}, ()=>{
			onCancel();
		}));
	};
	return (
		<CIContainer>
			<View>
				{loading ?
					<CenteredLoading />
					:<>
						<H1 text={`Congrats! ${helperUser.fullName} would like to help you!`}/>
						<Text> Go To Meeting </Text>
						<TouchableOpacity style={Styles.btn} onPress={handleDone}>
							<Text style={Styles.btnText}>
								Done
							</Text>
						</TouchableOpacity>
					</>
				}
			</View>
		</CIContainer>
	);
};

export default HelpAccepted;
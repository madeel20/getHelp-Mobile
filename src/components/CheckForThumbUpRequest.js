import React, { useEffect, useRef, useState } from "react";
import { database, auth, firestore } from "../firebase";
import { convertDBSnapshoptToArrayOfObject, convertToArray } from "../utils/helpers";
import { websiteLink } from "../utils/Constants";
import { Button, Snackbar } from 'react-native-paper';
import { ActivityIndicator,StyleSheet,Text,View,Alert } from "react-native";
import theme, { themeColor } from "../theme";
const CheckForThumbsUpRequest = () => {
	const [currentGig, setCurrentGig] = useState({});
	const [open, setOpen] = useState(false);
	const [helperUser, setHelperUser] = useState({});
	// const [intervalFlag, setIntervalFlag] = useState(Math.random());
	const intervalObj = useRef();
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		intervalObj.current =  setInterval(()=>
		database().ref("acceptedGigs").once("value").then((snap)=>{
			let res = convertDBSnapshoptToArrayOfObject(snap);
			// filter gig where user id is of current user
			res = res.filter(it=>it.userId===auth().currentUser.uid);
			// check if there any gig whose thump up is not set ... and the time is greater then 2 min
			res = res.filter(it=>!it.hasOwnProperty("thumbsUp") && ((new Date().getTime() - new Date(it.acceptedTime).getTime())/1000)> 3600 );
			if(res.length>0){
				firestore().collection("users").where("id","==",res[0].helperId).get().then(r=>{
					if(r.docs.length>0){
						setHelperUser(convertToArray(r.docs)[0]);
						setCurrentGig(res[0]);
						setOpen(true);
						clearInterval(intervalObj.current);
						generateAlert();
					}
				});
			}
		}),40000);
	return ()=>{
		clearInterval(intervalObj.current);
	};
	}, []);
	const handleNo = () => {
		setLoading(true);
		database().ref("acceptedGigs").child(currentGig.id|"").update({ thumbsUp: false }).then(() => {
			// setLoading(false);
			// setOpen(false);
			// start listener again
			// setIntervalFlag(Math.random());
		});
	};
	const handleYes = () => {
		setLoading(true);
		database().ref("acceptedGigs").child(currentGig.id|"").update({ thumbsUp: true }).then(() => {
			// setLoading(false);
			// setOpen(false);
			// start listener again
			// setIntervalFlag(Math.random());
		});
	};
	const generateAlert = ()=>{
		Alert.alert(
			'Feedback',
			'Would you like to give your helper '+ helperUser.fullName+' a thumbs-up?',
			[
			  {
				text: 'Yes',
				onPress: () => handleYes()
			  },
			  {
				text: 'Not this time',
				onPress: () =>  handleNo(),
				style: 'cancel'
			  },
			],
			{ cancelable: false }
		  );
	}
	return (
<>
			{/* <>
				<Snackbar
					visible={open}
					onDismiss={()=>{}}
					style={{backgroundColor:'white',borderColor:themeColor,borderWidth:0.4,margin:20,display:'flex',justifyContent:'center',alignItems:'center',alignContent:'center'}}			
					duration={1000}

					>
					{loading ? <ActivityIndicator size={"small"} color={themeColor} /> :
						<>   {currentGig && <>
							<Text style={{position:'relative',fontSize: theme.h3FontSize,color:'black'}}>Would you like to give your helper {helperUser.fullName} a thumbs-up?</Text>
								<Button mode="contained" style={{backgroundColor:themeColor,marginTop:10}} onPress={()=>alert('ADF')}>Yes</Button>
								<Button style={{marginTop:10}} onPress={handleNo}>No</Button>
						</>}
						</>}
				</Snackbar> */}
			
		</>
	);
};
const styles = StyleSheet.create({
	container: {
		
	},
});

export default CheckForThumbsUpRequest;
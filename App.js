import React, { useState, useEffect } from 'react';
import {Provider} from "react-redux";
import CenteredLoading from './src/components/CenteredLoading';
import { NavigationContainer } from '@react-navigation/native';
import { checkIfItsNewUser } from "./src/firebase/helpers";
import AuthStack from './src/stacks/AuthStack';
import {auth,firestore} from './src/firebase/index'
import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';
import {store} from "./src/Store";
import NewUserStack from "./src/stacks/NewUserStack";
import MainStack from './src/stacks/MainStack';
import { View } from 'react-native';
import {updateDataInFireStoreDocumentByFieldName} from './src/firebase/helpers'
async function saveTokenToDatabase(token) {
	// Assume user is already signed in
	const userId = auth().currentUser.uid;
  
	// Add the token to the users datastore
	await updateDataInFireStoreDocumentByFieldName('id',userId,'users',{token},()=>{
		console.log('token updated');
	})
  }
const App = () => {
	const [user, setUser] = useState(null);
	const [initializing, setInitializing] = useState(true);
	const [isLoading, setLoading] = useState(true);
	const [isNewUser, setIsNewUser] = useState(null);
	async function onAuthStateChanged(user) {
		setUser(user);
		if (initializing) {
			setInitializing(false);
		}
	}
	useEffect(() => {
		// Get the device token
		messaging()
		  .getToken()
		  .then(token => {
			return saveTokenToDatabase(token);
		  });
		  
		// If using other push notification providers (ie Amazon SNS, etc)
		// you may need to get the APNs token instead for iOS:
		// if(Platform.OS == 'ios') { messaging().getAPNSToken().then(token => { return saveTokenToDatabase(token); }); }
	
		// Listen to whether the token changes
		return messaging().onTokenRefresh(token => {
		  saveTokenToDatabase(token);
		});
	  }, []);
	useEffect(() => {
		const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
		return subscriber; // unsubscribe on unmount

	}, []);
	useEffect(() => {
		if (user) {

			checkIfItsNewUser().then(isNewUser => {
				if (isNewUser === null) {
					setIsNewUser(null);
				}
				else if (isNewUser === true) {
					setIsNewUser(true);
				}
				else {
					setIsNewUser(false);
				}
				setLoading(false);
			}).catch((err) => {
				console.log(err);
				setLoading(false);
			});

		}
		else {
			setLoading(false);
		}
	}, [user])
	if (isLoading) {
		return <View style={{marginTop:'50%'}}><CenteredLoading size="large" /></View>;
	}
	if (!user) {
		return 	<NavigationContainer><AuthStack /></NavigationContainer>;
	}
	if (user && !isNewUser) {
		return (
			<Provider store={store}>
				<NavigationContainer>
					<MainStack/>
				</NavigationContainer>
			</Provider>
		);
	}
	if (user && isNewUser) {
		return <Provider store={store}>
			<NavigationContainer>
				<NewUserStack onFinish={() => setIsNewUser(false)} />
			</NavigationContainer>
		</Provider>;
	}

	return null;
};


export default App;

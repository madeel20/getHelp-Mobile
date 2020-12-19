import React, { useState, useEffect } from 'react';
import {Provider} from "react-redux";
import CenteredLoading from './src/components/CenteredLoading';
import { NavigationContainer } from '@react-navigation/native';
import { checkIfItsNewUser } from "./src/firebase/helpers";
import AuthStack from './src/stacks/AuthStack';
import {auth} from './src/firebase/index'
import {store} from "./src/Store";
import NewUserStack from "./src/stacks/NewUserStack";
import MainStack from './src/stacks/MainStack';
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
		return <CenteredLoading size="large" />;
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

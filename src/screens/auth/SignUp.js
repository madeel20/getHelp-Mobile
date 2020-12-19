import React, { useState } from "react";
import CheckBox from '@react-native-community/checkbox';
import { GoogleSignin } from '@react-native-community/google-signin';
import H1 from "../../components/H1";
import CIContainer from "../../components/CIContainer";
import { Button, Image, Text, TouchableOpacity, View } from "react-native";
import auth from '@react-native-firebase/auth';
import Styles from './styles';
GoogleSignin.configure({
	webClientId: "1081308066793-ici0vq1lthpd26rkem1bf5ebgll5fh4f.apps.googleusercontent.com",
});
export default function SignIn({navigation}) {
	const [checked, setChecked] = React.useState(false);
	const handleChange = (event) => {
		setChecked(event.target.checked);
	};
	const onGoogleButtonPress = async () => {
		// Get the users ID token
		const { idToken } = await GoogleSignin.signIn();
		// Create a Google credential with the token
		const googleCredential = auth.GoogleAuthProvider.credential(idToken);
		// Sign-in the user with the credential
		return auth().signInWithCredential(googleCredential);
	}
	const handleSignIn = () => {
		if (checked) {
			onGoogleButtonPress().then(() => console.log('Signed in with Google!'))
		}
		else {
			alert('Please accept our Terms of Services and Privacy Policy.');
		}
	};
	return (
		<CIContainer>
			<View style={Styles.authContainer}>
				<H1 style={Styles.heading} text="Sign Up" />
				<TouchableOpacity
					title="Google Sign-Up"
					onPress={handleSignIn}
					style={Styles.signInButton}
				>
					<Image style={Styles.googleIcon} source={{ uri: 'https://img.icons8.com/ios-filled/50/000000/google-logo.png' }} />
					<Text style={Styles.signInButtonText}>Continue with Google</Text>
				</TouchableOpacity>
				<View style={Styles.privacyPolicyContainer}>
					<CheckBox
						disabled={false}
						value={checked}
						onValueChange={(newValue) => setChecked(newValue)}
					/>
					<Text style={Styles.privayPolicyText}>I agree to the Terms of Services and Privacy Policy </Text></View>

				<View>
					<TouchableOpacity onPress={()=>navigation.navigate('SignIn')}><Text>Already have an Account? <Text style={Styles.altOptionText}>Sign In</Text></Text></TouchableOpacity>
				</View>
			</View>
		</CIContainer>
	);
}
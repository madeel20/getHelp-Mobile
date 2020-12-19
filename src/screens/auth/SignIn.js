import React from "react";
import CIContainer from '../../components/CIContainer';
import H1 from "../../components/H1";
import { GoogleSignin } from '@react-native-community/google-signin';
import { Image,View,TouchableOpacity,Text } from "react-native";
import Styles from './styles';
GoogleSignin.configure({
	webClientId: "1081308066793-ici0vq1lthpd26rkem1bf5ebgll5fh4f.apps.googleusercontent.com",
});
export default function SignIn({navigation}) {
	const onGoogleButtonPress=async ()=> {
		// Get the users ID token
		const { idToken } = await GoogleSignin.signIn();
	  
		// Create a Google credential with the token
		const googleCredential = auth.GoogleAuthProvider.credential(idToken);
	  
		// Sign-in the user with the credential
		return auth().signInWithCredential(googleCredential);
	  }
	return (
		<CIContainer>
			<View style={Styles.authContainer}>
				<H1 style={Styles.heading} text="Sign In" />
				<TouchableOpacity
					title="Google Sign-In"
					onPress={onGoogleButtonPress}
					style={Styles.signInButton}
				>
					<Image style={Styles.googleIcon} source={{ uri: 'https://img.icons8.com/ios-filled/50/000000/google-logo.png' }} />
					<Text style={Styles.signInButtonText}>Continue with Google</Text>
				</TouchableOpacity>
				<View>
					<TouchableOpacity onPress={()=>navigation.navigate('SignUp')}><Text>Create an account: <Text style={Styles.altOptionText}>Sign Up</Text></Text></TouchableOpacity>
				</View>
			</View>
		</CIContainer>
	);
}
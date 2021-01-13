import React from "react";
import CLayout from "../../components/CLayout";
import { View } from "react-native";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styles from "../HelperUser/styles";
import H1 from "../../components/H1";
import { Linking } from "react-native";
import theme from "../../theme";
const ContactUs = () => {
	return (
		<CLayout>
			<View style={[styles.innerContainer, {  width: '90%', justifyContent:'center' }]}>
				<Text style={[styles.heading, { fontSize: theme.h2FontSize,marginBottom:30, textAlign:'center' }]}> We'd love to hear your feedback or suggestions! </Text>
				<View>
					<Text style={{textAlign:'center',marginBottom:20}}>Please email us at: </Text>
					<TouchableOpacity onPress={() => Linking.openURL(`mailto:devjjj3366@gmail.com`)}>
						<Text style={styles.link}>devjjj3366@gmail.com</Text>
					</TouchableOpacity>
				</View>
			</View>
		</CLayout>
	);
};

export default ContactUs;
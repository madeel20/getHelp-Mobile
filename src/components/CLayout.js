import React from 'react';
import { StyleSheet, View } from 'react-native';
import Header from './Header';

const CLayout =({children})=>{
	return (
		<View style={styles.container}>
			<Header title={""}/>
			<View style={styles.child}>
				{children}
			</View>
		</View>
	)
}
const styles = StyleSheet.create({
	container:{
		backgroundColor:'white',
		height:'100%',
	},
	child:{
		flex:1,
		display:'flex',
		justifyContent:'flex-start',
		paddingTop:50,
		alignItems:'center',
	}
})

export default CLayout;
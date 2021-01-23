import React, { useEffect, useState } from "react";
import { database, auth, firestore } from "../../firebase";
import { convertDBSnapshoptToArrayOfObject, convertToArray, MappedElement } from "../../utils/helpers";
import { useSelector } from "react-redux";
import { UserRoles } from "../../utils/Constants";
import CIContainer from "../../components/CIContainer";
import { View ,Text} from "react-native";
import CenteredLoading from "../../components/CenteredLoading";
import H1 from "../../components/H1";
import { DataTable } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import CLayout from "../../components/CLayout";
import styles from "../HelperUser/styles";
import { ScrollView } from "react-native-gesture-handler";
import { themeColor } from "../../theme";
import { useIsFocused } from "@react-navigation/native";
const HelperRecords = () => {
	const isfocused = useIsFocused();
	const stateProps = useSelector(({ User }) => {
		return { ...User };
	});
	const { data } = stateProps;
	const [records, setRecords] = useState([]);
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		setLoading(true)
		database().ref("acceptedGigs").orderByChild('dateTime').once("value").then(async (snap) => {
				// convert it to javascript array of object
				let res = convertDBSnapshoptToArrayOfObject(snap);
			// sort the data by dateTime property in desc order
			res.sort((a, b) => {
				var c = new Date(b?.dateTime);
				var d = new Date(a?.dateTime);
				return c - d;
			});
			if (data.role === UserRoles.HELPER_USER) { setRecords(res.filter(it => it.helperId === auth().currentUser.uid)); }
			else { setRecords(res.filter(it => it.userId === auth().currentUser.uid)); }
			// get all the user from firebase
			firestore().collection("users").get().then((res) => {
				// convert it to javascript array of object
				setUsers(convertToArray(res.docs, false));
				setLoading(false);
			}).catch(err=>{
				console.log(err);
			setLoading(false);
			});
		}).catch(err=>{
			console.log(err);
			setLoading(false);
		});

	}, [isfocused]);
	if (data.role === UserRoles.HELPER_USER) {
		return (
			<CLayout>
				<View style={[styles.innerContainer,{paddingHorizontal:5,width:'90%'}]}>
 					{loading ?
						<CenteredLoading size={30} />
						:
						<>
							<H1 text="Helping Records" />
							<View style={{flexDirection:'row'}}>
								<Text> Thumbs-up: {records.filter(it => it.thumbsUp && it.thumbsUp === true).length} </Text>
								<Text> Total Count: {records.length} </Text>
							</View>
							<DataTable>
								<DataTable.Header>
									<DataTable.Title>Date</DataTable.Title>
									<DataTable.Title>Time</DataTable.Title>
									<DataTable.Title>Person</DataTable.Title>
									<DataTable.Title>Subject</DataTable.Title>
									<DataTable.Title>Thumbs Up</DataTable.Title>
								</DataTable.Header>
								<ScrollView style={styles.recordsContainer}>
								<MappedElement data={records} renderElement={(obj, index) => {
									return (
										<DataTable.Row key={obj.id}>
											<DataTable.Cell>{new Date(obj.acceptedTime).toDateString()}</DataTable.Cell>
											<DataTable.Cell>{new Date(obj.acceptedTime).toTimeString().slice(0, 8)}</DataTable.Cell>
											<DataTable.Cell>{users.find(it => it.id === obj.userId) && users.find(it => it.id === obj.userId).fullName}</DataTable.Cell>
											<DataTable.Cell >{obj.subjectName}</DataTable.Cell>
											<DataTable.Cell >{obj.hasOwnProperty("thumbsUp") ? <>
												{obj.thumbsUp && obj.thumbsUp === true ?
													<Icon name="thumb-up" color={themeColor} /> : "--"}</> : "--"}</DataTable.Cell>
										</DataTable.Row>
									);
								}} />
								</ScrollView>
							</DataTable>
						</>}
				</View>
			</CLayout>
		);
	}
	// else {
	// 	return (
	// 		<div className={"container"}>
	// 			<Paper className={"p-4"}>
	// 				{loading ?
	// 					<CircularProgress size={30}/>
	// 					:
	// 					<>
	// 						<h1> Helping Records </h1>
	// 						<div className={"p-4 d-flex justify-content-between"}>
	// 							<span> Total Count: {records.length} </span></div>
	// 						<TableContainer component={Paper}>
	// 							<Table className={classes.table} aria-label="simple table">
	// 								<TableHead>
	// 									<TableRow>
	// 										<TableCell align="center">Date</TableCell>
	// 										<TableCell align="center">Time</TableCell>
	// 										<TableCell align="center">Helper Name</TableCell>
	// 										<TableCell align="center">Subject</TableCell>
	// 									</TableRow>
	// 								</TableHead>
	// 								<TableBody>
	// 									<MappedElement data={records} renderElement={(obj, index) => {
	// 										return (
	// 											<TableRow key={obj.id}>

	// 												<TableCell
	// 													align="center">{new Date(obj.acceptedTime).toDateString()}</TableCell>
	// 												<TableCell
	// 													align="center">{new Date(obj.acceptedTime).toTimeString().slice(0, 8)}</TableCell>
	// 												<TableCell
	// 													align="center">{users.find(it => it.id === obj.helperId) && users.find(it => it.id === obj.helperId).fullName}</TableCell>
	// 												<TableCell align="center">{obj.subjectName}</TableCell>
	// 											</TableRow>
	// 										);
	// 									}}/>
	// 								</TableBody>
	// 							</Table>
	// 						</TableContainer>
	// 					</>
	// 				}
	// 			</Paper>
	// 		</div>
	// 	);
	// }
};

export default HelperRecords;
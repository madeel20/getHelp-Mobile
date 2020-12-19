import React, { useEffect, useState } from "react";
import { database, auth, firestore } from "../../firebase";
import { convertDBSnapshoptToArrayOfObject, convertToArray, MappedElement } from "../../utils/helpers";
import { useSelector } from "react-redux";
import { UserRoles } from "../../utils/Constants";
import CIContainer from "../../components/CIContainer";
import { View } from "react-native";
import CenteredLoading from "../../components/CenteredLoading";
import H1 from "../../components/H1";
import { DataTable } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons'
const HelperRecords = () => {
	const stateProps = useSelector(({ User }) => {
		return { ...User };
	});
	const { data } = stateProps;
	const [records, setRecords] = useState([]);
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		database().ref("acceptedGigs").once("value").then((snap) => {
			let res = convertDBSnapshoptToArrayOfObject(snap);
			if (data.role === UserRoles.HELPER_USER) { setRecords(res.filter(it => it.helperId === auth().currentUser.uid)); }
			else { setRecords(res.filter(it => it.userId === auth().currentUser.uid)); }
			firestore().collection("users").get().then((res) => {
				setUsers(convertToArray(res.docs, false));
				setLoading(false);
			});
		});

	}, []);
	if (data.role === UserRoles.HELPER_USER) {
		return (
			<CIContainer>
				<View>
					{loading ?
						<CenteredLoading size={30} />
						:
						<>
							<H1 text="Helping Records" />
							<View>
								<Text> Thumbs-up: {records.filter(it => it.thumbsUp && it.thumbsUp === true).length} </Text>
								<Text> Total Count: {records.length} </Text></View>
							<DataTable>
								<DataTable.Header>
									<DataTable.Title>Date</DataTable.Title>
									<DataTable.Title>Time</DataTable.Title>
									<DataTable.Title>Person</DataTable.Title>
									<DataTable.Title>Subject</DataTable.Title>
									<DataTable.Title>Thumbs Up</DataTable.Title>
								</DataTable.Header>
								<MappedElement data={records} renderElement={(obj, index) => {
									return (
										<DataTable.Row key={obj.id}>

											<DataTable.Cell>{new Date(obj.acceptedTime).toDateString()}</DataTable.Cell>
											<DataTable.Cell>{new Date(obj.acceptedTime).toTimeString().slice(0, 8)}</DataTable.Cell>
											<DataTable.Cell>{users.find(it => it.id === obj.userId) && users.find(it => it.id === obj.userId).fullName}</DataTable.Cell>
											<DataTable.Cell >{obj.subjectName}</DataTable.Cell>
											<DataTable.Cell >{obj.hasOwnProperty("thumbsUp") ? <>
												{obj.thumbsUp && obj.thumbsUp === true ?
													<Icon name="thumb_up:=" color="black" /> : <Icon name="thumb_down:=" color="black" />}</> : "--"}</DataTable.Cell>
										</DataTable.Row>
									);
								}} />
							</DataTable>
						</>}
				</View>
			</CIContainer>
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
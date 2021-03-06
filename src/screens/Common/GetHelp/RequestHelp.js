import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { loadSubjects } from "../../../Store/Actions/SubjectActions";
import { insertHelp } from "../../../Store/Actions/HelpActions";
import { helpGigStatus } from "../../../utils/Constants";
import { getArrayOfSubjectsAsLabeValueKeys } from '../../../utils/helpers'
import Styles from "./styles";
import { MultipleSelectPicker } from 'react-native-multi-select-picker';
import { View, Text } from "react-native";
import CenteredLoading from "../../../components/CenteredLoading";
import H1 from "../../../components/H1";
import { TouchableOpacity } from "react-native-gesture-handler";
const RequestHelp = ({ onRequest }) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(loadSubjects());
	}, []);
	const stateProps = useSelector(({ Subjects, GetHelp, User }) => {
		return {
			Subjects,
			GetHelp, User
		};
	});
	const { data } = stateProps.Subjects;
	const { loading } = stateProps.GetHelp;
	const [subject, setSubject] = useState([]);
	const handleSubmit = (e) => {
		if (subject.length === 0) {
			alert("Select a Subject first!");
			return;
		}
		dispatch(insertHelp({
			status: helpGigStatus.ACTIVE,
			subjectId: subject[0].value,
			grade: stateProps.User.data.grade,
			subjectName: data.find(it => it.id === subject[0].value).name,
			dateTime: new Date().toUTCString(),
		}, async () => {
			// alert("Help Request Successful!");
			onRequest();
		}));
	};
	return (
		<>
			<View style={Styles.innerContainer}>
				{loading || stateProps.Subjects.loading ?
					<CenteredLoading size="large" />
					:
					<>
						<H1 text="Ask for help" />
						<Text style={[Styles.paraText, { marginTop: 10 }]}>Please be ready to share your screen with the problem you try to solve.</Text>
						<Text style={[Styles.paraText, { marginTop: 10 }]}>If your problem is on paper, please take a photo using your phone and show the photo on your computer screen.</Text>
						<Text style={[Styles.paraText, { marginTop: 10 }]}>Once you are ready, please select subject below.</Text>
						<Text style={[Styles.paraText, { marginTop: 10 }]}>What subject would you like to be helped with?</Text>
						<MultipleSelectPicker
							items={getArrayOfSubjectsAsLabeValueKeys(data)}
							style={Styles.checkboxContainer}
							onSelectionsChange={(ele) => {
								if (ele.length > 0) {
									setSubject([ele[ele.length - 1]]);
								}
							}}
							buttonStyle={Styles.checkboxSelected}
							selectedItems={subject}
						/>
						<TouchableOpacity style={[Styles.btn, { marginTop: 10 }]} onPress={handleSubmit}>
							<Text style={Styles.btnText}>
								Find Help
							</Text>
						</TouchableOpacity>
					</>
				}
			</View>
		</>
	);
};

export default RequestHelp;
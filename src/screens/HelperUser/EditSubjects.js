import React, { useEffect, useState } from "react";
import { MappedElement } from "../../utils/helpers";
import { loadSubjects } from "../../Store/Actions/SubjectActions";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileDetails } from "../../Store/Actions/UsersActions";
import CIContainer from "../../components/CIContainer";
import { View ,Text} from "react-native";
import Styles from "./styles";
import H1 from "../../components/H1";
import {MultipleSelectPicker} from 'react-native-multi-select-picker';
import CenteredLoading from "../../components/CenteredLoading";
import { TouchableOpacity } from "react-native-gesture-handler";
import {getArrayOfSubjectsAsLabeValueKeys,getBackAsOriginalSubjectStructure} from '../../utils/helpers'
import theme from "../../theme";
const EditSubjects = ({navigation}) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(loadSubjects());
	}, []);
	const stateProps = useSelector(({ Subjects, User }) => {
		return {
			Subjects,
			User
		};
	});
	const { data, loading } = stateProps.Subjects;
	const { updatingDetailsLoading } = stateProps.User;
	const [subjects, setSubjects] = useState(getArrayOfSubjectsAsLabeValueKeys(stateProps.User.data.subjects) || []);

	const handleSubmit = (e) => {
		// if(subjects.length===0){
		// 	setMsg("");
		// 	setError("Please select at least one subject.");
		// 	setOpen(true);
		// 	return;
		// }
		dispatch(updateProfileDetails({ subjects: getBackAsOriginalSubjectStructure(subjects) }, () => {
			alert("Subjects Updated!");
		}));
	};
	return (
		<CIContainer>
			<View style={Styles.innerContainer}>
				<H1 style={Styles.heading} text="Edit Subjects" />
				{loading || updatingDetailsLoading ?
					<CenteredLoading size="large" />
					:
					<>
						<Text>Select the subjects you’d like to help in.</Text>
						<MultipleSelectPicker
							items={getArrayOfSubjectsAsLabeValueKeys(data)}
							style={Styles.checkboxContainer}
							onSelectionsChange={(ele) => {
								setSubjects(ele);
							}}
							buttonStyle={Styles.checkboxSelected}
							selectedItems={subjects}
						/>
						<TouchableOpacity style={Styles.btn} onPress={handleSubmit}>
							<Text style={Styles.btnText}>
								Save
							</Text>
						</TouchableOpacity>
						<Text onPress={() => navigation.navigate('Home')} style={[Styles.paraText, { alignSelf: 'center', fontSize: theme.linkFontSize, color: 'grey' }]}>Go Back to Home</Text>
					</>
				}
			</View>
		</CIContainer>
	);
};

export default EditSubjects;
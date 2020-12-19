import React, { useEffect, useState } from "react";
import Styles from "./styles";
import H1 from "../../components/H1";
import { useDispatch, useSelector } from "react-redux";
import { setNewUserData } from "../../Store/Actions/UsersActions";
import { MappedElement } from "../../utils/helpers";
import { loadSubjects } from "../../Store/Actions/SubjectActions";
import CenteredLoading from "../../components/CenteredLoading";
import { Text, View } from "react-native";
import CIContainer from "../../components/CIContainer";
import {MultipleSelectPicker} from 'react-native-multi-select-picker';
import { TouchableOpacity } from "react-native-gesture-handler";
import {getArrayOfSubjectsAsLabeValueKeys,getBackAsOriginalSubjectStructure} from '../../utils/helpers'
const ThirdStep = ({ onNext }) => {
	const dispatch = useDispatch();
	const [subjects, setSubjects] = useState([]);
	useEffect(() => {
		dispatch(loadSubjects());
	}, []);
	const stateProps = useSelector(({ Subjects }) => {
		return {
			...Subjects
		}
	});
	const { data, loading } = stateProps;
	const handleSubmit = (e) => {
		// if(subjects.length===0){
		// 	setError("Please select atleast one subject.");
		// 	setOpen(true);
		// 	return;
		// }
		dispatch(setNewUserData({ subjects:getBackAsOriginalSubjectStructure(subjects) }));
		onNext();
	};
	return (
		<CIContainer>
			<View style={Styles.innerContainer}>
				<H1 style={Styles.heading} text="Welcome"/>
				<Text style={Styles.paraText}> Let's setup you account. </Text>
				{loading ?
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
								Next
					</Text>
						</TouchableOpacity>
					</>
				}
			</View>
		</CIContainer>
	);
};

export default ThirdStep;
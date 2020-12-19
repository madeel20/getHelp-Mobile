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
	const getArrayOfSubjectsAsLabeValueKeys = ()=>{
			let sub = [];
			data.map(it=>{
				sub.push({id:it.id,label:it.name,value: it.id})
			});
			return sub;
	}
	const getBackAsOriginalSubjectStructure = ()=>{
			let sub =[];
			subjects.map(it=>{
					sub.push({id:it.value,name:it.label})
			});
			return sub;
	}
	const handleSubmit = (e) => {
		// if(subjects.length===0){
		// 	setError("Please select atleast one subject.");
		// 	setOpen(true);
		// 	return;
		// }
		dispatch(setNewUserData({ subjects:getBackAsOriginalSubjectStructure() }));
		onNext();
	};
	const handleChange = (e) => {
		if (e.target.checked) {
			setSubjects(prevState => [...prevState, { id: e.target.value, name: e.target.name }]);
		}
		else {
			setSubjects(prevState => prevState.filter(it => it.id !== e.target.value));
		}
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
							items={getArrayOfSubjectsAsLabeValueKeys()}
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